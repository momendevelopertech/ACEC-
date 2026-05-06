import { use } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-static';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getBlogData(locale: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/blog/${locale}`, {
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
    title: isAr ? "المدونة | مكتب الميثاق العربي" : "Blog | ACEC",
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const blogData = await getBlogData(locale);
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
            <div
              className="section-label"
              style={{ justifyContent: "center", marginBottom: "1rem" }}
            >
              {isAr ? "المدونة" : "Blog"}
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
                  آخر{" "}
                  <span className="gold-text">الأخبار</span>
                </>
              ) : (
                <>
                  Latest{" "}
                  <span className="gold-text">News</span>
                </>
              )}
            </h1>
          </div>
        </section>

        <section style={{ padding: "4rem 1.5rem 6rem" }}>
          <div className="container-custom">
            {blogData && blogData.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                  gap: "2rem",
                }}
              >
                {blogData.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/blog/${post.slug}`}
                    className="gradient-border"
                    style={{
                      background: "rgba(var(--color-surface-rgb), 0.6)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      textDecoration: "none",
                      display: "block",
                      transition: "transform 0.3s",
                    }}
                  >
                    {post.image && (
                      <div
                        style={{
                          height: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div style={{ padding: "1.5rem" }}>
                      {post.category && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--color-gold)",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          color: "var(--color-white)",
                          margin: "0.5rem 0",
                        }}
                      >
                        {post.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--color-muted)",
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
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
