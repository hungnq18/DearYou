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

export default FloatingHearts; 