"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export interface Service {
  id: number;
  slug: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  is_featured: boolean;
}

const serviceIcons: Record<string, React.ReactNode> = {
    consulting: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 28V12L16 4L28 12V28H20V20H12V28H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 14H20M16 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    safety: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L5 8V16C5 21.5 9.5 26.7 16 28C22.5 26.7 27 21.5 27 16V8L16 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M11 16L14 19L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    supervision: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 9V16L21 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 4L4 8M24 4L28 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    interior: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="6" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 12H28" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 12V24M20 12V24" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 18H28" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    factory: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 28V18L12 12V18L20 12V18L28 12V28H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 28V22H14V28M18 28V22H24V28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M4 6H10M14 6H20M24 6H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    modon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M16 4V28M4 10L28 10M4 22L28 22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
};

function ServiceCard({
    service,
    index,
    inView,
}: {
    service: Service;
    index: number;
    inView: boolean;
}) {
    const locale = useLocale();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="service-card gradient-border"
            style={{
                position: "relative",
                background: "var(--color-card-bg)",
                backdropFilter: "blur(20px)",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                overflow: "hidden",
                willChange: "transform",
            }}
        >
            {/* Content */}
            <div style={{ position: "relative", zIndex: 2 }}>
                {/* Icon */}
                <div
                    className="service-icon"
                    style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-gold-dim)",
                        border: "1px solid var(--color-border-gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-gold)",
                        marginBottom: "1.5rem",
                        transition: "all 0.3s ease",
                    }}
                >
                    {serviceIcons[service.slug] || serviceIcons.consulting}
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "var(--color-text)",
                        marginBottom: "0.75rem",
                        transition: "color 0.3s",
                    }}
                >
                    {service.title}
                </h3>

                {/* Description */}
                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.7,
                        marginBottom: "1.5rem",
                        minHeight: "3.5rem",
                    }}
                >
                    {service.description}
                </p>

                {/* Learn more */}
                <Link
                    href={`/${locale}/services/${service.slug}`}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--color-gold)",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        transition: "gap 0.2s",
                    }}
                    className="learn-more-link"
                >
                    {locale === "ar" ? "اقرأ المزيد" : "Learn More"}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M3 8H13M13 8L9 4M13 8L9 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    const t = useTranslations("services");
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
        // Get locale from html lang attribute or default to 'ar'
        let locale = 'ar';
        if (typeof window !== "undefined") {
            locale = document.documentElement.lang || 'ar';
        }

        fetch(`${API_BASE}/api/v1/services/${locale}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setServices(data.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section
            ref={ref}
            className="section-padding"
            id="services"
            style={{ position: "relative" }}
        >
            {/* Section header */}
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "1rem" }}
                    className="section-label"
                >
                    {t("title")}
                </motion.div>

                <motion.h2
                    initial={{ opacity:0, y:20 }}
                    animate={inView ? { opacity:1, y:0 } : {}}
                    transition={{ duration:0.6, delay:0.1 }}
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        fontWeight: 700,
                        color: "var(--color-text)",
                        maxWidth: "600px",
                        lineHeight: 1.2,
                        marginBottom: "3rem",
                    }}
                >
                    {t("subtitle")}
                </motion.h2>

                {/* Services grid */}
                {loading ? (
                    <div style={{ textAlign: "center", padding: "3rem" }}>
                        <p style={{ color: "var(--color-text-muted)" }}>
                            {typeof window !== "undefined" && document.documentElement.lang === "ar" ? "جاري التحميل..." : "Loading..."}
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {services.map((service, i) => (
                            <ServiceCard key={service.id} service={service} index={i} inView={inView} />
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        .service-card:hover .card-bg-image {
          opacity: 0.25;
        }
        .service-card:hover .service-icon {
          background: var(--color-gold-dim);
          border-color: var(--color-gold);
          box-shadow: 0 0 20px var(--color-gold-dim);
        }
        .service-card:hover {
          transform: translateY(-4px) !important;
          transition: transform 0.3s ease !important;
        }
        .learn-more-link:hover {
          gap: 0.75rem !important;
          color: var(--color-gold-light) !important;
        }
      `}</style>
        </section>
    );
}
