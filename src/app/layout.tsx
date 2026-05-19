import type { Metadata } from "next";
import { generateThemeCssVars } from "@/lib/theme-utils";
import "./globals.css";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export const metadata: Metadata = {
  title: {
    default: "ACEC — مكتب الميثاق العربي للاستشارات الهندسية",
    template: "%s | ACEC",
  },
  description:
    "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة — استشارات هندسية وهندسة سلامة متكاملة في المملكة العربية السعودية",
  keywords: [
    "استشارات هندسية",
    "هندسة السلامة",
    "تصميم معماري",
    "ACEC",
    "المملكة العربية السعودية",
    "engineering consultancy",
    "safety engineering",
    "Saudi Arabia",
  ],
  authors: [{ name: "ACEC" }],
  creator: "Arab Charter Engineering Consultants",
  metadataBase: new URL("https://ac-ec.com.sa"),
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://ac-ec.com.sa",
    siteName: "ACEC",
    title: "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة",
    description:
      "استشارات هندسية وهندسة سلامة متكاملة في المملكة العربية السعودية",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACEC — مكتب الميثاق العربي للاستشارات الهندسية",
  },
};

async function getActiveTheme() {
  try {
    const res = await fetch(`${API_BASE}/api/themes/active`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch {
    // fallback to CSS defaults
  }
  return null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getActiveTheme();
  const cssVars = theme?.colors ? generateThemeCssVars(theme.colors) : null;

  return (
    <html suppressHydrationWarning>
      <head>{cssVars ? <style id="theme-vars">{`:root { ${cssVars} }`}</style> : null}</head>
      <body className="bg-background text-text-primary" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
