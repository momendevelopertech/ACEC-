import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
  const locales = ["ar", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    try {
      const res = await fetch(`${API_BASE}/api/v1/projects/${locale}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          for (const project of json.data) {
            params.push({ locale, slug: project.slug });
          }
        }
      }
    } catch {}
  }
  return params;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const isAr = locale === "ar";

  try {
    const res = await fetch(`${API_BASE}/api/v1/projects/${slug}/${locale}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { title: isAr ? "المشروع غير موجود" : "Project Not Found" };
    const json = await res.json();
    const project = json.data;
    if (!project) return { title: isAr ? "المشروع غير موجود" : "Project Not Found" };

    return {
      title: `${isAr ? project.title_ar : project.title_en} | ACEC`,
      description: isAr ? project.description_ar : project.description_en,
    };
  } catch {
    return { title: isAr ? "المشروع غير موجود" : "Project Not Found" };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const isAr = locale === "ar";
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  let project = null;
  try {
    const res = await fetch(`${API_BASE}/api/v1/projects/${slug}/${locale}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      project = json.data;
    }
  } catch {}

  if (!project) {
    notFound();
  }

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main style={{ paddingTop: "6rem" }}>
        {/* Hero Section */}
        <section
          style={{
            padding: "4rem 1.5rem",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="container-custom">
            <div className="section-label" style={{ marginBottom: "1rem", justifyContent: "center" }}>
              ACEC PROJECT
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--color-white)",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {isAr ? project.title_ar : project.title_en}
            </h1>
            {project.category && (
              <p
                style={{
                  textAlign: "center",
                  color: "var(--color-gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {project.category}
              </p>
            )}
          </div>
        </section>

        {/* Project Image */}
        {project.image && (
          <section style={{ padding: "3rem 1.5rem" }}>
            <div className="container-custom">
              <div
                style={{
                  height: "400px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  position: "relative",
                }}
                className="responsive-height"
              >
                <img
                  src={`${API_BASE}/storage/${project.image}`}
                  alt={isAr ? project.title_ar : project.title_en}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Project Details */}
        <section style={{ padding: "3rem 1.5rem 6rem" }}>
          <div className="container-custom">
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "rgba(var(--color-text-rgb), 0.8)",
                  lineHeight: 1.8,
                  textAlign: isAr ? "right" : "left",
                }}
              >
                {isAr ? project.description_ar : project.description_en}
              </p>

              {/* Project Info Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.5rem",
                  marginTop: "3rem",
                  padding: "2rem",
                  background: "rgba(var(--color-surface-rgb), 0.6)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {project.location && (
                  <div>
                    <h4 style={{ color: "var(--color-gold)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                      {isAr ? "الموقع" : "Location"}
                    </h4>
                    <p style={{ color: "var(--color-white)", margin: 0 }}>{project.location}</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <h4 style={{ color: "var(--color-gold)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                      {isAr ? "العميل" : "Client"}
                    </h4>
                    <p style={{ color: "var(--color-white)", margin: 0 }}>{project.client}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <h4 style={{ color: "var(--color-gold)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                      {isAr ? "السنة" : "Year"}
                    </h4>
                    <p style={{ color: "var(--color-white)", margin: 0 }}>{project.year}</p>
                  </div>
                )}
                {project.area && (
                  <div>
                    <h4 style={{ color: "var(--color-gold)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                      {isAr ? "المساحة" : "Area"}
                    </h4>
                    <p style={{ color: "var(--color-white)", margin: 0 }}>{project.area}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .responsive-height {
            height: 300px !important;
          }
        }
        @media (max-width: 480px) {
          .responsive-height {
            height: 250px !important;
          }
        }
      `}</style>
    </PageTransitionWrapper>
  );
}
