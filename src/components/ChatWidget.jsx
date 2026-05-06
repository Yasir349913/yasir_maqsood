import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm Yasir's AI assistant.\n\nAsk me about:\n• Experience & projects\n• Skills & tech stack\n• Why hire Yasir",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://portfolio-backend-nine-gilt.vercel.app/api/chat",
        {
          message: msg,
        },
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ AI unavailable right now." },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "Tell me about Yasir",
    "Projects?",
    "Experience?",
    "Why hire him?",
  ];

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          title="Chat with AI"
          style={{
            position: "fixed",
            bottom: "1.75rem",
            right: "1.75rem",
            width: "52px",
            height: "52px",
            background: "#C9A84C",
            border: "none",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9999,
            boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
            transition: "all 0.3s ease",
            color: "#0C0C0E",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E8C76A";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#C9A84C";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <FaRobot size={18} />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "1.75rem",
            right: "1.75rem",
            width: "340px",
            height: "520px",
            background: "#0C0C0E",
            border: "0.5px solid rgba(201,168,76,0.2)",
            borderRadius: "2px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(201,168,76,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.875rem 1rem",
              borderBottom: "0.5px solid rgba(201,168,76,0.12)",
              background: "rgba(201,168,76,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaRobot style={{ color: "#C9A84C", fontSize: "13px" }} />
              <span
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: "500",
                }}
              >
                Yasir's Assistant
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#4A4845",
                cursor: "pointer",
                padding: "4px",
                transition: "color 0.2s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EDE6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4A4845")}
            >
              <FaTimes size={13} />
            </button>
          </div>

          {/* Suggestions */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              padding: "0.75rem 1rem",
              borderBottom: "0.5px solid rgba(255,255,255,0.05)",
            }}
          >
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  fontSize: "0.7rem",
                  padding: "4px 10px",
                  border: "0.5px solid rgba(201,168,76,0.2)",
                  background: "rgba(201,168,76,0.04)",
                  color: "#8A6E30",
                  borderRadius: "1px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'Syne', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                  e.currentTarget.style.color = "#C9A84C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                  e.currentTarget.style.color = "#8A6E30";
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "1rem",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: "0.625rem 0.875rem",
                  borderRadius: "2px",
                  fontSize: "0.82rem",
                  lineHeight: 1.65,
                  maxWidth: "88%",
                  whiteSpace: "pre-wrap",
                  ...(m.role === "user"
                    ? {
                        marginLeft: "auto",
                        background: "#C9A84C",
                        color: "#0C0C0E",
                        fontWeight: "500",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "0.5px solid rgba(255,255,255,0.06)",
                        color: "#8A8880",
                      }),
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  padding: "0.625rem 0.875rem",
                }}
              >
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "#C9A84C",
                      borderRadius: "50%",
                      animation: `bounce 1.2s ${d}ms infinite`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderTop: "0.5px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "2px",
                padding: "0.5rem 0.75rem",
                color: "#F0EDE6",
                fontSize: "0.82rem",
                outline: "none",
                fontFamily: "'Syne', sans-serif",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(201,168,76,0.35)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.08)")
              }
            />
            <button
              onClick={() => sendMessage()}
              style={{
                width: "34px",
                height: "34px",
                background: "#C9A84C",
                border: "none",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#0C0C0E",
                transition: "background 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#E8C76A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#C9A84C")
              }
            >
              <FaPaperPlane size={11} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
