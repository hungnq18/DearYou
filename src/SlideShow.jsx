import FloatingHearts from './FloatingHearts';
// import MusicButton from './MusicButton';
import React, { useEffect, useRef, useState } from 'react';

const slides = [
  { type: 'img', src: '/slide1.jpg', alt: 'Ảnh kỷ niệm 1', caption: 'Em rạng rỡ như thế này, thì thi cử chỉ là chuyện nhỏ thôi, vì em đã luôn tuyệt vời trong mắt anh rồi 💞' },
  { type: 'img', src: '/slide2.jpg', alt: 'Ảnh kỷ niệm 2', caption: 'Thi xong thì mình đi quẩy xả stress nhá bé ơi! Anh dẫn em đi khắp phố phường, chụp thật nhiều bức ảnh đẹp như này nữa nha 🥰📸' },
  { type: 'img', src: '/slide3.jpg', alt: 'Ảnh kỷ niệm 3', caption: 'Làm bài hết mình nha bé iu của anh. Để mà hai đứa mình sẽ có thêm nhiều khoảng khắc bình yên như thế này nữa nhé 🥰. IU EM💞💞💞' },
  { type: 'video', src: '/video.mp4', alt: 'Video lời chúc', caption: 'Lời chúc đặc biệt dành riêng cho em yêu nè @@@.' },
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
        {typedCaption.length === (slide.caption || '').length && <FloatingHearts />}
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
          }}>ĐỘNG LỰC CHO BÉ IU</h2>
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
          ) : null}
          <div className="slide-caption typewriter" style={{
            color: '#e91e63',
            textShadow: '0 3px 16px #ffd1e6, 0 1px 0 #fff3fa',
            marginBottom: '1.3rem',
            fontWeight: 400
          }}>{typedCaption}</div>
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