// src/components/VideoBackground.jsx

export default function VideoBackground() {
  return (
    <div id="bg-container">
      {/* Video background */}
      <video
        id="bg-video"
        autoPlay
        muted
        loop
        playsInline
        className="bg-element"
      >
        <source
          src="https://compatai.mx/assets/video_background/tmpcgc2hk3m.mp4"
          type="video/mp4"
        />
      </video>

      {/* Slideshow fallback (opcional, quítalo si no lo necesitas) */}
      <div id="bg-slideshow" className="bg-element">
        <div
          className="slide active"
          style={{
            backgroundImage:
              "url('https://compatai.mx/assets/img_background/Ejemplo3.jpg')",
          }}
        />
        <div
          className="slide"
          style={{
            backgroundImage:
              "url('https://compatai.mx/assets/img_background/Ejemplo5.jpg')",
          }}
        />
      </div>

      <div className="bg-overlay" />
    </div>
  );
}