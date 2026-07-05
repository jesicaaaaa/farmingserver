"use client";
import React, { useState } from "react";

interface Props {
  initialYear?: number;
  initialMonth?: number; 
  today?: Date;
}

export default function Calendar({ initialYear, initialMonth, today }: Props) {
  const now = new Date();
  const current = today || now;

  const [year, setYear] = useState(initialYear || current.getFullYear());
  const [month, setMonth] = useState(initialMonth || current.getMonth() + 1);
  const [signedInDays, setSignedInDays] = useState<number[]>([]);

  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const daysInMonth = new Date(year, month, 0).getDate();

  function changeMonth(offset: number) {
    let newMonth = month + offset;
    let newYear = year;
    if (newMonth < 1) { newMonth = 12; newYear -= 1; }
    else if (newMonth > 12) { newMonth = 1; newYear += 1; }
    setMonth(newMonth);
    setYear(newYear);
    setSignedInDays([]);
  }

  function handleSignIn(day: number) {
    if (
      day !== current.getDate() ||
      month !== current.getMonth() + 1 ||
      year !== current.getFullYear()
    ) {
      alert("只能簽到今天！");
      return;
    }
    if (signedInDays.includes(day)) {
      alert("你今天已經簽到過了啦 ✅");
      return;
    }
    setSignedInDays([...signedInDays, day]);
    alert("🎉 簽到成功！");
  }

  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={`empty-${i}`} className="day empty"></div>
  ));

  return (
    <div className="calendar">
      <div className="calendar-title-row">
        <button onClick={() => changeMonth(-1)}>⬅️ 上一月</button>
        <h3>{year} 年 {month} 月</h3>
        <button onClick={() => changeMonth(1)}>下一月 ➡️</button>
      </div>

      <div className="calendar-weekdays">
        {weekdays.map((w, i) => (
          <div key={i} className="week-header">{w}</div>
        ))}
      </div>

      <div className="calendar-days">
        {emptyCells}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday =
            day === current.getDate() &&
            month === current.getMonth() + 1 &&
            year === current.getFullYear();
          const isSignedIn = signedInDays.includes(day);

          return (
            <div
              key={day}
              className={`day ${isToday ? "today-border" : ""} ${isSignedIn ? "normal" : "none"}`}
              onClick={() => handleSignIn(day)}
            >
              <div className={`day-number ${isToday ? "today" : ""}`}>{day}</div>
              <div className="day-reward">
                {isSignedIn ? "✅ 已簽到" : "💰 獎勵"}
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn-start" onClick={() => handleSignIn(current.getDate())}>
        ✅ 今日簽到
      </button>
    </div>
  );
}
