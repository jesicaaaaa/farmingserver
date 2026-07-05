import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Rightbar from "./component/Rightbar";



export const metadata: Metadata = {
  title: "🌱我要退休下鄉種田🌱",
  description: "農場遊戲首頁",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
        <div className="topleft"><p>選單</p></div>
        <div className="topright"><p>資訊</p></div>
        <Navbar />

        {/* 主容器：三欄佈局 */}
        <div className="main-container">
          <Sidebar />   {/* 左邊 Sidebar */}
          <div className="content">{children}</div> {/* 中間主內容 */}
          <Rightbar />  {/* 右邊資訊欄 */}
        </div>

        <div id="notification-container" className="notification-container"></div>
      </body>
    </html>
  );
}
