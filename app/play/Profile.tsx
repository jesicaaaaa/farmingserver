"use client";
import React from "react";

export interface Player {
  id: number;
  name: string;
  coins: number;
  isVip: boolean;
}

export default function ProfilePage() {
  const player: Player = {
    id: 1,
    name: "Jessie",
    coins: 120,
    isVip: true,
  };
  
  
  return (
    <div className="profile-card">
      <h2>👤 角色檔案</h2>
      <p>名稱：{player.name}</p>
      <p>金幣：{player.coins}</p>
      {player.isVip && <p>👑 VIP 玩家</p>}
      <button
        onClick={() => {
          if (confirm("⚠️ 確定要重置角色嗎？")) {
            alert("角色已重置！");
          }
        }}
      >
        🔄 重置角色
      </button>
    </div>
  );
}
