"use client";

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="player-info">
        <h4>未登入</h4>
        <p className="coins">💰 小金金：0</p>
        <p>⭐ VIP: 否</p>
        <p>⚔️ 職業：無</p>

        <div className="drawseed">
          <h4>每天抽種子</h4>
          <p>今日剩餘次數: <span id="draws-left">0/3</span></p>
          <button id="draw-seed-btn" className="draw-btn">✨ 抽種子 ✨</button>
          <div id="draw-result" className="draw-result"></div>
        </div>

        <h4>伺服器資訊</h4>
        <p>📅 遊戲日期: 6月1日</p>
        <p>🌸 當前季節：春季</p>
        <p>⏳ 伺服器天數: 第 1 天</p>
      </div>
    </div>
  );
}
