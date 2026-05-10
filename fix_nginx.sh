#!/usr/bin/env bash
# fix_nginx.sh — called by GitHub Actions after git pull
# Reconfigures nginx to serve the React SPA from dist/

echo "[fix_nginx] Starting..."

# Find nginx site config for compatai.mx
CONF=$(grep -rl "compatai.mx" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | head -1)

if [ -z "$CONF" ]; then
  echo "[fix_nginx] WARNING: no nginx config found for compatai.mx"
  echo "[fix_nginx] Printing all nginx config:"
  sudo nginx -T 2>/dev/null | grep -E "(configuration file|server_name|root |try_files|location )" | head -60
  exit 0
fi

echo "[fix_nginx] Found config: $CONF"

# Detect current root path
CURRENT_ROOT=$(grep -oP '(?<=root )[^;]+' "$CONF" | head -1)
echo "[fix_nginx] Current root: $CURRENT_ROOT"

# Build the dist path
DIST_PATH="${CURRENT_ROOT}/dist"
echo "[fix_nginx] Target dist: $DIST_PATH"

if [ ! -d "$DIST_PATH" ]; then
  echo "[fix_nginx] ERROR: $DIST_PATH does not exist. Git pull may not have completed."
  ls -la "$CURRENT_ROOT" 2>/dev/null | head -20
  exit 1
fi

# Update root directive to point to dist/
sudo sed -i "s|root ${CURRENT_ROOT};|root ${DIST_PATH};|g" "$CONF"

# Add try_files for React SPA routing if not already present
if ! grep -q "try_files" "$CONF"; then
  sudo sed -i '/location \/ {/a\\t\ttry_files $uri $uri/ /index.html;' "$CONF"
  echo "[fix_nginx] Added try_files directive."
else
  echo "[fix_nginx] try_files already present."
fi

# Validate and reload nginx
sudo nginx -t 2>&1
if [ $? -eq 0 ]; then
  sudo systemctl reload nginx
  echo "[fix_nginx] Nginx reloaded successfully."
else
  echo "[fix_nginx] ERROR: nginx config test failed. Rolling back."
  sudo sed -i "s|root ${DIST_PATH};|root ${CURRENT_ROOT};|g" "$CONF"
  sudo nginx -t && sudo systemctl reload nginx
fi
