import { useState, useRef } from "react";
import { useScrollReveal } from "../hooks/hooks";

const projects = [
  {
    num: "01",
    title: "Zezt Restaurant Portal",
    description:
      "Production-level SaaS restaurant system with real-time chat, notifications, payment integration, role-based access, dashboard analytics, occupancy tracking, and deal management.",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "Socket.io", "Stripe"],
    category: "Full Stack",
    github: "https://github.com/Yasir349913/zezt-restaurant-portal",
    live: null,
    status: "Completed",
    featured: true,
  },
  {
    num: "02",
    title: "RegalRooms Frontend",
    description:
      "Modern hotel booking frontend with responsive UI and dynamic data integration from APIs.",
    tags: ["React.js", "API Integration"],
    category: "Frontend",
    github: "https://github.com/Yasir349913/regalroms-frontend",
    live: null,
    status: "Completed",
  },
  {
    num: "03",
    title: "VendorOS",
    description:
      "AI-powered Business OS for SMEs with inventory, insights, and Urdu AI assistant. Currently in development.",
    tags: ["React.js", "Node.js", "MongoDB", "AI"],
    category: "AI",
    github: null,
    live: null,
    status: "In Progress",
  },
  {
    num: "04",
    title: "Shopify System",
    description:
      "Shopify-inspired inventory management system with product tracking and admin dashboard.",
    tags: ["React.js", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com/Yasir349913/shopify-system",
    live: null,
    status: "In Progress",
  },
  {
    num: "05",
    title: "TecIA Finance Platform",
    description:
      "Live deployed finance web app with clean UI and practical usability.",
    tags: ["React.js", "Vercel"],
    category: "Live",
    github: null,
    live: "https://ico-doc-g8g4.vercel.app/",
    status: "Live",
  },
  {
    num: "06",
    title: "Finance Web App",
    description:
      "Lightweight financial interface focusing on performance and user experience.",
    tags: ["React.js", "Vercel"],
    category: "Live",
    github: null,
    live: "https://ico-doc-g8g4.vercel.app/",
    status: "Live",
  },
];

const filters = ["All", "Full Stack", "Frontend", "AI", "Live"];

const GitHubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const statusConfig = {
  Live: {
    color: "#4ade80",
    background: "rgba(74,222,128,0.08)",
    border: "0.5px solid rgba(74,222,128,0.2)",
    dot: "#4ade80",
  },
  Completed: {
    color: "#C9A84C",
    background: "rgba(201,168,76,0.08)",
    border: "0.5px solid rgba(201,168,76,0.2)",
    dot: "#C9A84C",
  },
  "In Progress": {
    color: "#6B7280",
    background: "rgba(107,114,128,0.08)",
    border: "0.5px solid rgba(107,114,128,0.2)",
    dot: "#6B7280",
  },
};

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
    setHovered(false);
  };

  const status = statusConfig[project.status] || statusConfig["In Progress"];
  const hasLinks = project.github || project.live;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: project.featured
          ? "rgba(201,168,76,0.03)"
          : "rgba(255,255,255,0.01)",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
        boxSizing: "border-box",
        boxShadow: hovered
          ? "inset 0 0 0 0.5px rgba(201,168,76,0.2)"
          : "inset 0 0 0 0.5px rgba(255,255,255,0.04)",
        borderRadius: "2px",
      }}
    >
      {/* Featured top bar */}
      {project.featured && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1.5px",
          background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2))",
        }} />
      )}

      {/* Subtle hover glow */}
      {hovered && (
        <div style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "160px",
          height: "160px",
          background: "rgba(201,168,76,0.04)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />
      )}

      {/* Top row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.1rem",
      }}>
        <span style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.12)",
          letterSpacing: "0.1em",
          fontWeight: 500,
          fontFamily: "monospace",
        }}>
          {project.num}
        </span>

        <span style={{
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "3px 8px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          ...status,
        }}>
          <span style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: status.dot,
            display: "inline-block",
            ...(project.status === "Live" && {
              animation: "pulse 2s infinite",
            }),
          }} />
          {project.status}
        </span>
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          fontSize: "9px",
          letterSpacing: "0.15em",
          color: "#C9A84C",
          textTransform: "uppercase",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          opacity: 0.8,
        }}>
          <span style={{
            width: "20px",
            height: "0.5px",
            background: "#C9A84C",
          }} />
          Featured — Real World SaaS
        </div>
      )}

      {/* Title */}
      <h3 style={{
        fontSize: "15px",
        fontWeight: 500,
        color: hovered ? "#F0EDE6" : "#D0CCC6",
        marginBottom: "0.65rem",
        lineHeight: 1.3,
        transition: "color 0.2s ease",
        letterSpacing: "-0.01em",
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: "13px",
        color: "#6B7280",
        lineHeight: 1.7,
        flex: 1,
        marginBottom: "1.25rem",
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{
        display: "flex",
        gap: "6px",
        flexWrap: "wrap",
        marginBottom: "1.25rem",
      }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontSize: "10px",
            color: "#9CA3AF",
            letterSpacing: "0.05em",
            padding: "3px 8px",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: "2px",
            background: "rgba(255,255,255,0.03)",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{
        display: "flex",
        gap: "1rem",
        paddingTop: "1rem",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        marginTop: "auto",
      }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#4B5563",
              transition: "color 0.15s",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
          >
            <GitHubIcon /> GitHub
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#4B5563",
              transition: "color 0.15s",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
          >
            <LinkIcon /> Live Demo
          </a>
        )}

        {!hasLinks && (
          <span style={{
            fontSize: "11px",
            color: "#374151",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}>
            <span style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "#374151",
              display: "inline-block",
            }} />
            Private Repo
          </span>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const sectionRef = useScrollReveal({ staggerMs: 120 });

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      style={{
        background: "#0E0E12",
        padding: "7rem 2rem",
      }}
    >
      <div ref={sectionRef} style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
            fontWeight: "500",
          }}>
            Portfolio
          </p>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{
                fontSize: "clamp(1.6rem, 3vw, 2rem)",
                fontWeight: 500,
                color: "#F0EDE6",
                marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
              }}>
                Selected Work
              </h2>
              <p style={{
                fontSize: "0.85rem",
                color: "#6B7280",
              }}>
                Production builds, experiments & in-progress projects
              </p>
            </div>

            {/* Project count */}
            <span style={{
              fontSize: "0.75rem",
              color: "#374151",
              letterSpacing: "0.05em",
              border: "0.5px solid rgba(255,255,255,0.06)",
              padding: "4px 12px",
              borderRadius: "20px",
            }}>
              {filtered.length} projects
            </span>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                padding: "5px 14px",
                border: `0.5px solid ${active === f ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.06)"}`,
                color: active === f ? "#C9A84C" : "#4B5563",
                background: active === f ? "rgba(201,168,76,0.06)" : "transparent",
                cursor: "pointer",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: "2px",
                transition: "all 0.15s",
                fontFamily: "inherit",
                fontWeight: active === f ? "600" : "400",
              }}
              onMouseEnter={(e) => {
                if (active !== f) {
                  e.currentTarget.style.color = "#9CA3AF";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== f) {
                  e.currentTarget.style.color = "#4B5563";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {filtered.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}