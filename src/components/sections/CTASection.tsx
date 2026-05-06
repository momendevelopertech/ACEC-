"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export function CTASection() {
    const t = useTranslations("cta");
    const locale = useLocale();
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                padding: "8rem 1.5rem",
                overflow: "hidden",
                textAlign: "center",
            }}
        >
            {/* Parallax background */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: "-20%",
                    y: bgY,
                    zIndex: 0,
                }}
            >
                <Image
                    src="/images/cta-architecture.svg"
                    alt="CTA illustration"
                    fill
                    style={{ objectFit: "cover" }}
                />
                <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(var(--color-bg-rgb),0.88) 0%, rgba(var(--color-bg-rgb),0.75) 100%)",
                }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset:0,
                        background:
                            "radial-gradient(ellipse at center, var(--color-gold-dim) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "radial-gradient(ellipse at center, rgba(var(--color-gold-rgb), 0.08) 0%, transparent 70%)",
                    }}
                />
            </motion.div>

            {/* Content */}
            <div
                style={{ position: "relative", zIndex: 1 }}
                className="container-custom"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Icon */}
                    <div
                        style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "50%",
                            background: "var(--color-gold-dim)",
                            border: "1px solid var(--color-border-gold)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 2rem",
                            color: "var(--color-gold)",
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path
                                d="M16 3L28 9V16C28 22.6 22.6 28.7 16 30C9.4 28.7 4 22.6 4 16V9L16 3Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11 16L14.5 19.5L21.5 12.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            fontWeight: 700,
                            color: "var(--color-text)",
                            marginBottom: "1rem",
                            lineHeight: 1.2,
                        }}
                    >
                        {t("title")}
                    </h2>

                    <p
                        style={{
                            fontSize: "1.125rem",
                            color: "var(--color-text-muted)",
                            marginBottom: "2.5rem",
                            maxWidth: "480px",
                            margin: "0 auto 2.5rem",
                        }}
                    >
                        {t("subtitle")}
                    </p>

                    <Link
                        href={`/${locale}/contact`}
                        className="magnetic-btn magnetic-btn-primary"
                        style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}
                    >
                        {t("button")}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
