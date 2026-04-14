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
    const isRTL = locale === "ar";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const switchLocale = () => {
        const newLocale = locale === "ar" ? "en" : "ar";
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/") || `/${newLocale}`);
    };

    const navLinks = [
        { href: `/${locale}/services`, label: t("services") },
        { href: `/${locale}/projects`, label: t("projects") },
        { href: `/${locale}/about`, label: t("about") },
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
                padding: scrolled ? "0.75rem 1.5rem" : "1.25rem 1.5rem",
                background: scrolled
                    ? "rgba(10, 10, 15, 0.9)"
                    : "transparent",
                backdropFilter: scrolled ? "blur(24px)" : "none",
                borderBottom: scrolled
                    ? "1px solid rgba(201, 168, 76, 0.1)"
                    : "none",
            }}
        >
            <div
                className="container-custom"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Logo size="md" href={`/${locale}`} />

                {/* Desktop Nav */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                    }}
                    className="hidden-mobile"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "var(--color-white)",
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
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {/* Language switcher */}
                    <button
                        onClick={switchLocale}
                        style={{
                            background: "rgba(201, 168, 76, 0.08)",
                            border: "1px solid rgba(201, 168, 76, 0.25)",
                            borderRadius: "9999px",
                            color: "var(--color-gold)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            padding: "0.4rem 0.9rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {locale === "ar" ? "EN" : "عربي"}
                    </button>

                    {/* CTA Button */}
                    <Link
                        href={`/${locale}/contact`}
                        className="magnetic-btn magnetic-btn-primary hidden-mobile"
                        style={{ fontSize: "0.875rem", padding: "0.625rem 1.5rem" }}
                    >
                        {t("consultation")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            padding: "4px",
                        }}
                        className="show-mobile"
                        aria-label="Toggle menu"
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    display: "block",
                                    width: "24px",
                                    height: "1.5px",
                                    background: "var(--color-gold)",
                                    borderRadius: "2px",
                                    transition: "all 0.3s",
                                    transform:
                                        menuOpen && i === 0
                                            ? "translateY(6.5px) rotate(45deg)"
                                            : menuOpen && i === 2
                                                ? "translateY(-6.5px) rotate(-45deg)"
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
                    background: "rgba(10, 10, 15, 0.97)",
                    backdropFilter: "blur(30px)",
                    zIndex: 1001,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                    paddingTop: "6rem",
                    transition: "opacity 0.4s, visibility 0.4s",
                    opacity: menuOpen ? 1 : 0,
                    visibility: menuOpen ? "visible" : "hidden",
                }}
            >
                {navLinks.map((link, i) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            color: "var(--color-white)",
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
          color: var(--color-white) !important;
          background: rgba(201, 168, 76, 0.08);
        }
      `}</style>
        </header>
    );
}
