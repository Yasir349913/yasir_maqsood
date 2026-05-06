import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles, animId;
    let mouseX = -9999,
      mouseY = -9999;
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 120;
    const MOUSE_REPEL = 90;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.4,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        const dx = p.x - mouseX,
          dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201, 168, 76, 0.45)";
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    resize();
    init();
    draw();
    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener("resize", () => {
      resize();
      init();
    });
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      setTimeout(
        () => {
          el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        },
        200 + i * 130,
      );
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#0C0C0E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
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
              "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.018,
            backgroundImage:
              "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <ParticleCanvas />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {/* Availability badge — plain text, no box */}
        <div
          data-reveal
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              animation: "pulse 2s infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B6B6B",
            }}
          >
            Available for Opportunities
          </span>
        </div>

        {/* Main heading */}
        <h1
          data-reveal
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
            color: "#F0EDE6",
          }}
        >
          Yasir
          <br />
          <span
            style={{
              WebkitTextStroke: "1px rgba(201, 168, 76, 0.6)",
              color: "transparent",
            }}
          >
            Maqsood
          </span>
          <span style={{ color: "#C9A84C" }}>.</span>
        </h1>

        {/* Typewriter — 3 clean roles */}
        <div
          data-reveal
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#8A8880",
            marginBottom: "1.5rem",
            height: "1.4rem",
          }}
        >
          <TypeAnimation
            sequence={[
              "Full Stack Engineer",
              2200,
              "Problem Solver",
              2200,
              "Exploring AI & Chatbots",
              2200,
            ]}
            speed={55}
            repeat={Infinity}
          />
        </div>

        {/* Tagline — updated, no VendorOS/FYP mention */}
        <p
          data-reveal
          style={{
            fontSize: "1.05rem",
            color: "#8A8880",
            maxWidth: "540px",
            lineHeight: 1.85,
            marginBottom: "2.75rem",
            fontWeight: 400,
          }}
        >
          I build clean, purposeful software — from full-stack web apps to
          AI-integrated products. Passionate about turning ideas into real,
          working things.{" "}
          <span style={{ color: "#F0EDE6" }}>
            Currently open to full-time roles and freelance projects.
          </span>
        </p>

        {/* CTAs — compact */}
        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          {/* View Projects */}
          <a
            href="#projects"
            style={{
              padding: "0.75rem 1.6rem",
              background: "#C9A84C",
              color: "#0C0C0E",
              borderRadius: "2px",
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: "700",
              transition: "all 0.3s ease",
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
            View Projects
          </a>

          {/* Resume */}

          {/* Contact Me */}
          <a
            href="#contact"
            style={{
              padding: "0.75rem 1.6rem",
              border: "0.5px solid rgba(240, 237, 230, 0.15)",
              color: "#6B6966",
              borderRadius: "2px",
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#F0EDE6";
              e.currentTarget.style.borderColor = "rgba(240,237,230,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B6966";
              e.currentTarget.style.borderColor = "rgba(240,237,230,0.15)";
            }}
          >
            Contact Me
          </a>

          {/* Schedule a Call */}
          <a
            href="/schedule"
            style={{
              padding: "0.75rem 1.6rem",
              border: "0.5px solid rgba(240, 237, 230, 0.15)",
              background: "transparent",
              color: "#6B6966",
              borderRadius: "2px",
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#F0EDE6";
              e.currentTarget.style.borderColor = "rgba(240,237,230,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B6966";
              e.currentTarget.style.borderColor = "rgba(240,237,230,0.15)";
            }}
          >
            Schedule a Call
          </a>
        </div>

        {/* Socials — compact, no Twitter */}
        <div
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
        >
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#3A3836",
            }}
          >
            Follow
          </span>
          <div
            style={{ width: "24px", height: "0.5px", background: "#3A3836" }}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            {[
              {
                icon: FaGithub,
                href: "https://github.com/Yasir349913",
                label: "GitHub",
              },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/yasir-maqsood/",
                label: "LinkedIn",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "#3A3836",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C9A84C";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#3A3836";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </section>
  );
}
