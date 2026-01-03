import React, { useState } from 'react';
// import FloatingHearts from './FloatingHearts';

function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTimeout(onOpen, 1900); // Đợi animation giấy xong mới hiện card
  };
  return (
    <div className="envelope-bg">
      {/* <FloatingHearts /> */}
      <div className="envelope-guide-container">
        <div className="envelope-guide-top">Chạm vào trái tim để mở phong bì nhé!</div>
        <div className="envelope-arrow">
          <svg className="arrow-animate" width="100%" height="100%" viewBox="0 0 16 60" fill="none">
            <line x1="8" y1="8" x2="8" y2="52" stroke="#e91e63" strokeWidth="6" strokeLinecap="round"/>
            <polyline points="4,46 8,52 12,46" fill="none" stroke="#e91e63" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className={`envelope${open ? ' open' : ''}`} onClick={open ? undefined : handleOpen} title="Click để mở phong bì" style={{position: 'relative'}}>
        <div className="envelope-flap" />
        <div className="envelope-body">
          <span className="envelope-text">Gửi em lời chúc đặc biệt 💌</span>
        </div>
        <span className="envelope-heart">💖</span>
        <div className="envelope-paper">Chúc em thi thật tốt nhé! 💌</div>
      </div>
    </div>
  );
}

export default Envelope; 