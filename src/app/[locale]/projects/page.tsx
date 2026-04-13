import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "المشاريع | Projects",
    description: "مشاريعنا المميزة في المملكة العربية السعودية",
};

export default function ProjectsPage() {
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
                            مشاريعنا <span className="gold-text">المميزة</span>
                        </h1>
                    </div>
                </div>
                <ProjectsSection />
            </main>
            <Footer />
        </>
    );
}
