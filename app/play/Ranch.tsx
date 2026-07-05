"use client";
import React, { useState } from "react";

interface Animal {
  id: number;
  species: "牛" | "羊" | "雞";
  alive: boolean;
  hunger: number;
  health: number;
}

export default function RanchPage() {
  const [animal, setAnimal] = useState<Animal>({
    id: 1,
    species: "牛",
    alive: true,
    hunger: 50,
    health: 80,
  });

  function feedAnimal() {
    if (!animal.alive) return alert("動物已死亡");
    setAnimal({
      ...animal,
      hunger: Math.max(0, animal.hunger - 20),
      health: Math.min(100, animal.health + 5),
    });
    alert(`${animal.species} 已餵食`);
  }

  function slaughter() {
    if (!animal.alive) return alert("動物已死亡");
    setAnimal({ ...animal, alive: false });
    alert(`屠宰 ${animal.species}，獲得肉品`);
  }

  return (
    <div>
      <h2>🐄 牧場</h2>
      <p>{animal.species} - 健康 {animal.health} / 飢餓 {animal.hunger}</p>
      <button onClick={feedAnimal}>🍀 餵食</button>
      <button onClick={slaughter}>🔪 屠宰</button>
    </div>
  );
}
