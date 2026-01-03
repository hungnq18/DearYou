import { useEffect, useRef, useState } from 'react';
import './App.css';
import GreetingCard from './GreetingCard';
import MusicButton from './MusicButton';
import SlideShow from './SlideShow';

// function getRandom(min, max) {
//   return Math.random() * (max - min) + min;
// }

// function FloatingHearts() {
//   const hearts = Array.from({ length: 18 });
//   return (
//     <>
//       {hearts.map((_, i) => {
//         const left = getRandom(0, 100);
//         const size = getRandom(18, 36);
//         const duration = getRandom(6, 14);
//         const delay = getRandom(0, 8);
//         const style = {
//           left: `${left}%`,
//           fontSize: `${size}px`,
//           animationDuration: `${duration}s`,
//           animationDelay: `${delay}s`,
//         };
//         const heartList = ['❤️','💖','💕','💗','💓','💞','💘'];
//         const heart = heartList[Math.floor(Math.random()*heartList.length)];
//         return <span key={i} className="heart-float" style={style}>{heart}</span>;
//       })}
//     </>
//   );
// }

const slides = [
  { type: 'img', src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1767452909/bcf510b3-fe0d-41d1-970d-e2988dd0dd89_h9jw5l.jpg', alt: '', caption: '' },
  
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
    <div className="app-bg-wrapper" style={{
      minHeight: '100vh',
      minWidth: '100vw',
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <audio ref={audioRef} src="/musicLove.mp3" autoPlay loop />
      <MusicButton audioRef={audioRef} playing={playing} setPlaying={setPlaying} disabled={false} />
     
        <SlideShow onBack={() => setShowSlide(false)} audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
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
    </div>
  );
}

export default App;
