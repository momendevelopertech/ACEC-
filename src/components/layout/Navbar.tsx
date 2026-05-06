"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";

export function Navbar() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const isRTL = locale === "ar";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    const switchLocale = () => {
        const newLocale = locale === "ar" ? "en" : "ar";
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/") || `/${newLocale}`);
    };

    // High priority links - shown in main nav
    const mainNavLinks = [
        { href: `/${locale}/services`, label: t("services") },
        { href: `/${locale}/projects`, label: t("projects") },
        { href: `/${locale}/about`, label: t("about") },
        { href: `/${locale}/team`, label: t("team") },
        { href: `/${locale}/clients`, label: t("clients") },
    ];

    // Secondary links - shown in mobile menu or footer
    const secondaryNavLinks = [
        { href: `/${locale}/blog`, label: t("blog") },
        { href: `/${locale}/certifications`, label: t("certifications") },
        { href: `/${locale}/career`, label: t("career") },
        { href: `/${locale}/contact`, label: t("contact") },
    ];

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                padding: scrolled ? "0.75rem 1rem" : "1rem 1rem",
                background: scrolled
                    ? "var(--color-header-bg)"
                    : "transparent",
                backdropFilter: scrolled ? "blur(24px)" : "none",
                borderBottom: scrolled
                    ? "1px solid var(--color-border-gold)"
                    : "none",
            }}
        >
            <div
                className="container-custom"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.85rem",
                    flexWrap: "nowrap",
                    minHeight: isMobile ? "3.6rem" : "auto",
                    width: "100%",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                    <Logo size={isMobile ? "sm" : "md"} href={`/${locale}`} />
                </div>

                {/* Desktop Nav */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    }}
                    className="hidden-mobile"
                >
                    {mainNavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "var(--color-text)",
                                textDecoration: "none",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                padding: "0.5rem 1rem",
                                borderRadius: "9999px",
                                transition: "all 0.2s",
                                letterSpacing: isRTL ? "0" : "0.01em",
                            }}
                            className="nav-link"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "nowrap", justifyContent: "flex-end", minWidth: 0 }}>
                    {/* Language switcher */}
                    <button
                        onClick={switchLocale}
                        style={{
                            background: "var(--color-gold-dim)",
                            border: "1px solid var(--color-border-gold)",
                            borderRadius: "9999px",
                            color: "var(--color-gold)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            padding: "0.45rem 1rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {locale === "ar" ? "EN" : "عربي"}
                    </button>

                    {/* CTA Button */}
                    <Link
                        href={`/${locale}/contact`}
                        className="magnetic-btn magnetic-btn-primary hidden-mobile"
                        style={{ fontSize: "0.875rem", padding: "0.625rem 1.4rem" }}
                    >
                        {t("consultation")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: "var(--color-gold-dim)",
                            border: "1px solid var(--color-border-gold)",
                            borderRadius: "999px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            padding: "0.75rem 0.85rem",
                            minWidth: "3.5rem",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        className="show-mobile"
                        aria-label={menuOpen ? (locale === "ar" ? "إغلاق" : "Close") : (locale === "ar" ? "افتح" : "Open")}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    display: "block",
                                    width: "22px",
                                    height: "2px",
                                    background: "var(--color-gold)",
                                    borderRadius: "2px",
                                    transition: "all 0.3s",
                                    transform:
                                        menuOpen && i === 0
                                            ? "translateY(6px) rotate(45deg)"
                                            : menuOpen && i === 2
                                                ? "translateY(-6px) rotate(-45deg)"
                                                : menuOpen && i === 1
                                                    ? "scaleX(0)"
                                                    : "none",
                                }}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    top: 0,
                    background: "var(--color-bg)",
                    backdropFilter: "blur(30px)",
                    zIndex: 1001,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                    paddingTop: "5rem",
                    paddingInline: "1.25rem",
                    transition: "opacity 0.4s, visibility 0.4s",
                    opacity: menuOpen ? 1 : 0,
                    visibility: menuOpen ? "visible" : "hidden",
                }}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        width: "2.8rem",
                        height: "2.8rem",
                        borderRadius: "999px",
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                        cursor: "pointer",
                    }}
                    aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
                >
                    ×
                </button>
                    {[...mainNavLinks, ...secondaryNavLinks].map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                color: "var(--color-text)",
                                textDecoration: "none",
                                fontSize: "2rem",
                                fontFamily: "var(--font-heading)",
                                fontWeight: 600,
                                transition: "color 0.2s",
                                transform: menuOpen
                                    ? "translateY(0)"
                                    : "translateY(20px)",
                                transitionDelay: `${i * 0.05}s`,
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                <Link
                    href={`/${locale}/contact`}
                    onClick={() => setMenuOpen(false)}
                    className="magnetic-btn magnetic-btn-primary"
                    style={{ marginTop: "1rem" }}
                >
                    {t("consultation")}
                </Link>
            </div>

            <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        .nav-link:hover {
          color: var(--color-text) !important;
          background: var(--color-gold-dim);
        }
      `}</style>
        </header>
    );
}
