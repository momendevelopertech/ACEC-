import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesSection } from "@/components/sections/ServicesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "الخدمات | Services",
    description: "خدماتنا الهندسية المتكاملة — استشارات، سلامة، إشراف، تصميم داخلي، وتصميم مصانع",
};

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: "80px" }}>
                {/* Page header */}
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
                            خدماتنا <span className="gold-text">الهندسية</span>
                        </h1>
                    </div>
                </div>
                <ServicesSection />
            </main>
            <Footer />
        </>
    );
}
