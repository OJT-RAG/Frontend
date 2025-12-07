import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";

const ChatPage = () => {
  useEffect(() => {
    // Khi vào ChatPage → khóa scroll toàn trang
    document.body.classList.add("no-scroll");

    // Khi rời ChatPage → trả lại như cũ
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const [sessions, setSessions] = useState([
    { id: 1, title: "Session 1", messages: [{ sender: "ai", text: "Xin chào!" }] },
    { id: 2, title: "Session 2", messages: [{ sender: "ai", text: "Chào mừng bạn!" }] },
  ]);
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession]);

  const handleSend = () => {
    if (!input.trim()) return;

    const updated = sessions.map((s) =>
      s.id === activeSessionId
        ? { ...s, messages: [...s.messages, { sender: "user", text: input }] }
        : s
    );

    setSessions(updated);
    const sent = input;
    setInput("");

    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, { sender: "ai", text: `Bạn vừa nói: "${sent}"` }],
              }
            : s
        )
      );
    }, 1000);
  };

  const createNewSession = () => {
    const newId = sessions.length + 1;
    const newSession = { id: newId, title: `Session ${newId}`, messages: [] };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
  };

  return (
    <div className="chatpage-full">
      <div className="chatpage-sidebar">
        <button className="new-session-btn" onClick={createNewSession}>
          + New Session
        </button>

        <div className="session-list">
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`session-item ${s.id === activeSessionId ? "active" : ""}`}
              onClick={() => setActiveSessionId(s.id)}
            >
              {s.title}
            </div>
          ))}
        </div>
      </div>

      <div className="chatpage-main">
        <div className="chatpage-messages">
          {activeSession?.messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div className="chatpage-input">
          <input
            type="text"
            value={input}
            placeholder="Nhập tin nhắn..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
