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

async function getActiveProfilePdf() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/profile-pdf/active`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "ملف المكتب التعريفي | ACEC" : "Company Profile | ACEC",
    description: isAr
      ? "الملف التعريفي لمكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة"
      : "Arab Charter Engineering Consultants (ACEC) — official company profile",
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const pdf = await getActiveProfilePdf();
  const pdfUrl = pdf?.file_url || null;

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section
          style={{
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
          }}
        >
          <div className="container-custom">
            <div className="section-label justify-center mb-4">
              {isAr ? "ملف المكتب" : "Company Profile"}
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
                  ملف{" "}
                  <span className="gold-text">تعريفي</span>
                </>
              ) : (
                <>
                  Company{" "}
                  <span className="gold-text">Profile</span>
                </>
              )}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-muted)",
                maxWidth: "650px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {isAr
                ? "تعرف على مكتب الميثاق العربي للاستشارات الهندسية — رؤيتنا، رسالتنا، خدماتنا، ومشاريعنا"
                : "Discover Arab Charter Engineering Consultants (ACEC) — our vision, mission, services, and projects"}
            </p>
          </div>
        </section>

        {/* PDF Viewer */}
        <section className="pb-16 px-6 md:pb-24">
          <div className="container-custom">
            {pdfUrl ? (
              <>
                <div
                  className="gradient-border"
                  style={{
                    background: "rgba(18, 18, 26, 0.6)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    width: "100%",
                    minHeight: "70vh",
                  }}
                >
                  <iframe
                    src={`${pdfUrl}#toolbar=1&navpanes=0`}
                    title={pdf?.name || (isAr ? "الملف التعريفي للمكتب" : "Company Profile PDF")}
                    style={{
                      width: "100%",
                      height: "85vh",
                      border: "none",
                      display: "block",
                    }}
                  />
                </div>

                {/* Fallback download option */}
                <div className="text-center mt-8">
                  <p
                    style={{
                      color: "var(--color-muted)",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {isAr ? "لا يعمل العرض؟" : "Having trouble viewing?"}
                  </p>
                  <a
                    href={pdfUrl}
                    download
                    className="magnetic-btn magnetic-btn-primary"
                    style={{ textDecoration: "none", display: "inline-flex" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {isAr ? "تحميل الملف" : "Download PDF"}
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-24">
                <div
                  className="gradient-border mx-auto"
                  style={{
                    maxWidth: "500px",
                    background: "rgba(18, 18, 26, 0.6)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "var(--radius-lg)",
                    padding: "4rem 2rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1.5rem",
                      opacity: 0.5,
                    }}
                  >
                    📄
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "var(--color-white)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {isAr ? "لا يوجد ملف تعريف بعد" : "No Profile PDF Yet"}
                  </h2>
                  <p
                    style={{
                      color: "var(--color-muted)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {isAr
                      ? "سيتم إضافة الملف التعريفي للمكتب قريبًا"
                      : "The company profile PDF will be available soon"}
                  </p>
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="text-center mt-12">
              <a
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
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransitionWrapper>
  );
}
