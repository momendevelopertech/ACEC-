"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export function AboutSection() {
    const t = useTranslations("about");
    const locale = useLocale();
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const isRTL = locale === "ar";

    return (
        <section
            ref={ref}
            className="section-padding"
            id="about"
            style={{
                position: "relative",
                background:
                    "linear-gradient(135deg, rgba(42, 74, 138, 0.05) 0%, transparent 100%)",
            }}
        >
            <div className="container-custom">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "5rem",
                        alignItems: "center",
                    }}
                    className="about-grid"
                >
                    {/* Text side */}
                    <div style={{ order: isRTL ? 2 : 1 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="section-label"
                            style={{ marginBottom: "1rem" }}
                        >
                            {t("subtitle")}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                                fontWeight: 700,
                                color: "var(--color-white)",
                                lineHeight: 1.2,
                                marginBottom: "1.5rem",
                            }}
                        >
                            {t("title")}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{
                                fontSize: "1rem",
                                color: "rgba(245, 245, 240, 0.65)",
                                lineHeight: 1.8,
                                marginBottom: "2.5rem",
                            }}
                        >
                            {t("description")}
                        </motion.p>

                        {/* Feature points */}
                        {[
                            locale === "ar" ? "خبرة واسعة في المشاريع الحكومية والخاصة" : "Extensive experience in government and private projects",
                            locale === "ar" ? "فريق من المهندسين المعتمدين" : "Team of certified engineers",
                            locale === "ar" ? "امتثال كامل للكود السعودي" : "Full compliance with Saudi Building Code",
                        ].map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                <div
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: "var(--color-gold)",
                                        flexShrink: 0,
                                    }}
                                />
                                <span style={{ color: "rgba(245, 245, 240, 0.75)", fontSize: "0.9375rem" }}>
                                    {point}
                                </span>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            style={{ marginTop: "2rem" }}
                        >
                            <Link
                                href={`/${locale}/about`}
                                className="magnetic-btn magnetic-btn-primary"
                            >
                                {t("learnMore")}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            order: isRTL ? 1 : 2,
                            position: "relative",
                            height: "500px",
                            borderRadius: "var(--radius-xl)",
                            overflow: "hidden",
                        }}
                        className="about-image"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800&q=80"
                            alt="ACEC Engineering Office"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(135deg, rgba(10,10,15,0.3) 0%, transparent 60%)",
                            }}
                        />

                        {/* Floating badge */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "2rem",
                                left: isRTL ? "auto" : "2rem",
                                right: isRTL ? "2rem" : "auto",
                                background: "rgba(10, 10, 15, 0.85)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(201, 168, 76, 0.25)",
                                borderRadius: "var(--radius-md)",
                                padding: "1.25rem 1.5rem",
                            }}
                        >
                            <div
                                className="stat-font"
                                style={{
                                    fontSize: "2.5rem",
                                    color: "var(--color-gold)",
                                    lineHeight: 1,
                                }}
                            >
                                +15
                            </div>
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: "var(--color-muted)",
                                    marginTop: "0.25rem",
                                }}
                            >
                                {locale === "ar" ? "سنة في الخدمة" : "Years in Service"}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-image {
            height: 300px !important;
            order: 1 !important;
          }
          .about-grid > div:first-child {
            order: 2 !important;
          }
        }
      `}</style>
        </section>
    );
}
