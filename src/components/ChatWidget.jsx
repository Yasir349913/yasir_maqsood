import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import { RiSparkling2Fill } from "react-icons/ri";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm Yasir's AI assistant.\n\nAsk me about his experience, projects, skills, or why you should hire him.",
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
        { message: msg },
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "AI unavailable right now. Please try again.",
        },
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
    "About Yasir",
    "Projects",
    "Experience",
    "Why hire him?",
  ];

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          title="Chat with Yasir's Assistant"
          style={{
            position: "fixed",
            bottom: "1.75rem",
            right: "1.75rem",
            width: "54px",
            height: "54px",
            background: "#C9A84C",
            border: "none",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9999,
            boxShadow:
              "0 8px 32px rgba(201,168,76,0.35), 0 2px 8px rgba(0,0,0,0.4)",
            transition: "all 0.25s ease",
            color: "#0C0C0E",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E8C76A";
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 12px 40px rgba(201,168,76,0.45), 0 4px 12px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#C9A84C";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(201,168,76,0.35), 0 2px 8px rgba(0,0,0,0.4)";
          }}
        >
          <RiSparkling2Fill size={20} />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "1.75rem",
            right: "1.75rem",
            width: "360px",
            height: "540px",
            background: "#0C0C0E",
            border: "0.5px solid rgba(201,168,76,0.15)",
            borderRadius: "3px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(201,168,76,0.08)",
            overflow: "hidden",
            animation: "slideUp 0.25s ease forwards",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.9rem 1rem",
              borderBottom: "0.5px solid rgba(255,255,255,0.05)",
              background: "rgba(201,168,76,0.03)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Avatar */}
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.12)",
                  border: "0.5px solid rgba(201,168,76,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaRobot style={{ color: "#C9A84C", fontSize: "12px" }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#F0EDE6",
                    fontWeight: "600",
                    letterSpacing: "0.02em",
                  }}
                >
                  Yasir's Assistant
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "1px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#4CAF50",
                      display: "inline-block",
                      boxShadow: "0 0 6px rgba(76,175,80,0.6)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#4A4845",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.06)",
                color: "#4A4845",
                cursor: "pointer",
                width: "28px",
                height: "28px",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F0EDE6";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#4A4845";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <FaTimes size={11} />
            </button>
          </div>

          {/* Suggestion Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              padding: "0.75rem 1rem",
              borderBottom: "0.5px solid rgba(255,255,255,0.04)",
              flexShrink: 0,
            }}
          >
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  fontSize: "0.68rem",
                  padding: "5px 11px",
                  border: "0.5px solid rgba(201,168,76,0.18)",
                  background: "transparent",
                  color: "#6B5A2E",
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                  e.currentTarget.style.color = "#C9A84C";
                  e.currentTarget.style.background = "rgba(201,168,76,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.18)";
                  e.currentTarget.style.color = "#6B5A2E";
                  e.currentTarget.style.background = "transparent";
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
              gap: "12px",
              scrollbarWidth: "none",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2px",
                    ...(m.role === "user"
                      ? { background: "#C9A84C" }
                      : {
                          background: "rgba(201,168,76,0.1)",
                          border: "0.5px solid rgba(201,168,76,0.2)",
                        }),
                  }}
                >
                  {m.role === "user" ? (
                    <FaUser style={{ fontSize: "10px", color: "#0C0C0E" }} />
                  ) : (
                    <MdAutoAwesome
                      style={{ fontSize: "12px", color: "#C9A84C" }}
                    />
                  )}
                </div>

                {/* Bubble */}
                <div
                  style={{
                    padding: "0.625rem 0.875rem",
                    borderRadius:
                      m.role === "user"
                        ? "12px 2px 12px 12px"
                        : "2px 12px 12px 12px",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    maxWidth: "80%",
                    whiteSpace: "pre-wrap",
                    ...(m.role === "user"
                      ? {
                          background: "#C9A84C",
                          color: "#0C0C0E",
                          fontWeight: "500",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          border: "0.5px solid rgba(255,255,255,0.07)",
                          color: "#A8A5A0",
                        }),
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "rgba(201,168,76,0.1)",
                    border: "0.5px solid rgba(201,168,76,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MdAutoAwesome
                    style={{ fontSize: "12px", color: "#C9A84C" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    padding: "0.75rem 0.875rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    borderRadius: "2px 12px 12px 12px",
                    alignItems: "center",
                  }}
                >
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: "5px",
                        height: "5px",
                        background: "#C9A84C",
                        borderRadius: "50%",
                        animation: `bounce 1.2s ${d}ms infinite`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderTop: "0.5px solid rgba(255,255,255,0.05)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexShrink: 0,
              background: "rgba(255,255,255,0.01)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "0.55rem 1rem",
                color: "#F0EDE6",
                fontSize: "0.82rem",
                outline: "none",
                fontFamily: "'Syne', sans-serif",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(201,168,76,0.35)";
                e.target.style.background = "rgba(255,255,255,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.background = "rgba(255,255,255,0.04)";
              }}
            />
            <button
              onClick={() => sendMessage()}
              style={{
                width: "36px",
                height: "36px",
                background: input.trim() ? "#C9A84C" : "rgba(201,168,76,0.2)",
                border: "none",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "default",
                color: input.trim() ? "#0C0C0E" : "#6B5A2E",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (input.trim()) e.currentTarget.style.background = "#E8C76A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = input.trim()
                  ? "#C9A84C"
                  : "rgba(201,168,76,0.2)";
              }}
            >
              <FaPaperPlane size={12} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
