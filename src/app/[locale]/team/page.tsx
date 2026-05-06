import { use } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' }
  ];
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getTeamData(locale: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/team/${locale}`, {
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
    title: isAr ? "فريقنا | مكتب الميثاق العربي" : "Our Team | ACEC",
    description: isAr
      ? "فريق من المهندسين المتخصصين ذوي الخبرة العالية"
      : "A team of highly experienced specialized engineers",
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("nav");
  const teamData = await getTeamData(locale);
  const isAr = locale === "ar";

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main style={{ paddingTop: "6rem" }}>
        {/* Hero */}
        <section
          style={{
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
          }}
        >
          <div className="container-custom">
            <div
              className="section-label"
              style={{ justifyContent: "center", marginBottom: "1rem" }}
            >
              {isAr ? "فريقنا" : "Our Team"}
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
                  فريق من{" "}
                  <span className="gold-text">المتخصصين</span>
                </>
              ) : (
                <>
                  A Team of{" "}
                  <span className="gold-text">Specialists</span>
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
                ? "فريق من المهندسين المتخصصين ذوي الخبرة العالية في مختلف التخصصات الهندسية"
                : "A team of highly experienced specialized engineers across various engineering disciplines"}
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section style={{ padding: "4rem 1.5rem 6rem" }}>
          <div className="container-custom">
            {teamData && teamData.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "2rem",
                }}
              >
                {teamData.map((member: any) => (
                  <div
                    key={member.id}
                    className="gradient-border"
                    style={{
                      background: "rgba(18, 18, 26, 0.6)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "var(--radius-lg)",
                      padding: "2rem",
                      textAlign: "center",
                      transition: "transform 0.3s, border-color 0.3s",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: "rgba(201, 168, 76, 0.1)",
                        border: "2px solid rgba(201, 168, 76, 0.3)",
                        margin: "0 auto 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        color: "var(--color-gold)",
                        overflow: "hidden",
                      }}
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <span>
                          {member.name ? member.name.charAt(0) : '?'}
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "var(--color-white)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        color: "var(--color-gold)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        marginBottom: "1rem",
                      }}
                    >
                      {member.position}
                    </p>
                    {member.bio && (
                      <p
                        style={{
                          color: "var(--color-muted)",
                          fontSize: "0.85rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {member.bio}
                      </p>
                    )}
                    <div className="flex justify-center gap-3 mt-4">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                           className="text-blue-500 hover:text-blue-700 transition-colors">
                          LinkedIn ↗
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`}
                           className="text-gray-500 hover:text-gray-700 transition-colors">
                          Email ✉
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "var(--color-muted)",
                  }}
                >
                  {isAr ? "قريباً..." : "Coming Soon..."}
                </p>
              </div>
            )}

            {/* Back link */}
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
