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
      const res = await fetch(`${API_BASE}/api/v1/blog/${locale}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          for (const post of json.data) {
            params.push({ locale, slug: post.slug });
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
    const res = await fetch(`${API_BASE}/api/v1/blog/${slug}/${locale}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { title: isAr ? "المقال غير موجود" : "Post Not Found" };
    const json = await res.json();
    const post = json.data;
    if (!post) return { title: isAr ? "المقال غير موجود" : "Post Not Found" };

    return {
      title: `${post.title} | ACEC`,
      description: post.excerpt,
    };
  } catch {
    return { title: isAr ? "المقال غير موجود" : "Post Not Found" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const isAr = locale === "ar";
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  let post = null;
  try {
    const res = await fetch(`${API_BASE}/api/v1/blog/${slug}/${locale}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      post = json.data;
    }
  } catch {}

  if (!post) {
    notFound();
  }

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main style={{ paddingTop: "6rem" }}>
        {/* Hero Section */}
        <section
          style={{
            padding: "4rem 1.5rem 3rem",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
            borderBottom: "1px solid var(--color-border)",
            textAlign: "center",
          }}
        >
          <div className="container-custom" style={{ maxWidth: "800px" }}>
            {post.category && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-gold)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "1rem",
                  display: "inline-block",
                }}
              >
                {post.category}
              </span>
            )}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 700,
                color: "var(--color-white)",
                marginBottom: "1rem",
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </h1>
            {post.published_at && (
              <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
                {new Date(post.published_at).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </section>

        {/* Featured Image */}
        {post.image && (
          <section style={{ padding: "3rem 1.5rem" }}>
            <div className="container-custom" style={{ maxWidth: "900px" }}>
              <div
                style={{
                  height: "400px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                }}
                className="responsive-height"
              >
                <img
                  src={`${API_BASE}/storage/${post.image}`}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Blog Content */}
        <section style={{ padding: "3rem 1.5rem 6rem" }}>
          <div className="container-custom" style={{ maxWidth: "800px" }}>
            <article
              style={{
                color: "rgba(var(--color-text-rgb), 0.8)",
                lineHeight: 1.8,
                fontSize: "1.125rem",
                textAlign: isAr ? "right" : "left",
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to blog */}
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <a
                href={`/${locale}/blog`}
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
                {isAr ? "العودة للمدونة" : "Back to Blog"}
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
        article h2, article h3, article h4 {
          color: var(--color-white);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        article p {
          margin-bottom: 1.5rem;
        }
        article ul, article ol {
          margin-bottom: 1.5rem;
          paddingInlineStart: 2rem;
        }
        article img {
          max-width: 100%;
          height: auto;
          border-radius: var(--radius-md);
          margin: 2rem 0;
        }
      `}</style>
    </PageTransitionWrapper>
  );
}
