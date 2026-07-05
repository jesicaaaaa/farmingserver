"use client";
import React, { useState } from "react";

interface Player {
  name: string;
  coins: number;
  isVip: boolean;
}

interface Item {
  name: string;
  price: number;
  vipOnly?: boolean;
}

export default function ShopPage() {
  const [player, setPlayer] = useState<Player>({
    name: "Jessie",
    coins: 100,
    isVip: false,
  });

  const items: Item[] = [
    { name: "蘿蔔種子", price: 10 },
    { name: "稀有種子", price: 50, vipOnly: true },
  ];

  function buyItem(item: Item) {
    if (item.vipOnly && !player.isVip) {
      return alert("此商品僅限 VIP 購買");
    }
    if (player.coins < item.price) {
      return alert("金幣不足");
    }
    setPlayer({ ...player, coins: player.coins - item.price });
    alert(`成功購買 ${item.name}`);
  }

  return (
    <div>
      <h2>🛒 商店</h2>
      <p>玩家：{player.name} | 金幣：{player.coins}</p>
      {items.map((item, i) => (
        <div key={i} className="shop-item">
          {item.name} - {item.price} 金幣
          <button onClick={() => buyItem(item)}>購買</button>
        </div>
      ))}
    </div>
  );
}
