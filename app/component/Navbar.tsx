"use client";
import { useState, useEffect } from "react";


export default function Navbar() {
  const [text, setText] = useState("快開始種田!🌱");
    const [fade, setFade] = useState(true);

  useEffect(() => {
    const randomTexts = [
      "快開始種田!🌱",
      "澆水澆到懷疑人生💧",
      "成為一名有用的農民!💚",
      "你逃不過當社蓄的命運!👩‍🌾",
      "我是宇宙霹靂無敵的外星大王🌞",
      "種田也是一種修行💦",
      "金幣只是副產品, 所以都拿來吧你!💰",
      "土地不會辜負努力的你🌾",
      "一分耕耘，一分收穫🌱",
    ];

    
    const interval = setInterval(() => {
      setFade(false); // 先淡出
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * randomTexts.length);
        setText(randomTexts[randomIndex]);
        setFade(true); // 再淡入
      }, 500); // 淡出後再換文字
    }, 10000); // 每 10 秒換一句

    // 清理 interval，避免記憶體洩漏
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <h5>🌱我要退休下鄉種田🌱</h5>
      <h6 className={fade ? "fade-in" : "fade-out"}>{text}</h6>
    </div>
  );
}