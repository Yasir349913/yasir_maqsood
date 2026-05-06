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
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const statusStyles = {
  Live: {
    color: "#4ade80",
    background: "rgba(74,222,128,0.08)",
    border: "0.5px solid rgba(74,222,128,0.2)",
  },
  Completed: {
    color: "#C9A84C",
    background: "rgba(201,168,76,0.08)",
    border: "0.5px solid rgba(201,168,76,0.2)",
  },
  "In Progress": {
    color: "#888",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid #2a2a2a",
  },
};

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -3;
    const rotateY = ((x - cx) / cx) * 3;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  const status = statusStyles[project.status] || statusStyles["In Progress"];
  const hasLinks = project.github || project.live;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: project.featured ? "rgba(201,168,76,0.04)" : "#111116",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.2s ease",
        height: "100%",
      }}
    >
      {/* Gold accent line for featured */}
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "#C9A84C",
          }}
        />
      )}

      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#2a2a2a",
            letterSpacing: "0.1em",
            fontWeight: 500,
          }}
        >
          {project.num}
        </span>

        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: "2px",
            ...status,
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Featured label */}
      {project.featured && (
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span
            style={{
              width: "16px",
              height: "0.5px",
              background: "#C9A84C",
              display: "inline-block",
            }}
          />
          Real world SaaS
        </div>
      )}

      {/* Title */}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 500,
          color: "#F0EDE6",
          marginBottom: "0.6rem",
          lineHeight: 1.3,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: "#555",
          lineHeight: 1.65,
          flex: 1,
          marginBottom: "1.25rem",
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "10px",
              color: "#3a3a3a",
              letterSpacing: "0.06em",
              padding: "3px 7px",
              border: "0.5px solid #1e1e1e",
              borderRadius: "2px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          paddingTop: "1rem",
          borderTop: "0.5px solid #1a1a1a",
          marginTop: "auto",
        }}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#444",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
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
              gap: "5px",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#444",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
          >
            <LinkIcon /> Live
          </a>
        )}

        {!hasLinks && (
          <span
            style={{
              fontSize: "11px",
              color: "#222",
              letterSpacing: "0.06em",
            }}
          >
            Private repo
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
        background: "#111116",
        padding: "6rem 2rem",
      }}
    >
      <div ref={sectionRef} style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          Portfolio
        </p>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "#F0EDE6",
            marginBottom: "0.25rem",
          }}
        >
          Projects
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#555",
            marginBottom: "2rem",
          }}
        >
          Selected work — production, experiments & in-progress builds
        </p>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                padding: "5px 14px",
                border: `0.5px solid ${active === f ? "#C9A84C" : "#2a2a2a"}`,
                color: active === f ? "#C9A84C" : "#555",
                background: active === f ? "rgba(201,168,76,0.06)" : "transparent",
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "0.08em",
                borderRadius: "2px",
                transition: "all 0.15s",
                fontFamily: "inherit",
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
            gap: "1px",
            background: "#1c1c21",
          }}
        >
          {filtered.map((p) => (
            <div key={p.title} style={{ background: "#111116" }}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}