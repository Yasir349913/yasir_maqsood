import { useEffect, useRef } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const experiences = [
  {
    title: "Frontend Developer Intern",
    organization: "BelikeIt Group",
    period: "Jan 2025 – Mar 2025",
    location: "Onsite, Pakistan",
    description:
      "Worked onsite building React.js interfaces from Figma. Created reusable components and responsive dashboards.",
    tech: [FaReact],
  },
  {
    title: "Full Stack Developer",
    organization: "DevTag",
    period: "Jun 2025 – Feb 2026",
    location: "Onsite, Pakistan",
    description:
      "Built and deployed real-world SaaS applications using MERN stack. Developed APIs and production systems.",
    tech: [FaReact, FaNodeJs, SiExpress, SiMongodb],
    highlight: true,
  },
  {
    title: "Executive Member (Web Domain)",
    organization: "Google Developers Group (GDG)",
    period: "Nov 2025 – Present",
    location: "Pakistan",
    description:
      "Organizing developer events and helping community grow in web technologies.",
    tech: [FaReact],
  },
  {
    title: "BS Computer Science",
    organization: "University of Central Punjab (UCP)",
    period: "2023 – 2027",
    location: "Lahore, Pakistan",
    description:
      "Focused on full-stack dev and AI systems. Working on FYP: VendorOS.",
    tech: [],
  },
];

export default function Experience() {
  const sectionRef = useRef();

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      style={{
        background: "#0C0C0E",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.7rem", letterSpacing: "2px" }}>
            MY JOURNEY
          </p>
          <h2 style={{ color: "#F0EDE6", fontSize: "2.5rem" }}>
            Experience & Education
          </h2>
        </div>

        {/* Timeline */}
        <div ref={sectionRef} style={{ position: "relative" }}>
          {/* Line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "#333",
              transform: "translateX(-50%)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {experiences.map((item, i) => {
              const left = i % 2 === 0;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: left ? "flex-start" : "flex-end",
                    position: "relative",
                  }}
                >
                  {/* Card */}
                  <div
                    className="reveal"
                    style={{
                      width: "45%",
                      minWidth: "280px",
                      background: "#111",
                      padding: "1.5rem",
                      border: item.highlight
                        ? "1px solid #C9A84C"
                        : "1px solid #222",
                      borderRadius: "6px",
                    }}
                  >
                    <h3 style={{ color: "#fff" }}>{item.title}</h3>
                    <p style={{ color: "#C9A84C" }}>{item.organization}</p>
                    <p style={{ fontSize: "0.75rem", color: "#777" }}>
                      {item.location}
                    </p>

                    <p style={{ marginTop: "0.5rem", color: "#aaa" }}>
                      {item.description}
                    </p>

                    <span style={{ fontSize: "0.7rem", color: "#C9A84C" }}>
                      {item.period}
                    </span>

                    {item.tech.length > 0 && (
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        {item.tech.map((Icon, idx) => (
                          <Icon key={idx} style={{ color: "#C9A84C" }} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "14px",
                      height: "14px",
                      background: "#0C0C0E",
                      border: "2px solid #C9A84C",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .reveal {
          opacity: 1; /* IMPORTANT FIX */
          transform: translateY(40px);
          transition: all 0.6s ease;
        }

        .reveal.show {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .reveal {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}