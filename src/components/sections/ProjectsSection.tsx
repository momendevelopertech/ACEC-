"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const projects = [
    {
        id: 1,
        titleAr: "مجمع تجاري في الرياض",
        titleEn: "Commercial Complex, Riyadh",
        categoryAr: "تصميم معماري",
        categoryEn: "Architectural Design",
        image: "/images/project-architecture-1.svg",
    },
    {
        id: 2,
        titleAr: "مصنع صناعي - المنطقة الصناعية",
        titleEn: "Industrial Factory - Industrial Zone",
        categoryAr: "تصميم مصانع",
        categoryEn: "Factory Design",
        image: "/images/project-architecture-2.svg",
    },
    {
        id: 3,
        titleAr: "مشروع إشراف هندسي - جدة",
        titleEn: "Engineering Supervision - Jeddah",
        categoryAr: "إشراف هندسي",
        categoryEn: "Engineering Supervision",
        image: "/images/project-architecture-3.svg",
    },
    {
        id: 4,
        titleAr: "مبنى إداري - الدمام",
        titleEn: "Administrative Building - Dammam",
        categoryAr: "تصميم معماري",
        categoryEn: "Architectural Design",
        image: "/images/project-architecture-1.svg",
    },
    {
        id: 5,
        titleAr: "منشأة صناعية - MODON",
        titleEn: "Industrial Facility - MODON",
        categoryAr: "امتثال MODON",
        categoryEn: "MODON Compliance",
        image: "/images/project-architecture-2.svg",
    },
    {
        id: 6,
        titleAr: "تصميم داخلي فندقي",
        titleEn: "Hotel Interior Design",
        categoryAr: "تصميم داخلي",
        categoryEn: "Interior Design",
        image: "/images/project-architecture-3.svg",
    },
];

export function ProjectsSection() {
    const t = useTranslations("projects");
    const locale = useLocale();
    const ref = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const isRTL = locale === "ar";

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current.offsetLeft || 0);
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 400;
        scrollRef.current.scrollLeft += dir === "left" ? -amount : amount;
    };

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                padding: "6rem 0",
                overflow: "hidden",
            }}
            id="projects"
        >
            {/* Section header */}
            <div className="container-custom" style={{ padding: "0 1.5rem", marginBottom: "3rem" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-label"
                    style={{ marginBottom: "1rem" }}
                >
                    {t("title")}
                </motion.div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            fontWeight: 700,
                            color: "var(--color-white)",
                            maxWidth: "500px",
                            lineHeight: 1.2,
                        }}
                    >
                        {t("subtitle")}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                    >
                        {/* Scroll controls */}
                        <button
                            onClick={() => scroll("left")}
                            className="scroll-btn"
                            aria-label="Scroll left"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="scroll-btn"
                            aria-label="Scroll right"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <Link
                            href={`/${locale}/projects`}
                            className="magnetic-btn magnetic-btn-secondary"
                            style={{ fontSize: "0.875rem", padding: "0.625rem 1.25rem" }}
                        >
                            {t("viewAll")}
                        </Link>
                    </motion.div>
                </div>

                {/* Drag hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--color-muted)",
                        marginTop: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <span>←→</span> {t("drag")}
                </motion.p>
            </div>

            {/* Horizontal scroll container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                ref={scrollRef}
                className="hide-scrollbar"
                style={{
                    display: "flex",
                    gap: "1.5rem",
                    overflowX: "auto",
                    padding: "1rem 1.5rem 2rem",
                    cursor: isDragging ? "grabbing" : "grab",
                    scrollBehavior: "smooth",
                    direction: isRTL ? "rtl" : "ltr",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
            >
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                        locale={locale}
                    />
                ))}
            </motion.div>

            <style>{`
        .scroll-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(201, 168, 76, 0.08);
          border: 1px solid rgba(201, 168, 76, 0.2);
          color: var(--color-gold);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .scroll-btn:hover {
          background: rgba(201, 168, 76, 0.18);
          border-color: var(--color-gold);
        }
        @media (max-width: 768px) {
          .project-card-inner {
            width: 280px !important;
          }
        }
      `}</style>
        </section>
    );
}

function ProjectCard({
    project,
    index,
    locale,
}: {
    project: (typeof projects)[0];
    index: number;
    locale: string;
}) {
    const isRTL = locale === "ar";
    return (
        <div
            className="project-card-inner"
            style={{
                minWidth: "360px",
                width: "360px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                flexShrink: 0,
                userSelect: "none",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201, 168, 76, 0.1)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
        >
            {/* Image */}
            <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                <Image
                    src={project.image}
                    alt={isRTL ? project.titleAr : project.titleEn}
                    fill
                    style={{
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                    }}
                    className="project-img"
                    draggable={false}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, transparent 50%, rgba(10,10,15,0.8) 100%)",
                    }}
                />
                {/* Category badge */}
                <div
                    style={{
                        position: "absolute",
                        top: "1rem",
                        left: isRTL ? "auto" : "1rem",
                        right: isRTL ? "1rem" : "auto",
                        background: "rgba(201, 168, 76, 0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(201, 168, 76, 0.3)",
                        borderRadius: "9999px",
                        padding: "0.3rem 0.85rem",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: "var(--color-gold)",
                        letterSpacing: "0.05em",
                    }}
                >
                    {isRTL ? project.categoryAr : project.categoryEn}
                </div>
            </div>

            {/* Info */}
            <div style={{ padding: "1.25rem 1.5rem" }}>
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "var(--color-white)",
                        lineHeight: 1.3,
                    }}
                >
                    {isRTL ? project.titleAr : project.titleEn}
                </h3>
            </div>

            <style>{`
        .project-card-inner:hover .project-img {
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
}
