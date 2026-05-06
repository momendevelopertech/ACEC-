import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhySection } from "@/components/sections/WhySection";
import type { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "عن المكتب | About",
    description: "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة — تعرف على مكتبنا وفريقنا",
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: "80px" }}>
                <div
                    style={{
                        padding: "5rem 1.5rem 2rem",
                        background:
                            "linear-gradient(180deg, rgba(201, 168, 76, 0.04) 0%, transparent 100%)",
                        borderBottom: "1px solid var(--color-border)",
                        textAlign: "center",
                    }}
                >
                    <div className="container-custom">
                        <div className="section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
                            ACEC
                        </div>
                        <h1
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                fontWeight: 700,
                                color: "var(--color-white)",
                            }}
                        >
                            عن <span className="gold-text">مكتبنا</span>
                        </h1>
                    </div>
                </div>
                <AboutSection />
                <WhySection />
            </main>
            <Footer />
        </>
    );
}
