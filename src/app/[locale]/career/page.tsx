import { use } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-static';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getJobs(locale: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/jobs/${locale}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الوظائف | مكتب الميثاق العربي" : "Careers | ACEC",
  };
}

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const jobs = await getJobs(locale);
  const isAr = locale === "ar";

  const typeLabels: Record<string, string> = isAr
    ? { "full-time": "دوام كامل", "part-time": "دوام جزئي", contract: "عقد", remote: "عن بعد" }
    : { "full-time": "Full-time", "part-time": "Part-time", contract: "Contract", remote: "Remote" };

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main style={{ paddingTop: "6rem" }}>
        <section
          style={{
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
          }}
        >
          <div className="container-custom">
            <div className="section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
              {isAr ? "انضم لفريقنا" : "Join Our Team"}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--color-white)",
                marginBottom: "1rem",
              }}
            >
              {isAr ? (
                <>
                  فرص{" "}
                  <span className="gold-text">وظيفية</span>
                </>
              ) : (
                <>
                  Career{" "}
                  <span className="gold-text">Opportunities</span>
                </>
              )}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-muted)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {isAr
                ? "نحن نبحث دائماً عن المواهب المتميزة للانضمام إلى فريقنا"
                : "We are always looking for exceptional talent to join our team"}
            </p>
          </div>
        </section>

        <section style={{ padding: "4rem 1.5rem 6rem" }}>
          <div className="container-custom">
            {jobs && jobs.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {jobs.map((job: any) => (
                  <div
                    key={job.id}
                    className="gradient-border"
                    style={{
                      background: "rgba(18, 18, 26, 0.6)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "var(--radius-lg)",
                      padding: "2rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "1rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.3rem",
                            fontWeight: 600,
                            color: "var(--color-white)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {job.title}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                            marginBottom: "1rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-gold)",
                              fontWeight: 600,
                            }}
                          >
                            {typeLabels[job.type] || job.type}
                          </span>
                          <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                            {job.location}
                          </span>
                        </div>
                        <p
                          style={{
                            color: "var(--color-muted)",
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {job.description}
                        </p>
                        {job.requirements && (
                          <div className="mt-4">
                            <h4 className="font-bold text-gray-700 mb-2" style={{ color: "var(--color-white)" }}>
                              {isAr ? "المتطلبات:" : "Requirements:"}
                            </h4>
                            <p
                              style={{
                                color: "var(--color-muted)",
                                fontSize: "0.85rem",
                                lineHeight: 1.6,
                              }}
                            >
                              {job.requirements}
                            </p>
                          </div>
                        )}
                      </div>
                      <a
                        href={`mailto:info@ac-ec.com.sa?subject=${encodeURIComponent(
                          job.title
                        )}`}
                        className="magnetic-btn magnetic-btn-primary"
                        style={{ fontSize: "0.85rem", padding: "0.625rem 1.5rem", whiteSpace: "nowrap" }}
                      >
                        {isAr ? "قدّم الآن" : "Apply Now"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <p style={{ fontSize: "1.2rem", color: "var(--color-muted)" }}>
                  {isAr ? "لا توجد وظائف متاحة حالياً" : "No positions available at the moment"}
                </p>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link
                href={`/${locale}`}
                style={{
                  color: "var(--color-gold)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {isAr ? "العودة للرئيسية" : "Back to Home"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ transform: isAr ? "rotate(180deg)" : "none" }}
                >
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
          </div>
        </section>
      </main>
      <Footer />
    </PageTransitionWrapper>
  );
}
