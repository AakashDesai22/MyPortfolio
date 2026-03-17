"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ExternalLink, Github, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  links?: {
    demo?: string;
    github?: string;
  };
  gridSpan?: string;
  className?: string;
  category?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  links,
  gridSpan = "col-span-1",
  className,
  category,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseEnter = () => {
      gsap.to(card, {
        borderColor: "rgba(0, 255, 204, 0.5)",
        boxShadow: "0 0 30px rgba(0, 255, 204, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "none",
        duration: 0.4,
        ease: "power2.out",
      });
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-500 glass",
        gridSpan,
        className
      )}
      data-category={category}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <div ref={imageRef} className="w-full h-full relative will-change-transform">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-[10px] font-bold text-accent uppercase tracking-widest backdrop-blur-md">
              {category}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 z-20">
          {links?.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center magnetic hover:scale-110 transition-transform"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {links?.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center magnetic hover:scale-110 transition-transform backdrop-blur-md"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8 flex flex-col flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-500">
            {title}
          </h3>
          <div className="flex gap-2">
            <button className="text-white/40 hover:text-white transition-colors">
               <ExternalLink className="w-5 h-5" />
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
               <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-white/60 text-sm lg:text-base leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-accent/80 group-hover:border-accent/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
