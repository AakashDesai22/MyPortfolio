"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AtSign, Linkedin, Twitter, MessageSquare, Send } from "lucide-react";

export default function CTA() {
  const shimmerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shimmerRef.current) {
      // Shimmer/Pulse animation for the Say Hello button
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(shimmerRef.current, {
        boxShadow: "0 0 20px rgba(0, 255, 204, 0.6)",
        duration: 1.5,
        ease: "sine.inOut"
      })
      .to(shimmerRef.current, {
        boxShadow: "0 0 10px rgba(0, 255, 204, 0.2)",
        duration: 1.5,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 lg:px-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            Let's build the <br />
            <span className="text-gradient">future together</span>
          </h2>
          <p className="text-lg text-white/50 max-w-lg mx-auto">
            Available for innovative projects and collaborations. Let's turn your vision into reality with modern tech.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 w-full justify-center">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-md">
            <button className="magnetic w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <AtSign className="w-5 h-5" />
            </button>
            <button className="magnetic w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>

          <button 
            ref={shimmerRef}
            className="magnetic btn-liquid h-14 px-10 rounded-full bg-accent text-black font-extrabold flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
          >
            Say Hello
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Footer info already present in page.tsx updated in previous turn, 
            but we can add a divider here to separate CTA from bottom fixed bar */}
        <div className="w-full h-px bg-white/5 mt-20" />
      </div>
    </section>
  );
}
