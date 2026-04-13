"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function Footer() {
    const t = useTranslations("footer");
    const nav = useTranslations("nav");
    const locale = useLocale();

    const currentYear = new Date().getFullYear();

    const navLinks = [
        { href: `/${locale}/services`, label: nav("services") },
        { href: `/${locale}/projects`, label: nav("projects") },
        { href: `/${locale}/about`, label: nav("about") },
        { href: `/${locale}/contact`, label: nav("contact") },
    ];

    return (
        <footer
            style={{
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
                padding: "4rem 1.5rem 2rem",
            }}
        >
            <div className="container-custom">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        gap: "3rem",
                        marginBottom: "3rem",
                    }}
                    className="footer-grid"
                >
                    {/* Brand */}
                    <div>
                        <Link
                            href={`/${locale}`}
                            style={{ textDecoration: "none", display: "inline-block", marginBottom: "1.25rem" }}
                        >
                            <span
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    background:
                                        "linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                ACEC
                            </span>
                        </Link>
                        <p
                            style={{
                                color: "var(--color-muted)",
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                maxWidth: "300px",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {t("company")}
                        </p>
                        <p
                            style={{
                                color: "var(--color-muted)",
                                fontSize: "0.875rem",
                                lineHeight: 1.6,
                            }}
                        >
                            {t("description")}
                        </p>

                        {/* Social links placeholder */}
                        <div
                            style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}
                        >
                            {["twitter", "linkedin", "whatsapp"].map((platform) => (
                                <a
                                    key={platform}
                                    href="#"
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "50%",
                                        background: "rgba(201, 168, 76, 0.08)",
                                        border: "1px solid rgba(201, 168, 76, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--color-muted)",
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                    }}
                                    className="social-btn"
                                >
                                    {platform[0].toUpperCase()}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3
                            style={{
                                color: "var(--color-gold)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {t("quickLinks")}
                        </h3>
                        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        color: "var(--color-muted)",
                                        textDecoration: "none",
                                        fontSize: "0.9rem",
                                        transition: "color 0.2s",
                                    }}
                                    className="footer-link"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3
                            style={{
                                color: "var(--color-gold)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {t("contactInfo")}
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                            {[
                                { icon: "📧", text: "info@ac-ec.com.sa" },
                                { icon: "🌐", text: "ac-ec.com.sa" },
                                { icon: "📍", text: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia" },
                            ].map((item) => (
                                <div
                                    key={item.text}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        color: "var(--color-muted)",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        borderTop: "1px solid var(--color-border)",
                        paddingTop: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <p style={{ color: "var(--color-muted)", fontSize: "0.8125rem" }}>
                        © {currentYear} ACEC — {t("rights")}
                    </p>
                    <p style={{ color: "rgba(107, 107, 122, 0.5)", fontSize: "0.75rem" }}>
                        ac-ec.com.sa
                    </p>
                </div>
            </div>

            <style>{`
        .footer-link:hover { color: var(--color-white) !important; }
        .social-btn:hover {
          background: rgba(201, 168, 76, 0.18) !important;
          border-color: var(--color-gold) !important;
          color: var(--color-gold) !important;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
        </footer>
    );
}
