import type { Metadata } from "next";
import "../globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
