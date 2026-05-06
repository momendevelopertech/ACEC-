"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

const whyIcons = {
    experience: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 8V14L18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    compliance: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 3L25 8V16C25 21 19.5 25.5 14 27C8.5 25.5 3 21 3 16V8L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 14L12.5 17.5L19 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    quality: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 3L17.2 10.5L25 11.4L19.5 16.6L21.1 24.4L14 20.4L6.9 24.4L8.5 16.6L3 11.4L10.8 10.5L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    ),
    team: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 24C5 19.6 9 16 14 16C19 16 23 19.6 23 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="22" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M22 14C24.2 14.5 26 16.5 26 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
};

const whyKeys = ["experience", "compliance", "quality", "team"] as const;
type WhyKey = typeof whyKeys[number];

export function WhySection() {
    const t = useTranslations("why");
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            className="section-padding"
            style={{
                position: "relative",
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
            }}
        >
            {/* Animated dots background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                backgroundImage:
                    "radial-gradient(rgba(var(--color-gold-rgb), 0.08) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    zIndex: 0,
                }}
            />

            <div className="container-custom" style={{ position: "relative" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="section-label"
                        style={{ marginBottom: "1rem", justifyContent: "center" }}
                    >
                        {t("title")}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "var(--color-white)",
                        }}
                    >
                        {t("subtitle")}
                    </motion.h2>
                </div>

                {/* Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {whyKeys.map((key, i) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                padding: "2rem",
                                borderRadius: "var(--radius-lg)",
                                background: "rgba(var(--color-bg-rgb), 0.6)",
                                border: "1px solid var(--color-border)",
                                transition: "border-color 0.3s, transform 0.3s",
                                textAlign: "center",
                            }}
                            className="why-card"
                        >
                            <div
                                className="why-icon"
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    background: "rgba(var(--color-gold-rgb), 0.08)",
                                    border: "1px solid rgba(var(--color-gold-rgb), 0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 1.5rem",
                                    color: "var(--color-gold)",
                                    transition: "all 0.3s",
                                }}
                            >
                                {whyIcons[key]}
                            </div>

                            <h3
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "1.25rem",
                                    fontWeight: 600,
                                    color: "var(--color-white)",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                {t(`items.${key}.title`)}
                            </h3>

                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    color: "var(--color-muted)",
                                    lineHeight: 1.7,
                                }}
                            >
                                {t(`items.${key}.description`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .why-card:hover {
          border-color: rgba(var(--color-gold-rgb), 0.25) !important;
          transform: translateY(-4px);
        }
        .why-card:hover .why-icon {
          background: rgba(var(--color-gold-rgb), 0.15) !important;
          border-color: var(--color-gold) !important;
          box-shadow: 0 0 20px rgba(201, 168, 76, 0.15);
        }
      `}</style>
        </section>
    );
}
