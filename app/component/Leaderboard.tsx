"use client";
import React from "react";

interface LeaderboardItem {
  name: string;
  score: number;
}

interface Props {
  data: LeaderboardItem[];
}

export default function Leaderboard({ data }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>名次</th>
          <th>玩家</th>
          <th>任務積分</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 10).map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name || "未知"}</td>
            <td>{item.score || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
