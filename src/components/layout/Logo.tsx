"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({ size = "md", href }: LogoProps) {
  const locale = useLocale();

  const sizeMap = {
    sm: { width: 170, height: 60 },
    md: { width: 280, height: 100 },
    lg: { width: 340, height: 120 },
  };

  const dimensions = sizeMap[size];

  const content = (
    <Image
      src="/acec-logo.svg"
      alt="ACEC Logo"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className="transition-opacity duration-200 hover:opacity-80"
      style={{
        width: "auto",
        height: dimensions.height,
        maxWidth: dimensions.width,
      }}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center text-decoration-none"
      >
        {content}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{content}</div>;
}
