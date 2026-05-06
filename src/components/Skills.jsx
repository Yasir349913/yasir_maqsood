import { useEffect, useRef } from "react";
import { FaReact, FaNodeJs, FaGitAlt, FaFigma } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiExpress,
  SiStrapi,
  SiMongodb,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import { useScrollReveal } from "../hooks/hooks";

const categories = [
  {
    label: "Frontend",
    color: "rgba(201,168,76,1)",
    items: [
      { name: "React.js", icon: FaReact, level: 90 },
      { name: "Next.js", icon: SiNextdotjs, level: 78 },
      { name: "JavaScript ES6+", icon: SiJavascript, level: 88 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 85 },
      { name: "HTML5 / CSS3", icon: SiHtml5, level: 92 },
    ],
  },
  {
    label: "Backend",
    color: "rgba(201,168,76,0.8)",
    items: [
      { name: "Node.js", icon: FaNodeJs, level: 80 },
      { name: "Express.js", icon: SiExpress, level: 78 },
      { name: "Strapi CMS", icon: SiStrapi, level: 70 },
      { name: "REST APIs / JWT", icon: null, level: 82 },
    ],
  },
  {
    label: "Database & AI",
    color: "rgba(201,168,76,0.7)",
    items: [
      { name: "MongoDB", icon: SiMongodb, level: 75 },
      { name: "Claude API", icon: null, level: 80 },
      { name: "Prompt Engineering", icon: null, level: 78 },
      { name: "RAG Pipeline", icon: null, level: 65 },
    ],
  },
  {
    label: "Tools",
    color: "rgba(201,168,76,0.6)",
    items: [
      { name: "Git / GitHub", icon: FaGitAlt, level: 88 },
      { name: "Postman", icon: SiPostman, level: 82 },
      { name: "Vercel / Railway", icon: SiVercel, level: 80 },
      { name: "Figma", icon: FaFigma, level: 70 },
    ],
  },
];

function SkillBar({ name, icon: Icon, level, color, index }) {
  const barRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (barRef.current) {
              barRef.current.style.width = level + "%";
            }
            // count up number
            if (numRef.current) {
              let start = 0;
              const end = level;
              const duration = 900;
              const step = Math.ceil(duration / end);
              const timer = setInterval(() => {
                start += 1;
                if (numRef.current) numRef.current.textContent = start + "%";
                if (start >= end) {
                  clearInterval(timer);
                  if (numRef.current) numRef.current.textContent = end + "%";
                }
              }, step);
            }
          }, index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (barRef.current) observer.observe(barRef.current.parentElement.parentElement.parentElement);
    return () => observer.disconnect();
  }, [level, index]);

  return (
    <div
      style={{
        padding: "0.65rem 0",
        borderBottom: "0.5px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {Icon && (
            <Icon
              style={{ color: "#C9A84C", fontSize: "13px", opacity: 0.75 }}
            />
          )}
          <span
            style={{
              fontSize: "0.8rem",
              color: "#8A8880",
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </span>
        </div>
        <span
          ref={numRef}
          style={{
            fontSize: "0.65rem",
            color: "#4A4845",
            letterSpacing: "0.05em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          0%
        </span>
      </div>
      {/* Track */}
      <div
        style={{
          width: "100%",
          height: "2px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            background: `linear-gradient(90deg, rgba(201,168,76,0.4) 0%, ${color} 100%)`,
            borderRadius: "1px",
            transition: "width 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ label, color, items, revealDelay }) {
  return (
    <div
      data-reveal
      style={{
        background: "#111116",
        border: "0.5px solid rgba(255,255,255,0.06)",
        borderRadius: "2px",
        padding: "1.75rem",
        transition: "border-color 0.3s ease, transform 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: 0.5,
        }}
      />

      {/* Category header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            width: "3px",
            height: "14px",
            background: color,
            borderRadius: "2px",
            opacity: 0.8,
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A84C",
            fontWeight: "500",
          }}
        >
          {label}
        </span>
      </div>

      {/* Skill bars */}
      <div>
        {items.map((item, i) => (
          <SkillBar key={item.name} {...item} color={color} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useScrollReveal({ staggerMs: 100 });

  return (
    <section
      id="skills"
      style={{
        minHeight: "100vh",
        background: "#0C0C0E",
        display: "flex",
        alignItems: "center",
        padding: "7rem 2.5rem",
      }}
    >
      <div
        ref={sectionRef}
        style={{ maxWidth: "960px", margin: "0 auto", width: "100%" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
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
            What I Know
          </p>
          <div
            data-reveal
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.25rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#F0EDE6",
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Skills &{" "}
              <span
                style={{
                  WebkitTextStroke: "1px rgba(201,168,76,0.5)",
                  color: "transparent",
                }}
              >
                Technologies
              </span>
            </h2>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#4A4845",
                letterSpacing: "0.05em",
                margin: 0,
                paddingBottom: "0.5rem",
              }}
            >
              {categories.reduce((acc, c) => acc + c.items.length, 0)} technologies
            </p>
          </div>
        </div>

        {/* 2x2 grid of category cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="skills-grid"
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.label} {...cat} revealDelay={i * 100} />
          ))}
        </div>

        {/* Bottom quote */}
        <div
          data-reveal
          style={{
            marginTop: "3.5rem",
            padding: "1.5rem 2rem",
            borderLeft: "1px solid rgba(201,168,76,0.3)",
            background: "rgba(201,168,76,0.02)",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "#6B6966",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            "I pick the right tool for the job — not the most trending one."
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}