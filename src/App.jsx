import { useEffect, useRef, useState } from 'react';
import './App.css';
import Envelope from './Envelope';
import GreetingCard from './GreetingCard';
import MusicButton from './MusicButton';
import SlideShow from './SlideShow';

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function FloatingHearts() {
  const hearts = Array.from({ length: 18 });
  return (
    <>
      {hearts.map((_, i) => {
        const left = getRandom(0, 100);
        const size = getRandom(18, 36);
        const duration = getRandom(6, 14);
        const delay = getRandom(0, 8);
        const style = {
          left: `${left}%`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        };
        const heartList = ['❤️','💖','💕','💗','💓','💞','💘'];
        const heart = heartList[Math.floor(Math.random()*heartList.length)];
        return <span key={i} className="heart-float" style={style}>{heart}</span>;
      })}
    </>
  );
}

const slides = [
  { type: 'img', src: '/src/assets/slide1.jpg', alt: 'Ảnh kỷ niệm 1', caption: 'Khoảnh khắc đầu tiên bên nhau, em cười rạng rỡ như nắng mai.' },
  { type: 'img', src: '/src/assets/slide2.jpg', alt: 'Ảnh kỷ niệm 2', caption: 'Ngày mình cùng nhau khám phá thế giới, mọi thứ đều trở nên tuyệt vời.' },
  { type: 'img', src: '/src/assets/slide3.jpg', alt: 'Ảnh kỷ niệm 3', caption: 'Những phút giây bình yên bên em là điều anh luôn trân trọng.' },
  { type: 'video', src: '/video.mp4', alt: 'Video lời chúc', caption: 'Lời chúc đặc biệt dành riêng cho em yêu.' },
];

function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const resumeAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', resumeAudio, { once: true });
    return () => window.removeEventListener('click', resumeAudio);
  }, []);

  return (
    <div className="app-bg-wrapper" style={{minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden'}}>
      <audio ref={audioRef} src="/musicLove.mp3" autoPlay loop />
      <MusicButton audioRef={audioRef} playing={playing} setPlaying={setPlaying} disabled={false} />
      {!showCard ? (
        <Envelope onOpen={() => setShowCard(true)} audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
      ) : showSlide ? (
        <SlideShow onBack={() => setShowSlide(false)} audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
      ) : (
        <GreetingCard
          onNext={() => {
            setFlip(true);
            setTimeout(() => {
              setShowSlide(true);
              setFlip(false);
            }, 700);
          }}
          flip={flip}
          audioRef={audioRef}
          playing={playing}
          setPlaying={setPlaying}
        />
      )}
    </div>
  );
}

export default App;
