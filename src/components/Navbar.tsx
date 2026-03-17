"use client";

import { MonitorPlay } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simple fade in down for navbar
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-6 lg:px-20 py-6 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto cursor-none magnetic">
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-accent">
          <MonitorPlay className="w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-white">Akki</span>
      </div>

      <div className="hidden md:flex items-center gap-8 bg-black/20 glass px-8 py-3 rounded-full pointer-events-auto">
        {["Work", "Services", "About", "Contact"].map((item) => (
          <Link key={item} href={`#\${item.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-accent transition-colors magnetic">
            {item}
          </Link>
        ))}
      </div>

      <div className="pointer-events-auto">
        <button className="magnetic btn-liquid bg-accent text-black font-bold px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(0,255,204,0.4)] transition-all">
          Hire Me
        </button>
      </div>
    </nav>
  );
}
