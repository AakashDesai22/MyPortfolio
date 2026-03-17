"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Users, Rocket, Download, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    type: "Education",
    title: "Foundational Studies",
    subtitle: "2020 — 2024",
    description: "Focused on algorithms, data structures, and computer architecture.",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "cyan",
  },
  {
    type: "Education",
    title: "KIT's College of Engineering",
    subtitle: "Bachelor of Engineering (CSE)",
    details: [
      "Specialized in Cloud Computing and AI.",
      "Consistent Dean's List performance."
    ],
    icon: <GraduationCap className="w-5 h-5" />,
    color: "cyan",
  },
  {
    type: "Experience",
    title: "Club byteARQ",
    subtitle: "Core Member / Developer",
    description: "Architected internal tools for member management and coordinated technical workshops for 200+ students.",
    icon: <Users className="w-5 h-5" />,
    color: "lime",
  },
  {
    type: "Experience",
    title: "Community Growth",
    subtitle: "2022 — 2023",
    description: "Building technical awareness and organizing hackathons for peers.",
    icon: <Users className="w-5 h-5" />,
    color: "lime",
  },
  {
    type: "Experience",
    title: "Lead Engineering",
    subtitle: "2023 — Present",
    description: "Overseeing production-ready systems and mentoring junior talent.",
    icon: <Rocket className="w-5 h-5" />,
    color: "lime",
  },
  {
    type: "Experience",
    title: "Team Mavericks",
    subtitle: "Technical Lead",
    description: "Leading a cross-functional team of 8 to deliver high-performance web applications using modern stacks.",
    icon: <Rocket className="w-5 h-5" />,
    color: "lime",
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGLineElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Live Path Drawing
      const pathTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      pathTl.fromTo(
        pathRef.current,
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, ease: "none" }
      );

      // 2. Beam of Light following path
      gsap.to(beamRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1,
        },
        top: "100%",
        ease: "none",
      });

      // 3. Card Animations & Node Pulses
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");

      nodes.forEach((node, i) => {
        gsap.to(node, {
          scrollTrigger: {
            trigger: node,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          scale: 1.2,
          rotation: 360,
          boxShadow: "0 0 20px rgba(0, 255, 204, 0.5)",
          borderColor: "rgba(0, 255, 204, 0.8)",
          duration: 0.6,
          ease: "back.out(1.7)",
        });
      });

      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: isLeft ? -100 : 100, opacity: 0, filter: "blur(10px)" },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "back.out(1.2)",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    setDownloaded(true);
    // Success animation logic
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section ref={containerRef} id="experience" className="relative py-24 sm:py-32 px-6 lg:px-20 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold tracking-widest text-accent uppercase">The Journey</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            Professional <span className="text-cyan-400">Experience</span> & <span className="text-lime-400">Education</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A timeline of my growth, technical leadership, and academic foundations in the world of engineering.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="relative min-h-[1000px]">
          
          {/* Central Axis Path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px]">
            <div className="h-full w-full bg-white/5" />
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
              <line
                ref={pathRef}
                x1="1" y1="0" x2="1" y2="100%"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a3e635" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Beam of Light */}
            <div 
              ref={beamRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-cyan-400 to-transparent blur-md opacity-50 z-20 pointer-events-none" 
            />
          </div>

          {/* Timeline Nodes & Cards */}
          <div className="space-y-32 relative z-10">
            {TIMELINE_DATA.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Content Side */}
                  <div className={cn(
                    "timeline-card flex flex-col",
                    isLeft ? "md:items-end text-right md:order-1" : "md:order-3"
                  )}>
                    <div className={cn(
                      "max-w-md space-y-4 p-8 rounded-3xl border glass transition-all duration-500 hover:z-20",
                      isLeft ? "md:mr-12" : "md:ml-12"
                    )}>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-white/30 uppercase tracking-widest">{item.subtitle}</span>
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        {item.type === "Education" && <p className="text-cyan-400 text-sm font-semibold">Bachelor of Engineering (CSE)</p>}
                        {item.type === "Experience" && <p className="text-lime-400 text-sm font-semibold">{item.type}</p>}
                      </div>
                      
                      {item.description && <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>}
                      
                      {item.details && (
                        <ul className="space-y-2">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-white/50 text-xs text-left">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Node Side (CSS Grid empty space) */}
                  <div className={cn("hidden md:block md:order-2")} />

                  {/* Central Node Icon */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
                    <div className={cn(
                      "timeline-node w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center text-white transition-all duration-300",
                      item.color === "cyan" ? "bg-cyan-950/20 text-cyan-400" : "bg-lime-950/20 text-lime-400"
                    )}>
                      {item.icon}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* CV Box */}
        <div className="relative rounded-[2.5rem] border border-white/5 bg-white/5 p-12 lg:p-20 overflow-hidden glass text-center space-y-10 group">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Want the full picture?</h2>
            <p className="text-white/40 leading-relaxed text-sm md:text-base">
              Grab a copy of my detailed resume to see my full technical stack, certifications, and project deep-dives.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <button 
              onClick={handleDownload}
              className={cn(
                "magnetic relative group/btn flex items-center gap-3 px-10 py-5 rounded-2xl font-bold transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.2)]",
                downloaded ? "bg-green-500 text-white" : "bg-accent text-black hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]"
              )}
            >
              {downloaded ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />}
              <span>{downloaded ? "Success!" : "Download Full CV"}</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                <span>PDF Format (1.2MB)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
