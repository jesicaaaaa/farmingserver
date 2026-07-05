import { Player } from "../play/Profile";
import React, { useState } from "react";



interface Item {
  name: string;
  price: number;
  vipOnly?: boolean;
}

export function ShopSystem({ player, setPlayer }: { player: Player; setPlayer: (p: Player) => void }) {
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
      <h3>商店</h3>
      {items.map((item, i) => (
        <div key={i}>
          {item.name} - {item.price} 金幣
          <button onClick={() => buyItem(item)}>🛒 購買</button>
        </div>
      ))}
    </div>
  );
}
