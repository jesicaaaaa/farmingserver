"use client";
import React, { useState } from "react";
import Leaderboard from "./component/Leaderboard";
import QuestList from "./component/QuestList";
import Calendar from "./component/Calendar";

export default function HomePage() {
  const [character, setCharacter] = useState<{ name: string; coins: number } | null>(null);
  const [player, setPlayer] = useState<{ name: string } | null>(null);
  const [isVip, setIsVip] = useState(false);

  const [tab, setTab] = useState<"total" | "month" | "week">("total");
  const [leaderboards, setLeaderboards] = useState({
    total: [] as { name: string; score: number }[],
    month: [] as { name: string; score: number }[],
    week: [] as { name: string; score: number }[],
  });
  const [quests, setQuests] = useState({ daily: [] as any[], weekly: [] as any[] });
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);


  // 領取獎勵
  async function claimReward(id: number) {
    try {
      const res = await fetch(`/api/claim_reward/${id}`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();

        // 更新金幣
        if (data.rewardCoins) {
          setCoins(c => c + data.rewardCoins);
        }

        // 更新任務列表（假設 API 回傳最新任務）
        if (data.updatedQuests) {
          setQuests(data.updatedQuests);
        }

        alert(`✅ 獎勵領取成功！獲得 ${data.rewardCoins} 金幣`);
      } else {
        alert("❌ 領取失敗，請稍後再試");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ 系統錯誤");
    }
  }


  function handleSignInSuccess() {
    setStreak(prev => {
      const newStreak = prev + 1;
      setCoins(c => c + 10); // 每天簽到 +10 金幣

      if (newStreak % 7 === 0) {
        setCoins(c => c + 20);
        alert("🎉 7日連續簽到獎勵：+20 金幣 + 隨機種子 x1" + (isVip ? " + 隨機動物 x1 + 補簽卷 x1" : ""));
      }
      if (newStreak % 30 === 0) {
        setCoins(c => c + 50);
        alert("🌟 1個月連續簽到獎勵：+50 金幣 + 隨機種子 x3" + (isVip ? " + 隨機動物 x1 + 稀有物品 x1 + 補簽卷 x1" : ""));
      }
      if (newStreak % 365 === 0) {
        setCoins(c => c + 50);
        alert("👑 1年連續簽到獎勵：+50 金幣 + 隨機種子 x3 + 稀有物品 x1" + (isVip ? " + 隨機動物 x1 + 補簽卷 x3" : ""));
      }
      return newStreak;
    });
  }


  return (
    <div>
      {/* 角色區塊 */}
      <div className={`player-card ${isVip ? "vip-card" : ""}`}>
        <h2>🎭 角色資訊</h2>
        {character ? (
          <>
            <h1>
              歡迎回來，{player?.name}！{" "}
              {isVip && <span className="vip-label">👑VIP 玩家</span>}
            </h1>
            <p>請努力賺取小金金，養活外星大王！</p>

            <div className="player-info">
              <div>👤 名稱：{character.name}</div>
              <div className="coins">💰擁有的小金金：{coins}</div>
            </div>

            <div className="streak-box">
              🔥 已連續簽到 <strong>{streak}</strong> 天
            </div>

            <div className="button-group">
              <a href="/play" className="btn-start">👨🏻‍🌾 去幹活</a>
              <a href="/profile" className="btn-start">👤 查看角色</a>
              <button
                className="btn-start"
                onClick={() => {
                  if (confirm("⚠️ 確定要重置角色嗎？\n此操作將永久刪除所有角色數據，無法恢復！")) {
                    fetch("/api/reset_player", { method: "POST" });
                  }
                }}
              >
                🔄 重置角色
              </button>
              {isVip && (
                <>
                  <a href="/vip-shop" className="btn-vip">🛒 VIP 商城</a>
                  <a href="/vip-rewards" className="btn-vip">🎁 VIP 獎勵領取</a>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <h3>🌱 歡迎來到 我要退休下鄉種田 🌱</h3>
            <p>請努力賺取小金金，養活外星大王！</p>
            <p style={{ color: "red" }}>⚠️你是個黑戶吼！還不快去創建角色⚠️</p>
            <a href="/create_player" className="btn-start">✨創建角色</a>
          </>
        )}
      </div>

      {/* 簽到日曆 */}
      <div className="signin">
        <h3>簽到</h3>
        <Calendar initialYear={2026} initialMonth={6} />
      </div>

      <br></br>

      {/* 獎勵說明卡片 */}
      <div className="reward-card">
        <h2>📅 簽到獎勵說明</h2>
          <p>每天簽到：+10 金幣</p>
          <p>連續 7 天：+20 金幣 + 隨機種子 x1 {isVip && "+ 隨機動物 x1 + 補簽卷 x1"}</p>
          <p>連續 1 個月：+50 金幣 + 隨機種子 x3 {isVip && "+ 隨機動物 x1 + 稀有物品 x1 + 補簽卷 x1"}</p>
          <p>連續 1 年：+50 金幣 + 隨機種子 x3 + 稀有物品 x1 {isVip && "+ 隨機動物 x1 + 補簽卷 x3"}</p>
      </div>

      <br></br>

      <div className="commission">
        {/* 任務 */}
        <h3>任務表</h3>
        <h2><QuestList title="📜每日任務" quests={quests.daily} onClaim={claimReward} /></h2>
        <h2><QuestList title="📆每週任務" quests={quests.weekly} onClaim={claimReward} /></h2>
      </div>
      
      <br></br>

      {/* 排行榜 */}
      <div className="leaderboard-container">
        <h3>🏆 排行榜（頭十）</h3>
        <div className="tabs">
          <button 
            className={`tab-btn ${tab === "total" ? "active" : ""}`} 
            onClick={() => setTab("total")}
          >
            📊總榜
          </button>

          <button 
            className={`tab-btn ${tab === "month" ? "active" : ""}`} 
            onClick={() => setTab("month")}
          >
            📅月榜
          </button>
          
          <button 
            className={`tab-btn ${tab === "week" ? "active" : ""}`} 
            onClick={() => setTab("week")}
          >
            📆周榜
          </button>
        </div>
        <Leaderboard data={leaderboards[tab]} />
      </div>
    </div>
  );
}
