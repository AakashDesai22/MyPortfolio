"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast tracking for cursor position
    const xTo = gsap.quickTo(cursor, "left", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "top", { duration: 0.1, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseEnter = () => cursor.classList.add("hovering");
    const handleMouseLeave = () => cursor.classList.remove("hovering");

    window.addEventListener("mousemove", onMouseMove);

    // Attach magnetic/hover effects to interactable elements dynamically
    const applyMagneticEffect = () => {
      const interactables = document.querySelectorAll("a, button, .magnetic");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    applyMagneticEffect();
    
    // We would use MutationObserver in a real robust setup, but for this landing page layout it's fine
    const observer = new MutationObserver(applyMagneticEffect);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const interactables = document.querySelectorAll("a, button, .magnetic");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor default" />;
}
