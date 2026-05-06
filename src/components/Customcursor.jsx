import { useEffect, useRef } from "react";

export default function customCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    document.body.style.cursor = "none";

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "52px";
        ringRef.current.style.height = "52px";
        ringRef.current.style.borderColor = "rgba(201,168,76,0.8)";
        ringRef.current.style.background = "rgba(201,168,76,0.06)";
        ringRef.current.style.marginTop = "-8px";
        ringRef.current.style.marginLeft = "-8px";
      }
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "rgba(201,168,76,0.45)";
        ringRef.current.style.background = "transparent";
        ringRef.current.style.marginTop = "0";
        ringRef.current.style.marginLeft = "0";
      }
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    window.addEventListener("mousemove", onMove);
    animate();
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          background: #C9A84C;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: opacity 0.2s;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1px solid rgba(201,168,76,0.45);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          will-change: transform;
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
