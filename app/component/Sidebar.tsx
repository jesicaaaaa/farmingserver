"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [drawsLeft, setDrawsLeft] = useState(0); // 今日剩餘次數
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function drawSeed() {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(`/api/draw/1/`); // 假設玩家 ID = 1
      const data = await res.json();

      if (data.success) {
        setResult(`🎉 ${data.message} 🎉`);
        setDrawsLeft((prev) => prev + 1); // 更新剩餘次數
      } else {
        setResult(`❌ ${data.message}`);
      }
    } catch (err) {
      setResult("抽獎失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="sidebar">
      <div className="nav-links">
        <h2>🏠主要🏠</h2>
        <Link href="/">首頁</Link>
        <Link href="/play">去幹活</Link>
        <Link href="/shop">花光小金金</Link>
        <Link href="/inventory">是我的背包啊</Link>

        <h2>🐄遊玩🐄</h2>
        <Link href="/ranch">牧場</Link>
        <Link href="/logging">伐木場</Link>
        <Link href="/fishing">釣魚場</Link>

        <h2>👤其他👤</h2>
        <Link href="/story">不太重要的劇情</Link>
        <Link href="/profile">查看角色檔案</Link>
      </div>
    </div>
  );
}
