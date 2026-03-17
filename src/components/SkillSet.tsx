"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { cn } from "@/lib/utils";
import { Terminal, Server, Wrench, Palette } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const SKILLS_DATA = [
  {
    category: "Frontend",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      { name: "React", level: "ADV" },
      { name: "Next.js", level: "ADV" },
      { name: "TypeScript", level: "INT" },
      { name: "Tailwind CSS", level: "ADV" },
      { name: "Three.js", level: "INT" },
    ],
  },
  {
    category: "Backend",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Node.js", level: "ADV" },
      { name: "PostgreSQL", level: "INT" },
      { name: "GraphQL", level: "ADV" },
      { name: "Redis", level: "INT" },
    ],
  },
  {
    category: "Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Git", level: "ADV" },
      { name: "Docker", level: "INT" },
      { name: "AWS (S3/EC2)", level: "INT" },
      { name: "Jest", level: "ADV" },
    ],
  },
  {
    category: "Design",
    icon: <Palette className="w-5 h-5" />,
    skills: [
      { name: "Figma", level: "ADV" },
      { name: "Framer Motion", level: "INT" },
      { name: "UI/UX Research", level: "INT" },
    ],
  },
];

export default function SkillSet() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const gridGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Grid Glow Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (gridGlowRef.current) {
        const rect = gridGlowRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(gridGlowRef.current, {
          background: `radial-gradient(400px circle at ${x}px ${y}px, rgba(0, 255, 204, 0.08), transparent 80%)`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Staggered pop-in for cards and Digital Rain Scramble for pills
    const cards = cardRefs.current;
    
    cards.forEach((card, i) => {
      const pills = card.querySelectorAll(".skill-pill");
      const names = card.querySelectorAll(".skill-name");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.9, filter: "blur(10px)" },
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" }
      ).fromTo(
        pills,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: "back.out(1.7)" 
        },
        "-=0.6"
      );

      // Digital Rain / Scramble Effect
      names.forEach((nameEl, idx) => {
        const originalText = nameEl.textContent || "";
        tl.to(nameEl, {
          duration: 0.5,
          // @ts-ignore
          scrambleText: {
            text: originalText,
            chars: "upperCase",
            speed: 0.3,
            revealDelay: 0.1,
          },
          ease: "none",
        }, "-=0.4");
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const onCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      boxShadow: "0 0 40px rgba(0, 255, 204, 0.15)",
      borderColor: "rgba(0, 255, 204, 0.4)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "none",
      borderColor: "rgba(255, 255, 255, 0.1)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section ref={containerRef} id="skills" className="relative py-24 sm:py-32 px-6 lg:px-20 overflow-hidden">
      {/* Interactive Grid Glow Layer */}
      <div ref={gridGlowRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 w-max">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Expertise</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            Technical <span className="text-gradient">Skill Set</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A comprehensive overview of the languages, frameworks, and tools I use to build high-performance digital experiences.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS_DATA.map((cat, idx) => (
            <div
              key={cat.category}
              ref={(el) => { if (el) cardRefs.current[idx] = el; }}
              onMouseEnter={onCardMouseEnter}
              onMouseLeave={onCardMouseLeave}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 space-y-8 glass transition-all duration-500 hover:z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-pill flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors"
                  >
                    <span className="skill-name text-sm font-medium text-white/80">{skill.name}</span>
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-sm shadow-sm",
                      skill.level === "ADV" 
                        ? "bg-accent/20 text-accent border border-accent/30 animate-pulse-subtle" 
                        : "bg-white/10 text-white/40 border border-white/10"
                    )}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
