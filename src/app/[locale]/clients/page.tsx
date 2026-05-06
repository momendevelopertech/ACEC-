import { use } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "عملاؤنا | ACEC" : "Our Clients | ACEC",
    description: isAr
      ? "شركاؤنا ومكلؤنا في المملكة العربية السعودية"
      : "Our clients and partners across Saudi Arabia",
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getClientsData(locale: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/clients`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("footer");
  const clientsData = await getClientsData(locale);
  const isAr = locale === "ar";

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main style={{ paddingTop: "6rem" }}>
        {/* Hero Section */}
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
              {isAr ? "عملاؤنا" : "Our Clients"}
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
                  شركاؤنا{" "}
                  <span className="gold-text">المميزون</span>
                </>
              ) : (
                <>
                  Our Valued{" "}
                  <span className="gold-text">Clients</span>
                </>
              )}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {isAr
                ? "نفخر بشراكتنا مع أكبر وأبرز الشركات والمؤسسات في المملكة العربية السعودية"
                : "We are proud to partner with leading companies and organizations in Saudi Arabia"}
            </p>
          </div>
        </section>

        {/* Clients Grid */}
        <section style={{ padding: "4rem 1.5rem 6rem" }}>
          <div className="container-custom">
            {clientsData && clientsData.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "2rem",
                }}
              >
                {clientsData.map((client: any) => (
                  <div
                    key={client.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2rem",
                      borderRadius: "var(--radius-lg)",
                      background: "rgba(18, 18, 26, 0.6)",
                      border: "1px solid rgba(201, 168, 76, 0.1)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer",
                      minHeight: "140px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Card background effect */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(135deg, rgba(201, 168, 76, 0.1) 0%, transparent 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Client Logo/Name */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        width: "100%",
                      }}
                    >
                      {client.logo && (
                        <div
                          style={{
                            width: "100%",
                            height: "60px",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={`${API_BASE}/storage/${client.logo}`}
                            alt={isAr ? client.name_ar : client.name_en}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                              filter: "brightness(0.9) contrast(1.1)",
                              opacity: 0.8,
                              transition: "opacity 0.3s",
                            }}
                          />
                        </div>
                      )}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "var(--color-muted)",
                          transition: "color 0.3s",
                        }}
                      >
                        {isAr ? client.name_ar : client.name_en}
                      </span>
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

            {/* Bottom CTA */}
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <a
                href={`/${locale}/contact`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 2.5rem",
                  background: "linear-gradient(135deg, #c9a84c 0%, #e8c547 100%)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#1a1a1a",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(201, 168, 76, 0.3)",
                  transition: "all 0.3s",
                }}
              >
                {isAr ? "احجز استشارة" : "Book Consultation"}
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransitionWrapper>
  );
}
