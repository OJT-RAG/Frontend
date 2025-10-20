import React, { useState } from "react";
import { Send, Bot, User, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm your FPT OJT Assistant. I can help you with questions about On-the-Job Training policies, procedures, application processes, and more. What would you like to know?",
      sender: "assistant",
      timestamp: new Date(),
      sources: ["OJT Guidelines", "Student Handbook"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "What are the GPA requirements for OJT?",
    "How do I apply for an internship?",
    "What documents do I need for OJT registration?",
    "When is the OJT application deadline?"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((p) => [...p, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: `Based on the FPT University OJT guidelines, here's what I found regarding "${inputValue}":\n\nThis is a simulated response.`,
        sender: "assistant",
        timestamp: new Date(),
        sources: ["OJT Policy Document", "Student Guidelines"]
      };
      setMessages((p) => [...p, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (q) => setInputValue(q);
  const onKeyDown = (e) => { if (e.key === "Enter") handleSendMessage(); };

  return (
    <section className="chat-section">
      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="badge"><Sparkles /> <span>Try the Assistant</span></div>
          <h2>Ask Anything About <span className="text-gradient">OJT</span></h2>
          <p className="chat-sub">Get instant, accurate answers powered by AI and comprehensive knowledge base</p>
        </div>

        <div className="chat-window">
          <div className="messages" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className="message-row" style={{ justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}>
                {m.sender === "assistant" && <div className="avatar bot"><Bot /></div>}
                <div className="message-col" style={{ alignItems: m.sender === "user" ? "flex-end" : "flex-start" }}>
                  <div className={`message-bubble ${m.sender === "user" ? "message-user" : "message-assistant"}`}>{m.content}</div>

                  {m.sources && m.sender === "assistant" && (
                    <div className="source-list">
                      {m.sources.map((s, i) => <span key={i} className="source">{s}</span>)}
                    </div>
                  )}

                  {m.sender === "assistant" && (
                    <div className="feedback">
                      <button className="icon-btn"><ThumbsUp /></button>
                      <button className="icon-btn"><ThumbsDown /></button>
                    </div>
                  )}
                </div>
                {m.sender === "user" && <div className="avatar user"><User /></div>}
              </div>
            ))}

            {isLoading && (
              <div className="message-row">
                <div className="avatar bot"><Bot /></div>
                <div className="message-bubble message-assistant">
                  <div className="dots"><span /><span /><span /></div>
                </div>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="suggested">
              <p className="muted">Try asking:</p>
              <div className="suggest-list">
                {suggestedQuestions.map((q, i) => <button key={i} className="btn btn-outline small" onClick={() => handleSuggestedQuestion(q)}>{q}</button>)}
              </div>
            </div>
          )}

          <div className="chat-input">
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={onKeyDown} placeholder="Ask me anything about OJT..." />
            <button className="btn btn-primary" onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}><Send /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
