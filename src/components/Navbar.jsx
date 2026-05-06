import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lineRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActiveSection(e.target.id),
        ),
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 999 }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2.5rem",
          transition: "all 0.5s ease",
          background: scrolled ? "rgba(12, 12, 14, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "0.5px solid rgba(201, 168, 76, 0.12)"
            : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1.5rem",
            fontStyle: "italic",
            color: "#F0EDE6",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Yasir<span style={{ color: "#C9A84C" }}>.</span>
        </a>

        {/* Desktop Links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            listStyle: "none",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.label} style={{ position: "relative" }}>
                <a
                  href={link.href}
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: isActive ? "#F0EDE6" : "#8A8880",
                    transition: "color 0.3s ease",
                    fontWeight: isActive ? "600" : "400",
                  }}
                >
                  {link.label}
                </a>
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#C9A84C",
                    }}
                  />
                )}
              </li>
            );
          })}
          <li>
            <a
              href="/resume.pdf"
              download
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.5rem 1.25rem",
                border: "0.5px solid rgba(201, 168, 76, 0.4)",
                color: "#C9A84C",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201, 168, 76, 0.1)";
                e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.4)";
              }}
            >
              Résumé ↗
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#F0EDE6",
            fontSize: "1.25rem",
            cursor: "pointer",
          }}
          className="mobile-toggle"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(12, 12, 14, 0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "0.5px solid rgba(201, 168, 76, 0.12)",
            padding: "1.5rem 2.5rem",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: "0.85rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: isActive ? "#C9A84C" : "#8A8880",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {isActive && (
                      <span
                        style={{
                          width: "6px",
                          height: "1px",
                          background: "#C9A84C",
                        }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="/resume.pdf"
                download
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "0.5rem 1.25rem",
                  border: "0.5px solid rgba(201, 168, 76, 0.4)",
                  color: "#C9A84C",
                  borderRadius: "2px",
                  display: "inline-block",
                }}
              >
                Résumé ↗
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
