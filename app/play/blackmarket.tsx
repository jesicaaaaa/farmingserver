"use client";
import React, { useState } from "react";

interface Player {
  name: string;
  coins: number;
  isVip: boolean;
}

interface BlackMarketItem {
  name: string;
  price: number;
}

export default function BlackMarketPage() {
  const [player, setPlayer] = useState<Player>({
    name: "Jessie",
    coins: 200,
    isVip: true,
  });

  const items: BlackMarketItem[] = [
    { name: "神秘種子", price: 80 },
    { name: "禁忌藥水", price: 150 },
  ];

  function buyBlackMarket(item: BlackMarketItem) {
    if (player.coins < item.price) {
      return alert("金幣不足");
    }

    const scamChance = player.isVip ? 0.05 : 0.2;
    if (Math.random() < scamChance) {
      setPlayer({ ...player, coins: player.coins - item.price });
      return alert("哈哈哈你遇到騙子了，損失了金幣！");
    }

    setPlayer({ ...player, coins: player.coins - item.price });
    alert(`成功購買 ${item.name}`);
  }

  return (
    <div>
      <h2>🕶️ 黑市</h2>
      <p>玩家：{player.name} | 金幣：{player.coins}</p>
      {items.map((item, i) => (
        <div key={i} className="blackmarket-item">
          {item.name} - {item.price} 金幣
          <button onClick={() => buyBlackMarket(item)}>購買</button>
        </div>
      ))}
    </div>
  );
}
