import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
} from "react-icons/fa";
import { sendContactMessage } from "../services/contact.service";
import { useScrollReveal } from "../hooks/hooks";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Yasir349913",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yasir-maqsood/",
  },
];

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.02)",
  border: "0.5px solid rgba(255,255,255,0.08)",
  borderRadius: "2px",
  padding: "0.875rem 1rem",
  color: "#F0EDE6",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.3s ease, background 0.3s ease",
  fontFamily: "'Syne', sans-serif",
};

const labelStyle = {
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#4A4845",
  display: "block",
  marginBottom: "6px",
  fontWeight: "500",
};

function SuccessCard({ onReset }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        background: "rgba(201,168,76,0.03)",
        border: "0.5px solid rgba(201,168,76,0.2)",
        borderRadius: "2px",
        animation: "fadeUp 0.5s ease forwards",
      }}
    >
      <FaCheckCircle
        style={{ fontSize: "2.5rem", color: "#C9A84C", marginBottom: "1.25rem" }}
      />
      <h3
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: "1.5rem",
          color: "#F0EDE6",
          marginBottom: "0.5rem",
        }}
      >
        Message Sent
      </h3>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#8A8880",
          lineHeight: 1.7,
          marginBottom: "0.5rem",
        }}
      >
        Thanks for reaching out. I'll reply within{" "}
        <span style={{ color: "#C9A84C" }}>24 hours</span>.
      </p>
      <p style={{ fontSize: "0.8rem", color: "#4A4845", marginBottom: "2rem" }}>
        In the meantime, check out my work on GitHub.
      </p>
      <button
        onClick={onReset}
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "0.6rem 1.5rem",
          border: "0.5px solid rgba(255,255,255,0.1)",
          background: "transparent",
          color: "#8A8880",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          fontFamily: "'Syne', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#F0EDE6";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#8A8880";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        Send another message
      </button>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const sectionRef = useScrollReveal({ staggerMs: 120 });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFocus = (e) => {
    e.target.style.borderColor = "rgba(201,168,76,0.4)";
    e.target.style.background = "rgba(201,168,76,0.02)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,0.08)";
    e.target.style.background = "rgba(255,255,255,0.02)";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const data = await sendContactMessage(form);
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else setStatus("idle");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        background: "#111116",
        display: "flex",
        alignItems: "center",
        padding: "7rem 2.5rem",
      }}
    >
      <div
        ref={sectionRef}
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left */}
        <div>
          <p
            data-reveal
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "1rem",
              fontWeight: "500",
            }}
          >
            Get In Touch
          </p>

          <h2
            data-reveal
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.25rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#F0EDE6",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em",
            }}
          >
            Let&apos;s Build{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(201,168,76,0.5)",
                color: "transparent",
              }}
            >
              Something
            </span>
          </h2>

          <p
            data-reveal
            style={{
              fontSize: "0.9rem",
              color: "#8A8880",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Open to associate roles, freelance projects, and startup collaborations.
            Have an idea or opportunity? Let&apos;s talk.
          </p>

          {/* Socials — icon only */}
          <div
            data-reveal
            style={{ display: "flex", gap: "1rem" }}
          >
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  width: "42px",
                  height: "42px",
                  border: "0.5px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C9A84C",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                  e.currentTarget.style.background = "rgba(201,168,76,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div data-reveal>
          {status === "sent" ? (
            <SuccessCard onReset={() => setStatus("idle")} />
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {[
                { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ ...inputStyle }}
                  />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "0.875rem",
                  background: status === "sending" ? "rgba(201,168,76,0.4)" : "#C9A84C",
                  color: "#0C0C0E",
                  border: "none",
                  borderRadius: "2px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "'Syne', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (status !== "sending") {
                    e.currentTarget.style.background = "#E8C76A";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    status === "sending" ? "rgba(201,168,76,0.4)" : "#C9A84C";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}