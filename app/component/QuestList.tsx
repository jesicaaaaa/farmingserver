"use client";
import React from "react";

interface Quest {
  id: number;
  name: string;
  description: string;
  progress: number;
  required: number;
  reward_coins: number;
  completed: boolean;
  claimed: boolean;
}

interface Props {
  title: string;
  quests: Quest[];
  onClaim: (id: number) => void;
}

export default function QuestList({ title, quests, onClaim }: Props) {
  return (
    <div className="mission-card">
      <h2>{title}</h2>
      {quests.length === 0 ? (
        <p>暫無任務</p>
      ) : (
        quests.map((quest) => (
          <div key={quest.id} className="quest-item">
            <span>{quest.name}</span> - {quest.description}
            <div>進度：{quest.progress}/{quest.required}</div>
            <div>獎勵：{quest.reward_coins} 金幣</div>
            {quest.completed && !quest.claimed ? (
              <button onClick={() => onClaim(quest.id)}>🎁 領取獎勵</button>
            ) : quest.claimed ? (
              <span>✅ 已領取</span>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}
