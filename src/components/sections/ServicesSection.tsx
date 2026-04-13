"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const serviceIcons = {
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

const serviceKeys = ["consulting", "safety", "supervision", "interior", "factory", "modon"] as const;
type ServiceKey = typeof serviceKeys[number];

const serviceImages: Record<ServiceKey, string> = {
    consulting: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=70",
    safety: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
    supervision: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70",
    interior: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
    factory: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=70",
    modon: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=70",
};

function ServiceCard({
    serviceKey,
    index,
    inView,
}: {
    serviceKey: ServiceKey;
    index: number;
    inView: boolean;
}) {
    const t = useTranslations("services");
    const locale = useLocale();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="service-card gradient-border"
            style={{
                position: "relative",
                background: "rgba(18, 18, 26, 0.5)",
                backdropFilter: "blur(20px)",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                overflow: "hidden",
                willChange: "transform",
            }}
        >
            {/* Background image on hover */}
            <div
                className="card-bg-image"
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${serviceImages[serviceKey]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    zIndex: 0,
                }}
            />
            <div
                className="card-bg-overlay"
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.85) 100%)",
                    zIndex: 1,
                    transition: "background 0.5s ease",
                }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2 }}>
                {/* Icon */}
                <div
                    className="service-icon"
                    style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(201, 168, 76, 0.08)",
                        border: "1px solid rgba(201, 168, 76, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-gold)",
                        marginBottom: "1.5rem",
                        transition: "all 0.3s ease",
                    }}
                >
                    {serviceIcons[serviceKey]}
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "var(--color-white)",
                        marginBottom: "0.75rem",
                        transition: "color 0.3s",
                    }}
                >
                    {t(`items.${serviceKey}.title`)}
                </h3>

                {/* Description */}
                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--color-muted)",
                        lineHeight: 1.7,
                        marginBottom: "1.5rem",
                        minHeight: "3.5rem",
                    }}
                >
                    {t(`items.${serviceKey}.description`)}
                </p>

                {/* Learn more */}
                <Link
                    href={`/${locale}/services/${serviceKey}`}
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
                    {t("learnMore")}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        fontWeight: 700,
                        color: "var(--color-white)",
                        maxWidth: "600px",
                        lineHeight: 1.2,
                        marginBottom: "3rem",
                    }}
                >
                    {t("subtitle")}
                </motion.h2>

                {/* Services grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {serviceKeys.map((key, i) => (
                        <ServiceCard key={key} serviceKey={key} index={i} inView={inView} />
                    ))}
                </div>
            </div>

            <style>{`
        .service-card:hover .card-bg-image {
          opacity: 0.25;
        }
        .service-card:hover .service-icon {
          background: rgba(201, 168, 76, 0.18);
          border-color: var(--color-gold);
          box-shadow: 0 0 20px rgba(201, 168, 76, 0.2);
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
