"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Link as LinkIcon, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DeepDive() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [exp, setExp] = useState(0);
  const [projs, setProjs] = useState(0);

  useEffect(() => {
    // Rotating Border Animation
    if (borderRef.current) {
      gsap.to(borderRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }

    // 3D Tilt Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (e.clientY - centerY) / 25;
        const rotateY = (e.clientX - centerX) / -25;

        gsap.to(cardRef.current, {
          rotateX,
          rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Graduation Cap Floating Animation
    if (capRef.current) {
      gsap.to(capRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Numbers Counter Animation
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          const stats = { e: 0, p: 0 };
          gsap.to(stats, {
            e: 5,
            p: 40,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              setExp(Math.floor(stats.e));
              setProjs(Math.floor(stats.p));
            }
          });
        }
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Deep Dive Box (Span 3) */}
        <div 
          ref={cardRef}
          className="lg:col-span-3 group relative rounded-3xl bg-[#0c0c0c] p-[2px] overflow-hidden shadow-[0_0_60px_rgba(0,255,204,0.05)] transition-shadow duration-700"
        >
          {/* Rotating Conic Gradient Border */}
          <div 
            ref={borderRef}
            className="absolute -inset-[100%] z-0 pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, transparent, #00ffcc, transparent 30%, transparent, #84cc16, transparent 70%)"
            }}
          />
          
          <div className="relative z-10 h-full w-full bg-[#0c0c0c] rounded-[calc(1.5rem-2px)] p-8 lg:p-12 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-accent/80 font-bold uppercase tracking-[0.2em] text-[10px]">
                <Zap className="w-4 h-4 fill-current" />
                <span>Currently Deep Diving</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Mastering Web3 & Rust
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm font-bold">Smart Contracts</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  Learning Solidity and Ethers.js to build decentralized applications on Ethereum.
                </p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-lime-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-bold">Performance</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  Exploring Rust for high-performance systems and backend services using Actix-web.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Icon Cap */}
          <div ref={capRef} className="absolute top-12 right-12 text-white/5 pointer-events-none">
            <GraduationCap className="w-48 h-48 lg:w-64 lg:h-64" />
          </div>
        </div>

        {/* Stats Column (Span 2) */}
        <div className="lg:col-span-2 flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-12 glass space-y-12">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl lg:text-7xl font-bold text-accent">{exp}+</span>
              <span className="text-white/40 text-sm font-bold uppercase tracking-widest pl-2">Years experience</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl lg:text-7xl font-bold text-white">{projs}+</span>
              <span className="text-white/40 text-sm font-bold uppercase tracking-widest pl-2">Projects shipped</span>
            </div>
          </div>

          <p className="text-white/40 italic leading-relaxed pt-4 border-t border-white/5">
            "Code is not just syntax; it's the medium through which we solve human problems at scale."
          </p>
        </div>

      </div>
    </section>
  );
}
