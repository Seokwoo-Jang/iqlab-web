import Navbar from '@/components/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import ResearchSection from '@/components/sections/ResearchSection';
import MembersSection from '@/components/sections/MembersSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import PublicationsSection from '@/components/sections/PublicationsSection';
import CommunitySection from '@/components/sections/CommunitySection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ResearchSection />
        <MembersSection />
        <ProjectsSection />
        <PublicationsSection />
        <CommunitySection />
      </main>
    </>
  );
}
