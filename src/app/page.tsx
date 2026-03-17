import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import SkillSet from "@/components/SkillSet";
import DeepDive from "@/components/DeepDive";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black">
      <Navbar />
      <Hero />
      <ProjectGallery />
      <SkillSet />
      <DeepDive />
      <ExperienceTimeline />
      <CTA />
      <Contact />
    </main>
  );
}
