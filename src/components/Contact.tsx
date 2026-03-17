"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, Github, Linkedin, Dribbble, ArrowUpRight, MessageSquare, Quote, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Akki's ability to translate complex requirements into intuitive digital experiences is unparalleled. A true master of modern UI/UX.",
    author: "Marcus Chen",
    role: "Senior Product Lead @ TechFlow",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
  {
    quote: "Fast, reliable, and incredibly creative. Every project we've collaborated on has exceeded our expectations by a mile.",
    author: "Sarah Jenkins",
    role: "Creative Director @ Vivid Studio",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  }
];

const SOCIAL_LINKS = [
  { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "#", color: "hover:text-white" },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5 text-blue-400" />, href: "#", color: "hover:text-blue-300" },
  { name: "Dribbble", icon: <Dribbble className="w-5 h-5 text-pink-400" />, href: "#", color: "hover:text-pink-300" },
];

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const testimonialRefs = useRef<HTMLDivElement[]>([]);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Testimonial 3D Rotation Reveal
      testimonialRefs.current.forEach((card, i) => {
        gsap.fromTo(card,
          { x: 100, opacity: 0, rotateY: 15, transformPerspective: 1000 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        );
      });

      // 2. Magnetic Social Cards
      socialRefs.current.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;
          const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

          if (distance < 150) {
            gsap.to(card, {
              x: distanceX * 0.2,
              y: distanceY * 0.2,
              duration: 0.4,
              ease: "power2.out",
            });
          } else {
            gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
          }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate sending
    setTimeout(() => {
      setFormState("success");
      
      // Success Morph Animation
      if (buttonRef.current && successRef.current) {
        gsap.to(buttonRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        });
        gsap.fromTo(successRef.current,
          { scaleX: 0.8, opacity: 0, y: 20 },
          { scaleX: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
        );
      }
    }, 1500);
  };

  return (
    <section ref={containerRef} id="contact" className="relative py-24 sm:py-32 px-6 lg:px-20 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Column: Contact Form */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
              <MessageSquare className="w-4 h-4" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white">
              Let's build something <span className="text-lime-400">legendary</span>.
            </h2>
            <p className="text-lg text-white/50 leading-relaxed max-w-lg">
              I'm currently available for freelance work and full-time positions. Drop a message!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                />
              </div>
            </div>

            <div className="relative h-20">
              {formState !== "success" && (
                <button 
                  ref={buttonRef}
                  disabled={formState === "sending"}
                  className={cn(
                    "w-full magnetic bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]",
                    formState === "sending" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {formState === "sending" ? (
                    <span className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              )}

              <div 
                ref={successRef}
                className={cn(
                  "absolute inset-0 bg-lime-400/10 border border-lime-400/20 rounded-2xl flex items-center gap-4 px-6 text-lime-400 opacity-0 pointer-events-none",
                  formState === "success" && "pointer-events-auto"
                )}
              >
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span className="font-bold text-sm">Message sent successfully! I'll get back to you within 24 hours.</span>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Testimonials & Footprint */}
        <div className="space-y-16">
          
          {/* Testimonials */}
          <div className="space-y-10">
            <div className="flex items-center space-x-3">
              <div className="h-px flex-1 bg-white/5" />
              <h3 className="text-xl font-bold text-white whitespace-nowrap">What people say</h3>
            </div>
            
            <div className="space-y-6">
              {TESTIMONIALS.map((t, i) => (
                <div 
                  key={i}
                  ref={(el) => { if (el) testimonialRefs.current[i] = el; }}
                  className="glass p-8 rounded-3xl border border-white/10 group transition-all duration-500 hover:border-white/20"
                >
                  <div className="relative space-y-8">
                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/5 group-hover:text-accent/10 transition-colors" />
                    <p className="text-white/60 text-lg leading-relaxed italic relative z-10">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border border-white/10" />
                      <div>
                        <h4 className="font-bold text-white">{t.author}</h4>
                        <p className="text-xs text-white/30 uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Footprint */}
          <div className="space-y-10">
            <div className="flex items-center space-x-3">
              <div className="h-px flex-1 bg-white/5" />
              <h3 className="text-xl font-bold text-white whitespace-nowrap">Digital Footprint</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SOCIAL_LINKS.filter(s => s.name !== "Dribbble").map((social, idx) => (
                <a
                  key={social.name}
                  href={social.href}
                  ref={(el) => { if (el) socialRefs.current[idx] = el; }}
                  className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 glass hover:bg-white/10 group transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                    <span className="font-bold text-white/80">{social.name}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:rotate-45 group-hover:text-white transition-all duration-300" />
                </a>
              ))}
              <a
                href="#"
                ref={(el) => { if (el) socialRefs.current[2] = el; }}
                className="col-span-1 md:col-span-2 flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 glass hover:bg-white/10 group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 group-hover:text-white transition-colors">
                    <Dribbble className="w-5 h-5 text-pink-400" />
                  </div>
                  <span className="font-bold text-white/80">Dribbble</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:rotate-45 group-hover:text-white transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Minimalist Footer Integration */}
      <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-black fill-current" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">© 2024 Akki Portfolio. Crafted with passion & code.</span>
        </div>
        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </section>
  );
}
