import { useEffect } from "react";
import { InlineWidget } from "react-calendly";
import { FaArrowLeft } from "react-icons/fa";

export default function SchedulePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0C0C0E",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs — same as Hero */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "-10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.015,
            backgroundImage:
              "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Top navbar */}
      <nav
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem 2.5rem",
          borderBottom: "0.5px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        {/* Back button */}
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#8A8880",
            textDecoration: "none",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8880")}
        >
          <FaArrowLeft style={{ fontSize: "0.7rem" }} />
          Back
        </a>

        {/* Wordmark */}
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "#F0EDE6",
            letterSpacing: "-0.01em",
          }}
        >
          Yasir<span style={{ color: "#C9A84C" }}>.</span>
        </span>

        {/* Spacer */}
        <div style={{ width: "80px" }} />
      </nav>

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "3.5rem 2rem 1rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "0.5px solid rgba(201, 168, 76, 0.3)",
            background: "rgba(201, 168, 76, 0.05)",
            borderRadius: "2px",
            padding: "6px 14px",
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            Available for Opportunities
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#F0EDE6",
            marginBottom: "1rem",
          }}
        >
          Let's talk.
        </h1>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#8A8880",
            maxWidth: "460px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Pick a time that works for you — 30 minutes, no fluff.
          <br />
          <span style={{ color: "#C9A84C" }}>PKT (UTC+5)</span> slots available.
        </p>
      </div>

      {/* Calendly Inline Widget */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          padding: "0 1.5rem 3rem",
        }}
      >
        <InlineWidget
          url="https://calendly.com/yasirmaqsood534/30min"
          styles={{
            height: "700px",
            minWidth: "320px",
            borderRadius: "4px",
          }}
          pageSettings={{
            backgroundColor: "0C0C0E",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "C9A84C",
            textColor: "F0EDE6",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}