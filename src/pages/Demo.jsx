import { useState, useCallback } from 'react'
import './Demo.css'

const S3 = 'https://compatai-videos.s3.amazonaws.com/demo_samples'

const CATEGORIES = [
  { key: 'cat_parking',        label: 'Informal Parking'   },
  { key: 'cat_motos',          label: 'Motorcycle Weaving' },
  { key: 'cat_pedestrians',    label: 'Jaywalking'          },
  { key: 'cat_vendors',        label: 'Street Vendors'      },
  { key: 'cat_microbus',       label: 'Microbus Behavior'   },
  { key: 'cat_intersections',  label: 'Intersection Chaos'  },
  { key: 'cat_infrastructure', label: 'Infrastructure'      },
]

const TABS = ['AI Demo', 'Dataset', 'About']

function SampleInfo({ sample }) {
  const pct = Math.round((sample.confidence || 0) * 100)
  return (
    <div className="demo-info">
      <div className="demo-info__header">
        <span className="demo-info__badge">
          Sample #{String(sample.id).padStart(3, '0')} / {sample.total}
        </span>
        <span className="demo-info__conf">
          {pct}% confidence
          <span className="demo-info__conf-bar" style={{ '--pct': `${pct}%` }} />
        </span>
      </div>
      {sample.behaviors?.length > 0 && (
        <div className="demo-info__section">
          <p className="demo-info__label">CDMX Behaviors</p>
          <div className="demo-info__tags">
            {sample.behaviors.map(b => (
              <span key={b} className="demo-info__tag">{b}</span>
            ))}
          </div>
        </div>
      )}
      {sample.yolo_total > 0 && (
        <div className="demo-info__section">
          <p className="demo-info__label">
            YOLO Objects
            <span className="demo-info__muted"> ({sample.yolo_total} total)</span>
          </p>
          <div className="demo-info__classes">
            {Object.entries(sample.yolo_classes || {})
              .sort((a, b) => b[1] - a[1])
              .map(([cls, count]) => (
                <div key={cls} className="demo-info__class-row">
                  <span>{cls}</span>
                  <span className="demo-info__class-count">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="demo-info__meta">
        <span>Faces and plates anonymized</span>
        <span>Authentic CDMX 60fps 2560x1080</span>
        {sample.added_at && <span>Added {sample.added_at}</span>}
      </div>
    </div>
  )
}

function DatasetTab() {
  const specs = [
    ['Resolution', '2560x1080 (Ultra Wide)'],
    ['Frame Rate', '60 fps'],
    ['Clip Duration', '15 seconds'],
    ['Format', 'MP4 H.264'],
    ['Location', 'Mexico City (CDMX)'],
    ['Annotation', 'Bedrock Claude Vision + YOLO v8'],
    ['Anonymization', 'AWS Rekognition (faces + plates)'],
  ]
  const behaviors = [
    ['informal_parking', 'Cars blocking active traffic lanes'],
    ['double_parking', 'Double-parked causing traffic jam'],
    ['motorcycle_weaving', 'Motorcycles between lanes at speed'],
    ['cultural_jaywalking', 'Pedestrians crossing mid-street'],
    ['vendor_navigation', 'Street vendors in active traffic'],
    ['bus_micro_behavior', 'Microbuses stopping unpredictably'],
    ['intersection_negotiation', 'Uncontrolled intersection chaos'],
  ]
  const pricing = [
    ['Starter Pack', '10 clips per category', '$29'],
    ['Full Day Pack', 'All clips from one recording day', '$99'],
    ['Enterprise', 'Custom recordings + labeling', 'Contact us'],
  ]
  return (
    <div className="demo-static">
      <div className="demo-static__inner">
        <h2 className="demo-static__title">compaTAI CDMX Chaos Dataset</h2>
        <p className="demo-static__intro">
          Standard AV datasets are built on predictable environments.
          <strong> compaTAI focuses on the chaos edge case.</strong>
        </p>
        <h3 className="demo-static__h3">Specifications</h3>
        <table className="demo-table">
          <tbody>
            {specs.map(([k, v]) => (
              <tr key={k}>
                <td className="demo-table__key">{k}</td>
                <td className="demo-table__val">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="demo-static__h3">Behavior Taxonomy</h3>
        <table className="demo-table">
          <tbody>
            {behaviors.map(([label, desc]) => (
              <tr key={label}>
                <td className="demo-table__key"><code>{label}</code></td>
                <td className="demo-table__val">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="demo-static__h3">Pricing</h3>
        <table className="demo-table">
          <thead>
            <tr>
              <th>Package</th><th>Content</th><th>Price</th>
            </tr>
          </thead>
          <tbody>
            {pricing.map(([pkg, content, price]) => (
              <tr key={pkg}>
                <td className="demo-table__key">{pkg}</td>
                <td className="demo-table__val">{content}</td>
                <td className="demo-table__price">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="demo-static__cta">
          <a href="https://store.compatai.mx" className="demo-static__buy" target="_blank" rel="noreferrer">
            Buy on Gumroad
          </a>
        </div>
      </div>
    </div>
  )
}

function AboutTab() {
  const steps = [
    ['AWS Bedrock Claude', 'Scene detection - identifies chaos behaviors in each frame'],
    ['Amazon Rekognition', 'Face and plate anonymization - GDPR/privacy compliant'],
    ['YOLO v8', 'Object detection annotations - bounding boxes on every clip'],
  ]
  return (
    <div className="demo-static">
      <div className="demo-static__inner">
        <h2 className="demo-static__title">About compaTAI</h2>
        <p className="demo-static__intro">
          compaTAI produces specialized training data for autonomous vehicle
          systems operating in <strong>high-entropy urban environments</strong>.
        </p>
        <h3 className="demo-static__h3">The Problem</h3>
        <p className="demo-static__body">
          Robotaxis trained on US/EU data <strong>fail in CDMX</strong> because
          no lane markings are followed, the informal economy operates inside traffic,
          microbuses stop unpredictably, and pedestrian patterns are non-linear.
        </p>
        <h3 className="demo-static__h3">Our Pipeline</h3>
        <div className="demo-steps">
          {steps.map(([tool, desc], i) => (
            <div key={tool} className="demo-step">
              <div className="demo-step__num">{i + 1}</div>
              <div>
                <p className="demo-step__tool">{tool}</p>
                <p className="demo-step__desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="demo-about__links">
          <a href="https://store.compatai.mx" target="_blank" rel="noreferrer">Buy on Gumroad</a>
          <a href="mailto:social.media@compatai.mx">socialmedia@compatai.mx</a>
          <a href="https://compatai.mx" target="_blank" rel="noreferrer">compatai.mx</a>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  const [tab,      setTab]      = useState(0)
  const [category, setCategory] = useState('cat_parking')
  const [idx,      setIdx]      = useState(0)
  const [sample,   setSample]   = useState(null)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [maxIdx,   setMaxIdx]   = useState(1)

  const loadDemo = useCallback(async () => {
    setLoading(true)
    setError(null)
    setSample(null)
    try {
      const res = await fetch(`${S3}/${category}/index.json`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const samples = data.samples || []
      if (samples.length === 0) throw new Error('No videos in this category')
      setMaxIdx(samples.length - 1)
      const clip = samples[idx % samples.length]
      setSample({
        id:           clip.id,
        total:        samples.length,
        video_url:    `https://compatai-videos.s3.amazonaws.com/${clip.s3_key}`,
        behaviors:    clip.behaviors                 || [],
        confidence:   clip.confidence                || 0,
        yolo_classes: clip.yolo_stats?.classes       || {},
        yolo_total:   clip.yolo_stats?.total_objects || 0,
        added_at:     clip.added_at,
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [category, idx])

  return (
    <div className="demo-page">
      <div className="demo-tabbar">
        {TABS.map((label, i) => (
          <button
            key={i}
            className={`demo-tab${tab === i ? ' demo-tab--active' : ''}`}
            onClick={() => setTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="demo-ai">
          <aside className="demo-controls">
            <label className="demo-label">Behavior Category</label>
            <select
              className="demo-select"
              value={category}
              onChange={e => { setCategory(e.target.value); setSample(null) }}
            >
              {CATEGORIES.map(c => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>

            <label className="demo-label" style={{ marginTop: '20px' }}>
              Sample #{idx + 1} of {maxIdx + 1}
            </label>
            <input
              type="range"
              min={0} max={maxIdx} step={1}
              value={idx}
              onChange={e => { setIdx(+e.target.value); setSample(null) }}
              className="demo-slider"
            />

            <button className="demo-btn-load" onClick={loadDemo} disabled={loading}>
              {loading ? <span className="demo-spinner" /> : 'Load YOLO Demo'}
            </button>

            <hr className="demo-divider" />

            <p className="demo-buy-label">Buy Full Dataset</p>
            <a href="https://store.compatai.mx" className="demo-btn-buy" target="_blank" rel="noreferrer">
              Buy on Gumroad
            </a>
          </aside>

          <div className="demo-viewer">
            {!sample && !loading && !error && (
              <div className="demo-empty">
                <p className="demo-empty__icon">video</p>
                <p>Select a category and click Load YOLO Demo</p>
                <p className="demo-empty__sub">YOLO v8 annotated - Faces and plates anonymized - CDMX footage</p>
              </div>
            )}
            {loading && (
              <div className="demo-empty">
                <span className="demo-spinner demo-spinner--lg" />
                <p style={{ marginTop: 16, color: 'var(--grey-text)' }}>Loading sample...</p>
              </div>
            )}
            {error && (
              <div className="demo-empty demo-empty--error">
                <p>{error}</p>
              </div>
            )}
            {sample && !loading && (
              <div>
                <video
                  key={sample.video_url}
                  className="demo-video"
                  controls
                  autoPlay
                  playsInline
                  src={sample.video_url}
                />
                <SampleInfo sample={sample} />
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 1 && <DatasetTab />}
      {tab === 2 && <AboutTab />}
    </div>
  )
}