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
                    src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1920&q=75"
                    alt="CTA background"
                    fill
                    style={{ objectFit: "cover" }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0.75) 100%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(ellipse at center, rgba(201, 168, 76, 0.08) 0%, transparent 70%)",
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
                            background: "rgba(201, 168, 76, 0.12)",
                            border: "1px solid rgba(201, 168, 76, 0.3)",
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
                            color: "var(--color-white)",
                            marginBottom: "1rem",
                            lineHeight: 1.2,
                        }}
                    >
                        {t("title")}
                    </h2>

                    <p
                        style={{
                            fontSize: "1.125rem",
                            color: "rgba(245, 245, 240, 0.65)",
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
