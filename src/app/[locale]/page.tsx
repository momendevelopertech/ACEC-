import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhySection } from "@/components/sections/WhySection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <StatsSection />
                <ServicesSection />
                <ProjectsSection />
                <AboutSection />
                <WhySection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
