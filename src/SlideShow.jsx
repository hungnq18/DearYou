// import FloatingHearts from './FloatingHearts';
// import MusicButton from './MusicButton';
import React, { useEffect, useRef, useState } from 'react';

const slides = [
  { type: 'img', src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1767452909/bcf510b3-fe0d-41d1-970d-e2988dd0dd89_h9jw5l.jpg', alt: 'Ảnh kỷ niệm 1', caption: '' },
  
];

function SlideShow({ onBack, audioRef, playing, setPlaying }) {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];
  const videoRef = useRef(null);
  const [typedCaption, setTypedCaption] = useState('');
  const captionRef = useRef('');
  const typeAudioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
  }, [slide]);

  useEffect(() => {
    setTypedCaption('');
    captionRef.current = '';
    const text = slide.caption || '';
    let interval = null;
    let timeout = null;
    if (text.length > 0) {
      // Bắt đầu loop âm thanh
      if (typeAudioRef.current) {
        typeAudioRef.current.loop = true;
        typeAudioRef.current.currentTime = 0;
        typeAudioRef.current.play();
      }
      timeout = setTimeout(() => {
        interval = setInterval(() => {
          if (captionRef.current.length < text.length) {
            captionRef.current += text[captionRef.current.length];
            setTypedCaption(captionRef.current);
          } else {
            clearInterval(interval);
            // Dừng âm thanh khi xong
            if (typeAudioRef.current) {
              typeAudioRef.current.pause();
              typeAudioRef.current.currentTime = 0;
              typeAudioRef.current.loop = false;
            }
          }
        }, 38);
      }, 600);
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      // Dừng âm thanh nếu rời khỏi slide
      if (typeAudioRef.current) {
        typeAudioRef.current.pause();
        typeAudioRef.current.currentTime = 0;
        typeAudioRef.current.loop = false;
      }
    };
  }, [idx, slide.caption]);

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  const handleVideoPlay = () => {
    // Không điều khiển audioRef ở đây nữa
  };

  return (
    <>
      {/* <MusicButton audioRef={audioRef} playing={playing} setPlaying={setPlaying} disabled={slide.type === 'video'} /> */}
      <audio ref={typeAudioRef} src="/typewriter.mp3" preload="auto" style={{ display: 'none' }} />
      <div className="slideshow-bg">
        {/* {typedCaption.length === (slide.caption || '').length && <FloatingHearts />} */}
        <div className="slideshow-card">
          <h2 className="slideshow-title" style={{
            textAlign: 'center',
            margin: '0 0 1.2rem',
            fontFamily: `'Pacifico', 'Dancing Script', 'Segoe UI', 'Arial', sans-serif`,
            letterSpacing: '2.5px',
            fontSize: '2.1rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#e91e63',
            textShadow: '0 3px 16px #ffd1e6, 0 1px 0 #fff3fa',
            transform: 'skew(-3deg, 1deg)'
          }}></h2>
          {slide.type === 'img' ? (
            <img 
              src={slide.src} 
              alt={slide.alt} 
              className="slide-img" 
              style={{
                maxWidth: '98%',
                maxHeight: '420px',
                borderRadius: '24px',
                marginBottom: '1.2rem',
                boxShadow: '0 2px 16px #e0e0e0'
              }}
            />
          ) : slide.type === 'video' ? (
            <video
              ref={videoRef}
              src={slide.src}
              controls
              className="slide-video"
              autoPlay
              onPlay={handleVideoPlay}
              style={{
                maxWidth: '98%',
                maxHeight: '420px',
                borderRadius: '24px',
                marginBottom: '4rem',
                boxShadow: '0 2px 16px #e0e0e0'
              }}
            />
          ) : slide.type === 'ticket' ? (
            <div className="ticket-card">
              <img src={slide.src} alt={slide.alt} className="ticket-img" style={{maxWidth: '100%', marginBottom: '1rem', borderRadius: '12px', boxShadow: '0 2px 12px #e0e0e0'}} />
              <div className="ticket-title">🎫 Vé đi chơi đặc biệt 🎫</div>
              <div className="ticket-content">{typedCaption.split('\n').map((line, i) => <div key={i}>{line}</div>)}</div>
              <div className="ticket-footer">(Đưa vé này cho anh để nhận phần thưởng nhé!)</div>
            </div>
          ) : null}
          <div className="slide-caption typewriter" style={{
            color: '#e91e63',
            textShadow: '0 3px 16px #ffd1e6, 0 1px 0 #fff3fa',
            marginBottom: '1.3rem',
            fontWeight: 400
          }}>{slide.type !== 'ticket' && typedCaption}</div>
          <div className="slide-controls" style={{ marginTop: '0.7rem' }}>
            <button onClick={prev}>◀</button>
            <button onClick={onBack}>Quay lại</button>
            <button onClick={next}>▶</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlideShow; 