import { Player } from "../play/Profile";
import React, { useState } from "react";




interface Seed {
  name: string;
}

function drawSeed(): Seed {
  const seeds = ["白蘿蔔", "馬鈴薯", "向日葵"];
  return { name: seeds[Math.floor(Math.random() * seeds.length)] };
}

export function SeedSystem({ player }: { player: Player }) {
  const [drawsToday, setDrawsToday] = useState(0);
  const [seed, setSeed] = useState<Seed | null>(null);

  function canDraw() {
    const maxDraws = player.isVip ? 3 : 1;
    return drawsToday < maxDraws;
  }

  function performDraw() {
    if (!canDraw()) {
      alert("今天抽種子次數已用完！");
      return;
    }
    const newSeed = drawSeed();
    setSeed(newSeed);
    setDrawsToday(drawsToday + 1);
    alert(`🌱 抽到種子：${newSeed.name}`);
  }

  return (
    <div>
      <h3>抽種子</h3>
      <button onClick={performDraw}>🎲 抽一次</button>
      {seed && <p>最新抽到：{seed.name}</p>}
    </div>
  );
}
