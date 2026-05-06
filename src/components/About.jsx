import { useCountUp, useScrollReveal } from "../hooks/hooks";

const stats = [
  { number: "4", suffix: "+", label: "Projects Delivered" },
  { number: "1", suffix: "+", label: "Years Experience" },
  { number: "15", suffix: "+", label: "Technologies" },
];

function StatCard({ number, suffix, label }) {
  const ref = useCountUp(parseInt(number), 1800);
  return (
    <div
      style={{
        background: "#0C0C0E",
        border: "0.5px solid rgba(255,255,255,0.07)",
        borderRadius: "2px",
        padding: "1.25rem 1rem",
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
        e.currentTarget.style.background = "#13130f";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.background = "#0C0C0E";
      }}
    >
      <p
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: "2.25rem",
          color: "#C9A84C",
          lineHeight: 1,
          marginBottom: "6px",
        }}
      >
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#4A4845",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useScrollReveal({ staggerMs: 120 });

  return (
    <section
      id="about"
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
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Photo */}
        <div data-reveal style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            {/* Gold frame corners */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                left: "-16px",
                width: "60px",
                height: "60px",
                borderTop: "1px solid rgba(201,168,76,0.5)",
                borderLeft: "1px solid rgba(201,168,76,0.5)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                right: "-16px",
                width: "60px",
                height: "60px",
                borderBottom: "1px solid rgba(201,168,76,0.5)",
                borderRight: "1px solid rgba(201,168,76,0.5)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            {/* Image — no blend mode, just grayscale + contrast */}
            <img
              src="/photo.jpeg"
              alt="Yasir Maqsood"
              style={{
                width: "280px",
                height: "340px",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
                borderRadius: "2px",
                filter: "grayscale(30%) contrast(1.1) brightness(1.05)",
              }}
            />

            {/* Bottom fade — blends image into section bg */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background:
                  "linear-gradient(to top, #111116 0%, transparent 100%)",
                borderRadius: "0 0 2px 2px",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Subtle gold tint overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(201,168,76,0.06) 0%, transparent 60%)",
                borderRadius: "2px",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Content */}
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
            About Me
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
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            Passionate Builder,{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(201,168,76,0.5)",
                color: "transparent",
              }}
            >
              Problem Solver
            </span>
          </h2>

          <p
            data-reveal
            style={{
              color: "#8A8880",
              lineHeight: 1.8,
              marginBottom: "1rem",
              fontSize: "0.95rem",
            }}
          >
            Final year CS student at UCP Lahore. I don&apos;t just write code —
            I think deeply about{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>why</em>{" "}
            something is being built and who it&apos;s for.
          </p>

          <p
            data-reveal
            style={{
              color: "#8A8880",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
              fontSize: "0.95rem",
            }}
          >
            Working on{" "}
            <span
              style={{
                color: "#C9A84C",
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              VendorOS
            </span>{" "}
            as my Final Year Project — an AI-powered Business OS for
            Pakistan&apos;s SMEs.{" "}
            <span style={{ color: "#6B6966" }}>
              Early days, but building something meaningful.
            </span>
          </p>

          {/* Stats */}
          <div
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
            }}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}