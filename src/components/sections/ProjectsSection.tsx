"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export interface Project {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  category: string;
  location: string;
  client: string;
  year: string;
  area: string;
  slug: string;
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const isRTL = locale === "ar";

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    fetch(`${API_BASE}/api/v1/projects/${locale}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProjects(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

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
      className="section-padding"
      id="projects"
            style={{
                position: "relative",
                background:
                    "linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 100%)",
            }}
    >
      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
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
              {t("title")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              {t("subtitle")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: "1rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.8,
                marginBottom: "2.5rem",
              }}
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ marginTop: "2rem" }}
            >
              <Link
                href={`/${locale}/projects`}
                className="magnetic-btn magnetic-btn-primary"
              >
                {t("viewAll")}
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
            <img
              src="/images/project-architecture.svg"
              alt="ACEC projects illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(var(--color-bg-rgb),0.3) 0%, transparent 60%)",
                    }}
                />

                {/* Floating badge */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "2rem",
                        left: isRTL ? "auto" : "2rem",
                        right: isRTL ? "2rem" : "auto",
                        background: "rgba(var(--color-bg-rgb), 0.85)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid var(--color-border-gold)",
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
                +50
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  marginTop: "0.25rem",
                }}
              >
                {locale === "ar" ? "مشروع" : "Projects"}
              </div>
            </div>
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
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--color-muted)" }}>
            {isRTL ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      ) : (
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
      )}

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
        `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: string;
}) {
  const isRTL = locale === "ar";
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

   return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.5, delay: index * 0.1 }}
      whileHover={{ y:-8 }}
      style={{
        minWidth: "320px",
        width: "320px",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--color-card-bg)",
        border: "1px solid var(--color-border)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img
          src={project.image ? `${API_BASE}/storage/${project.image}` : "/images/project-architecture-1.svg"}
          alt={isRTL ? project.title_ar : project.title_en}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />
                <div
                    style={{
                        position: "absolute",
                        inset:0,
                        background:
                            "linear-gradient(180deg, transparent 50%, rgba(var(--color-bg-rgb),0.9) 100%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, transparent 50%, rgba(var(--color-bg-rgb),0.9) 100%)",
                    }}
                />

        {/* Category badge */}
        {project.category && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: isRTL ? "auto" : "1rem",
              right: isRTL ? "1rem" : "auto",
              background: "var(--color-gold-dim)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--color-border-gold)",
              borderRadius: "9999px",
              padding: "0.3rem 0.85rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--color-gold)",
              letterSpacing: "0.05em",
            }}
          >
            {project.category}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--color-text)",
            lineHeight: 1.3,
          }}
        >
          {isRTL ? project.title_ar : project.title_en}
        </h3>

        {project.location && (
          <p style={{
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem"
          }}>
            📍 {project.location}
          </p>
        )}

        {project.year && (
          <p style={{
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem"
          }}>
            📅 {project.year}
          </p>
        )}

        <Link
          href={`/${locale}/projects/${project.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--color-gold)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 600,
            transition: "gap 0.2s",
            marginTop: "1rem",
          }}
        >
          {isRTL ? "عرض التفاصيل" : "View Details"}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
