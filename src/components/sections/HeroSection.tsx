"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
    const t = useTranslations("hero");
    const locale = useLocale();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section
            ref={containerRef}
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            {/* Background Image with Parallax */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: "-10%",
                    y: imageY,
                    zIndex: 0,
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
            >
                <Image
                    src="/images/hero-architecture.svg"
                    alt="Engineering architecture illustration"
                    fill
                    priority
                    style={{ objectFit: "cover", objectPosition: "center" }}
                />
                {/* Dark overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(var(--color-bg-rgb),0.9) 0%, rgba(var(--color-bg-rgb),0.6) 50%, rgba(var(--color-bg-rgb),0.85) 100%)",
                    }}
                />
                {/* Gold accent overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(ellipse at 20% 50%, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(var(--color-gold-rgb), 0.08) 0%, transparent 50%)",
                    }}
                />
            </motion.div>

            {/* Animated grid lines */}
            <div
            style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                    "linear-gradient(rgba(var(--color-gold-rgb), 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--color-gold-rgb), 0.03) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                zIndex: 1,
            }}
            />

            {/* Content */}
            <motion.div
                style={{
                    position: "relative",
                    zIndex: 2,
                    y: textY,
                    opacity,
                    willChange: "transform",
                }}
                className="container-custom section-padding"
            >
                <div style={{ maxWidth: "800px" }}>
                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="section-label"
                        style={{ marginBottom: "2rem" }}
                    >
                        Arab Charter Engineering Consultants — ACEC
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            marginBottom: "1rem",
                            color: "var(--color-white)",
                        }}
                    >
                        {t("headline")}
                        <br />
                        <span className="gold-text">{t("headline_accent")}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: "clamp(1rem, 2vw, 1.25rem)",
                            color: "rgba(var(--color-text-rgb), 0.65)",
                            maxWidth: "540px",
                            lineHeight: 1.7,
                            marginBottom: "2.5rem",
                        }}
                    >
                        {t("sub")}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                        style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                    >
                        <Link
                            href={`/${locale}/services`}
                            className="magnetic-btn magnetic-btn-primary"
                            style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
                        >
                            {t("cta_primary")}
                            <ArrowIcon />
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="magnetic-btn magnetic-btn-secondary"
                            style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
                        >
                            {t("cta_secondary")}
                        </Link>
                    </motion.div>
                </div>

                {/* Floating stats mini */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    style={{
                        position: "absolute",
                        bottom: "3rem",
                        right: locale === "ar" ? "auto" : "3rem",
                        left: locale === "ar" ? "3rem" : "auto",
                        display: "flex",
                        gap: "2rem",
                    }}
                    className="hidden-mobile"
                >
                    {[
                        { num: "+50", label: locale === "ar" ? "مشروع" : "Projects" },
                        { num: "+15", label: locale === "ar" ? "سنة" : "Years" },
                        { num: "+30", label: locale === "ar" ? "عميل" : "Clients" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            style={{ textAlign: "center" }}
                        >
                            <div
                                className="stat-font"
                                style={{
                                    fontSize: "2rem",
                                    color: "var(--color-gold)",
                                    lineHeight: 1,
                                }}
                            >
                                {stat.num}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.7rem",
                                    color: "var(--color-muted)",
                                    marginTop: "0.25rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                <span
                    style={{
                        fontSize: "0.65rem",
                        color: "var(--color-muted)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                    }}
                >
                    {t("scroll")}
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: "1px",
                        height: "40px",
                        background:
                            "linear-gradient(180deg, var(--color-gold) 0%, transparent 100%)",
                    }}
                />
            </motion.div>

            <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
        </section>
    );
}

function ArrowIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transition: "transform 0.2s" }}
        >
            <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
