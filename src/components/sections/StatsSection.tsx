"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

interface StatItem {
    value: number;
    suffix: string;
    labelKey: string;
    prefix?: string;
}

const stats: StatItem[] = [
    { value: 50, suffix: "+", labelKey: "projects", prefix: "" },
    { value: 15, suffix: "+", labelKey: "years" },
    { value: 30, suffix: "+", labelKey: "clients" },
    { value: 100, suffix: "%", labelKey: "compliance" },
];

function CountUp({
    value,
    suffix,
    prefix = "",
    inView,
}: {
    value: number;
    suffix: string;
    prefix?: string;
    inView: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1800;
        const step = 16;
        const increment = value / (duration / step);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, step);

        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span className="stat-font" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--color-gold)", lineHeight: 1 }}>
            {prefix}{count}{suffix}
        </span>
    );
}

export function StatsSection() {
    const t = useTranslations("stats");
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                padding: "5rem 1.5rem",
                overflow: "hidden",
            }}
        >
            {/* Background accent */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, transparent 0%, rgba(var(--color-gold-rgb), 0.04) 50%, transparent 100%)",
                    borderTop: "1px solid rgba(var(--color-gold-rgb), 0.08)",
                    borderBottom: "1px solid rgba(var(--color-gold-rgb), 0.08)",
                }}
            />

            <div className="container-custom" style={{ position: "relative" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "2rem",
                        textAlign: "center",
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.labelKey}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "2rem",
                                borderRadius: "var(--radius-lg)",
                                background: "rgba(var(--color-gold-rgb), 0.04)",
                                border: "1px solid rgba(var(--color-gold-rgb), 0.08)",
                                transition: "background 0.3s",
                            }}
                            className="stat-card"
                        >
                            <CountUp
                                value={stat.value}
                                suffix={stat.suffix}
                                prefix={stat.prefix}
                                inView={inView}
                            />
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--color-muted)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    fontWeight: 500,
                                }}
                            >
                                {t(stat.labelKey as "projects" | "years" | "clients" | "compliance")}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .stat-card:hover {
          background: rgba(var(--color-gold-rgb), 0.08) !important;
        }
      `}</style>
        </section>
    );
}
