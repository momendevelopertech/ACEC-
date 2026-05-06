import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { ClientsSection } from "@/components/sections/ClientsSection";
import type { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "تواصل معنا | Contact",
    description: "تواصل مع مكتب الميثاق العربي للاستشارات الهندسية — نحن هنا للإجابة على جميع استفساراتك",
};

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: "80px" }}>
                <section className="section-padding">
                    <div className="container-custom">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1.4fr",
                                gap: "5rem",
                                alignItems: "start",
                            }}
                            className="contact-grid"
                        >
                            {/* Info */}
                            <div>
                                <div className="section-label" style={{ marginBottom: "1rem" }}>
                                    ACEC
                                </div>
                                <h1
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                                        fontWeight: 700,
                                        color: "var(--color-white)",
                                        lineHeight: 1.2,
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    تواصل{" "}
                                    <span className="gold-text">معنا</span>
                                </h1>
                                <p
                                style={{
                                    color: "rgba(var(--color-text-rgb), 0.6)",
                                    lineHeight: 1.8,
                                    marginBottom: "3rem",
                                    fontSize: "1rem",
                                }}
                                >
                                    نحن هنا للإجابة على جميع استفساراتك وتقديم الاستشارات الهندسية اللازمة.
                                    لا تتردد في التواصل معنا.
                                </p>

                                {/* Contact details */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    {[
                                        {
                                            icon: "📧",
                                            title: "البريد الإلكتروني",
                                            value: "info@ac-ec.com.sa",
                                            href: "mailto:info@ac-ec.com.sa",
                                        },
                                        {
                                            icon: "🌐",
                                            title: "الموقع الإلكتروني",
                                            value: "ac-ec.com.sa",
                                            href: "https://ac-ec.com.sa",
                                        },
                                        {
                                            icon: "📍",
                                            title: "الموقع",
                                            value: "المملكة العربية السعودية",
                                            href: null,
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            style={{
                                                display: "flex",
                                                gap: "1rem",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "var(--radius-sm)",
                                                background: "rgba(var(--color-gold-rgb), 0.08)",
                                                border: "1px solid rgba(var(--color-gold-rgb), 0.15)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "1.25rem",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div
                                                    style={{
                                                        fontSize: "0.75rem",
                                                        color: "var(--color-muted)",
                                                        fontWeight: 600,
                                                        letterSpacing: "0.1em",
                                                        textTransform: "uppercase",
                                                        marginBottom: "0.25rem",
                                                    }}
                                                >
                                                    {item.title}
                                                </div>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        style={{
                                                            color: "var(--color-white)",
                                                            textDecoration: "none",
                                                            fontSize: "0.9375rem",
                                                            transition: "color 0.2s",
                                                        }}
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <span
                                                        style={{
                                                            color: "var(--color-white)",
                                                            fontSize: "0.9375rem",
                                                        }}
                                                    >
                                                        {item.value}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Form */}
                            <ContactForm />
                        </div>
                    </div>
                </section>
                <ClientsSection />
            </main>
            <Footer />

            <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
        </>
    );
}
