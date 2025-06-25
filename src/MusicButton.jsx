function MusicButton({ audioRef, playing, setPlaying, disabled }) {
  const toggleMusic = () => {
    if (audioRef.current && !disabled) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(true));
      }
    }
  };
  return (
    <button className="music-btn" onClick={toggleMusic} disabled={disabled} title={disabled ? 'Không thể bật nhạc khi đang xem video' : ''}>
      {playing ? '🔊' : '🔈'}
    </button>
  );
}

export default MusicButton; 