import React, { useEffect, useRef, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Salom! Menga savol berishingiz mumkin.", fromMe: false },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateBotReply = (text) => {
    const lower = text.toLowerCase();
    let reply = "";

    if (lower.includes("ism")) {
      reply += "👤 Mening ismim ChatBot. ";
    }
    if (lower.includes("yosh")) {
      reply += "📅 Men sun’iy intellektman, yoshim yo‘q. ";
    }
    if (lower.includes("qayer") || lower.includes("qaerdan")) {
      reply += "🌍 Men internetdanman. ";
    }
    if (lower.includes("nima qilasan")) {
      reply += "🤖 Men sizga yordam berish uchun ishlayman. ";
    }
    if (lower.includes("gul haqida")) {
      reply +=
        " gullar juda xushbo'y bo'ladi va hidi odamni kayfiyatini ko'taradi";
    }

    if (lower.includes("odamlar")) {
      reply +=
        " Odam yoki inson, shuningdek Homo sapiens ham deyiladi (lot. ongli odam), sut emizuvchilar sinfining Hominidae oilasiga mansub primat turidir. Odamlar abstrakt fikrlash, nutq, introspeksiya qobiliyatli yuksak rivojlangan miyaga egadirlar. Bunday miya bilan odamlar mehnat qurollari ishlatishni oʻrganib, boshqa tur hayvonlardan ilgʻorlashib ketdilar.";
    }

    if (lower.includes("hayvonlar")) {
      reply +=
        "Hayvonlar, hayvonot dunyosi – organik olam sistemasidagi yirik boʻlimlardan biri.Hayvonlarning bundan 1 – 1,5 milliard yil ilgari okean suvida mikroskopik, xlorofillsiz amyobasimon xivchinlilar shaklida paydo boʻlgani taxmin qilinadi. Hayvonlarning eng qadimgi qazilma qoldiqlari yoshi 0,8 milliard yildan oshmaydi. Koʻp hujayrali hayvonlar – boʻshliqichlilar, chuvalchanglar, tuban boʻgʻim-oyoqlilarning dastlabki qoldiqlari soʻnggi kembriy qatlamlaridan boshlab (mil.dan 690–570 million yil avval) uchraydi. Kembriy davri boshlarida (mil.dan 570–490 million yil avval) tashqi mineral skeletli (chigʻanoqli yoki xitinli) dengiz umurtqasizlarining koʻpchilik guruxlari (trilobitalar, jabraoyoqlilar, mollyuskalar, arxeotsiatlar) rivojlangan. ";
    }

    if (lower.includes("ronaldo")) {
      reply +=
        "Cristiano Ronaldo dos Santos Aveiro (talaffuzi: Krishtianu Ronaldu dush Santus Aveyru) – 1985-yilning 5-fevralida tugʻilgan, Al-Nassr FK futbol klubi va Portugaliya milliy futbol jamoasi uchun oʻynaydigan professional futbolchi. Futbol tarixidagi eng qimmat futbolchilardan biri.";
    }

    if (lower.includes("salom")) {
      reply += "👋 Salom! Yaxshimisiz? ";
    }

    return reply;
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, fromMe: true };
    setMessages((prev) => [...prev, userMessage]);
    const botReply = generateBotReply(input);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botReply, fromMe: false }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Chat Bot</div>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.fromMe ? "flex-end" : "flex-start",
              backgroundColor: msg.fromMe ? "#DCF8C6" : "#E6E6E6",
              animation: "fadeIn 0.4s ease",
            }}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div style={{ ...styles.message, backgroundColor: "#E6E6E6" }}>
            <i>...yozmoqda</i>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Savolingizni yozing..."
        />
        <button
          onClick={handleSend}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Yubor
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    height: "600px",
    margin: "40px auto",
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  header: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },
  messages: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    backgroundColor: "#f5f5f5",
  },
  message: {
    padding: "10px 15px",
    borderRadius: "15px",
    margin: "5px 0",
    maxWidth: "70%",
    fontSize: "15px",
    lineHeight: "1.4",
    animation: "fadeIn 0.4s ease",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    fontSize: "16px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
};

export default ChatPage;

ChatPage.getLayout = (pageProps) => (
  <MainLayout>
    <ChatPage {...pageProps} />
  </MainLayout>
);
