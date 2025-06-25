import FloatingHearts from './FloatingHearts';

function GreetingCard({ onNext, flip }) {
  return (
    <div className="greeting-bg">
      <FloatingHearts />
      <div className={`greeting-card${flip ? ' flip' : ''}`}>
        <div className="hearts">
          <span className="heart">❤️</span>
          <span className="heart">💖</span>
          <span className="heart">💕</span>
        </div>
        <h1 className="title">Chúc em yêu thi thật tốt! ✨</h1>
        <p className="message">
        Bé ơi, ngày mai đi thi nhớ hít thở thật sâu và luôn nghĩ tới anh 
        để lấy tinh thần nhé! Anh tin em sẽ vượt qua mọi thử thách dễ dàng thôi. 
        Gửi em thật nhiều may mắn và cả triệu nụ hôn để mang vào phòng thi! 😘 
          Dù kết quả thế nào, em vẫn là niềm tự hào lớn nhất của anh.<br/>
          Yêu em rất nhiều! 💌<br />
          THI THẬT TỐT RỒI VỀ MÌNH ĐI CHƠI NHAA !!
        </p>
        <div className="footer">- Người thương của em -</div>
        <button className="next-btn" onClick={onNext}>điều hay đang chờ e ở sau đóa ❤️ </button>
      </div>
    </div>
  );
}

export default GreetingCard; 