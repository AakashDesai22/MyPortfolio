"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore
import { Flip } from "gsap/Flip";
import ProjectCard from "./ProjectCard";
import { Cpu, Smartphone, Layers, Box, Fingerprint, Share2, BrainCircuit, Activity, Eye, Code } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, Flip);

const PROJECTS = [
  {
    id: 1,
    title: "NetraAI",
    description: "Advanced computer vision for real-time object detection and spatial awareness. Designed to assist visually impaired individuals in navigating complex urban environments.",
    tags: ["Python", "TensorFlow", "OpenCV", "Nvidia TensorRT"],
    image: "/netra-ai.png",
    category: "AI/ML",
    gridSpan: "lg:col-span-2 lg:row-span-2",
    links: { demo: "#", github: "#" }
  },
  {
    id: 2,
    title: "MediScan",
    description: "AI-powered diagnostic tool for medical imaging with high-precision analysis of MRI and CT scans. Assisting radiologists in early detection of anomalies.",
    tags: ["React Native", "PyTorch", "AWS"],
    image: "/medi-scan.png",
    category: "HealthTech",
    gridSpan: "col-span-1",
    links: { demo: "#", github: "#" }
  },
  {
    id: 3,
    title: "Gaze-Link",
    description: "Assistive technology enabling hands-free device control via eye-tracking and neural feedback loops. Enhancing accessibility for motor-impaired users.",
    tags: ["C++", "Gaze-SDK", "Electron"],
    image: "/gaze-link.png",
    category: "Accessibility",
    gridSpan: "col-span-1",
    links: { demo: "#", github: "#" }
  }
];

const CATEGORIES = ["All", "AI/ML", "HealthTech", "Accessibility", "Open Source", "Computer Vision"];

export default function ProjectGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    const cards = gsap.utils.toArray(".project-card-trigger");
    
    gsap.fromTo(cards, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Initial title reveal
    gsap.fromTo(".gallery-title-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleFilter = (category: string) => {
    const state = Flip.getState(".project-card-trigger");
    setActiveCategory(category);

    // After state update, use Flip to animate
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.05,
        absolute: true,
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.5 })
      });
    });
  };

  return (
    <section ref={containerRef} id="work" className="relative py-24 sm:py-32 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-6 max-w-2xl gallery-title-reveal">
          <div className="flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 w-max">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Portfolio 2024</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            Dynamic Project <br />
            <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A curated collection of AI and accessibility innovations. Each project represents a leap towards more inclusive and intelligent technology.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 gallery-title-reveal">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={cn(
                "magnetic px-6 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300",
                activeCategory === cat 
                  ? "bg-accent border-accent text-black shadow-[0_0_20px_rgba(0,255,204,0.3)]" 
                  : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {PROJECTS.map((project) => (
            <div key={project.id} className={cn("project-card-trigger", project.gridSpan)}>
              <ProjectCard {...project} />
            </div>
          ))}

          {/* Innovation Hub Featured Card */}
          <div className="lg:col-span-2 project-card-trigger group relative rounded-3xl border border-white/10 bg-[#0c0c0c] overflow-hidden p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8 glass">
            <div className="flex-1 space-y-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Innovation Hub</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Bridging Human Potential with AI
              </h3>
              <p className="text-white/40 text-sm lg:text-base leading-relaxed">
                Exploring the frontiers of Human-Computer Interaction through open source contribution and rapid prototyping.
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                {[
                  { icon: <BrainCircuit />, color: "text-accent" },
                  { icon: <Activity />, color: "text-teal-400" },
                  { icon: <Code />, color: "text-blue-400" },
                  { icon: <Share2 />, color: "text-emerald-400" }
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                    item.color
                  )}>
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Utility for tailwind classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
