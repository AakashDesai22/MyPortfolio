"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, Star, Cpu, Smartphone, Layers, Box, Fingerprint } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | HTMLParagraphElement)[]>([]);
  const pillRefs = useRef<HTMLDivElement[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fastDeliveryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Spotlight follow
    const onMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const rect = spotlightRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(spotlightRef.current, {
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 255, 204, 0.1), transparent 40%)`,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // 3D Tilt Effect
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(cardRef.current, {
        rotationY: xPos * 10,
        rotationX: -yPos * 10,
        x: xPos * 20,
        y: yPos * 20,
        ease: "power3.out",
        transformPerspective: 1000,
        transformOrigin: "center center",
      });

      gsap.to(statusRef.current, {
        rotationY: xPos * 25,
        rotationX: -yPos * 25,
        x: xPos * 40,
        y: yPos * 40,
        ease: "power3.out",
        transformPerspective: 1000,
      });

      gsap.to(pillRefs.current, {
        x: xPos * 10,
        y: yPos * 10,
        stagger: 0.02,
        ease: "power3.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Initial Entrance Animations
    const tl = gsap.timeline();

    // Text Reveal
    tl.fromTo(
      textRefs.current,
      { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Pills Pop-in
    tl.fromTo(
      pillRefs.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Card entrance
    tl.fromTo(
      [cardRef.current, statusRef.current, fastDeliveryRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.8"
    );

    // Continuous floating
    gsap.to(statusRef.current, {
      y: "-=15",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to(fastDeliveryRef.current, {
      y: "+=15",
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // ScrollTrigger Parallax
    gsap.to(cardRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      scale: 1.1,
      rotationZ: 5,
      y: 100, // moves down slower than scroll
    });

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      backgroundPosition: "0px 200px",
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToTextRefs = (el: any) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToPillRefs = (el: any) => {
    if (el && !pillRefs.current.includes(el)) {
      pillRefs.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 lg:px-20 pt-20 pb-10">
      {/* Spotlight Overlay */}
      <div ref={spotlightRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Content */}
        <div className="flex flex-col space-y-8">
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-max">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Available for Projects</span>
          </div>

          <div className="space-y-4">
            <h1 ref={addToTextRefs} className="text-5xl sm:text-7xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight">
              Building <br className="hidden sm:block" />
              <span className="text-gradient">scalable</span> full- <br className="hidden sm:block" />
              stack solutions <br className="hidden sm:block" />
              with a focus on <br className="hidden sm:block" />
              UX
            </h1>
            <p ref={addToTextRefs} className="text-lg text-white/60 max-w-xl leading-relaxed">
              Hello there! I'm Akki, a passionate full-stack developer with over 5 years of experience crafting scalable web and mobile applications. I specialize in React, Python, and Flutter, delivering seamless user experiences with a focus on performance and design. Let's build something amazing together!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <button className="magnetic btn-liquid px-8 py-4 rounded-xl border border-white/20 font-semibold text-white flex items-center gap-3">
              Explore My Work
              <MoveRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-xs font-medium text-white/70">
                    JD
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/50 italic">Trusted by 25+ global clients</span>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Tech Stack Snapshot</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "React", icon: <Box className="w-4 h-4" /> },
                { name: "Python", icon: <Fingerprint className="w-4 h-4" /> },
                { name: "Flutter", icon: <Smartphone className="w-4 h-4" /> },
                { name: "Node.js", icon: <Layers className="w-4 h-4" /> },
                { name: "TensorFlow", icon: <Cpu className="w-4 h-4" /> },
              ].map((tech) => (
                <div key={tech.name} ref={addToPillRefs} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  <span className="text-white/70">{tech.icon}</span>
                  <span className="text-sm font-medium text-white/80">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Parallax Hero Character Card */}
        <div className="relative w-full h-[600px] flex items-center justify-center lg:justify-end perspective-[1000px]">
          
          {/* Main Character Card */}
          <div ref={cardRef} className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden glass p-2 will-change-transform">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 relative group">
              <Image 
                src="/hero-character.png" 
                alt="Akki Portfolio Character" 
                fill 
                className="object-cover object-top filter contrast-[1.1] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
              
              {/* Lower text block inside the card */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
                <div>
                  <p className="text-xs font-bold text-accent tracking-wider uppercase mb-1">Experience</p>
                  <p className="text-3xl font-bold text-white">5+ Years</p>
                </div>
                <div className="w-[1px] h-12 bg-white/20 mx-4" />
                <div className="text-right">
                  <p className="text-xs font-bold text-accent tracking-wider uppercase mb-1">Projects</p>
                  <p className="text-3xl font-bold text-white">40+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Widget 1: System Status */}
          <div ref={statusRef} className="absolute top-10 right-0 lg:-right-4 glass px-5 py-3 rounded-xl flex items-center gap-3 z-30 shadow-2xl shadow-black/50">
            <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
            <div>
              <p className="text-xs font-bold tracking-wider text-white">SYSTEM STATUS</p>
              <p className="text-[10px] text-white/50 text-right">Uptime 99.9%</p>
            </div>
          </div>

          {/* Floating Widget 2: Fast Delivery */}
          <div ref={fastDeliveryRef} className="absolute bottom-10 -left-6 lg:left-0 glass px-5 py-3 rounded-xl flex items-center gap-4 z-30 shadow-2xl shadow-black/50">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
               <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Fast Delivery</p>
              <p className="text-xs text-white/50">2-week MVP cycles</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
