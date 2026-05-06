import { use } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-static';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getCertifications(locale: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/certifications/${locale}`, {
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
    title: isAr ? "الشهادات | مكتب الميثاق العربي" : "Certifications | ACEC",
  };
}

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const certs = await getCertifications(locale);
  const isAr = locale === "ar";

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
              {isAr ? "الشهادات" : "Certifications"}
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
                  شهادات{" "}
                  <span className="gold-text">معتمدة</span>
                </>
              ) : (
                <>
                  Accredited{" "}
                  <span className="gold-text">Certifications</span>
                </>
              )}
            </h1>
          </div>
        </section>

        <section style={{ padding: "4rem 1.5rem 6rem" }}>
          <div className="container-custom">
            {certs && certs.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "2rem",
                }}
              >
                {certs.map((cert: any) => (
                  <div
                    key={cert.id}
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
                        width: "64px",
                        height: "64px",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(201, 168, 76, 0.1)",
                        border: "1px solid rgba(201, 168, 76, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.5rem",
                        fontSize: "1.5rem",
                      }}
                    >
                      {cert.image ? (
                        <img src={cert.image} alt={cert.name} style={{ width: "40px", height: "40px" }} />
                      ) : (
                        ""
                      )}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "var(--color-white)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {cert.name}
                    </h3>
                    <p
                      style={{
                        color: "var(--color-gold)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        marginBottom: "1rem",
                      }}
                    >
                      {cert.issuer}
                    </p>
                    <p
                      style={{
                        color: "var(--color-muted)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <p style={{ fontSize: "1.2rem", color: "var(--color-muted)" }}>
                  {isAr ? "قريباً..." : "Coming Soon..."}
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
