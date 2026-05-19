"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const isRTL = locale === "ar";
    const { mode, toggleMode } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
        } else {
            const top = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            if (top) {
                window.scrollTo(0, parseInt(top || "0", 10) * -1);
            }
        }
        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

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
        { href: `/${locale}/profile`, label: t("profile") },
        { href: `/${locale}/certifications`, label: t("certifications") },
        { href: `/${locale}/career`, label: t("career") },
        { href: `/${locale}/contact`, label: t("contact") },
    ];

    const allNavItems = [
        { href: `/${locale}/services`, label: t("services"), icon: "⚙️" },
        { href: `/${locale}/projects`, label: t("projects"), icon: "🏗️" },
        { href: `/${locale}/about`, label: t("about"), icon: "🏛️" },
        { href: `/${locale}/team`, label: t("team"), icon: "👥" },
        { href: `/${locale}/clients`, label: t("clients"), icon: "🤝" },
        { href: `/${locale}/blog`, label: t("blog"), icon: "📝" },
        { href: `/${locale}/certifications`, label: t("certifications"), icon: "🏅" },
        { href: `/${locale}/profile`, label: t("profile"), icon: "📄" },
        { href: `/${locale}/career`, label: t("career"), icon: "💼" },
        { href: `/${locale}/contact`, label: t("contact"), icon: "📞" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] bg-header-bg ${
                scrolled ? "py-3 px-4 backdrop-blur-2xl border-b border-border-default/25" : "py-4 px-4 backdrop-blur-none border-transparent"
            }`}
        >
            <div className="container-custom flex items-center justify-between gap-3 flex-nowrap min-h-[3.6rem] md:min-h-auto w-full">
                {/* Logo */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="lg:hidden">
                        <Logo size="sm" href={`/${locale}`} />
                    </div>
                    <div className="hidden lg:block">
                        <Logo size="md" href={`/${locale}`} />
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-2 flex-wrap relative">
                    {mainNavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-text-primary no-underline text-[0.95rem] font-semibold py-2 px-4 rounded-full transition-all duration-200 hover:text-text-primary hover:bg-accent/15 ${isRTL ? "tracking-normal" : "tracking-[0.01em]"}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {/* More dropdown for secondary links */}
                    <div className="relative hidden lg:block">
                        <button
                            onClick={() => setMoreOpen(!moreOpen)}
                            className="bg-accent/15 border border-accent/25 rounded-full text-text-primary text-[0.95rem] font-semibold py-2 px-4 cursor-pointer transition-all duration-200 hover:bg-accent/25"
                            aria-haspopup="true"
                            aria-expanded={moreOpen}
                        >
                            {t("more")}
                        </button>
                        {moreOpen && (
                            <div className={`absolute top-full ${isRTL ? "right-0" : "left-0"} bg-background border border-border-default rounded-lg p-2 mt-1 z-20 shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}>
                                {secondaryNavLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block text-text-primary no-underline py-1 px-2 text-sm hover:bg-accent/15 rounded transition-colors"
                                        onClick={() => setMoreOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Right side actions */}
                <div className="flex items-center gap-3 flex-nowrap justify-end min-w-0">
                    {/* Language switcher */}
                    <button
                        onClick={switchLocale}
                        className="bg-accent/15 border border-accent/25 rounded-full text-accent text-xs font-semibold py-[0.45rem] px-4 cursor-pointer transition-all duration-200 tracking-wider whitespace-nowrap hover:bg-accent/25"
                    >
                        {locale === "ar" ? "EN" : "عربي"}
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleMode}
                        className="bg-accent/15 border border-accent/25 rounded-full text-accent text-xs font-semibold p-2 cursor-pointer transition-all duration-200 hover:bg-accent/25 flex items-center justify-center w-[34px] h-[34px]"
                        aria-label="Toggle Dark/Light Mode"
                    >
                        {mode === "dark" ? "☀️" : "🌙"}
                    </button>

                    {/* CTA Button */}
                    <Link
                        href={`/${locale}/contact`}
                        className="magnetic-btn magnetic-btn-primary hidden lg:inline-flex text-sm py-2.5 px-6 whitespace-nowrap"
                    >
                        {t("consultation")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden bg-accent/15 border border-accent/25 rounded-full cursor-pointer flex flex-col gap-1 py-3 px-3 min-w-[3.5rem] items-center justify-center hover:bg-accent/25 transition-colors"
                        aria-label={menuOpen ? (locale === "ar" ? "إغلاق" : "Close") : (locale === "ar" ? "افتح" : "Open")}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className={`block w-[22px] h-[2px] bg-accent rounded-[2px] transition-all duration-300 ${
                                    menuOpen && i === 0 ? "translate-y-[6px] rotate-45" :
                                    menuOpen && i === 2 ? "-translate-y-[6px] -rotate-45" :
                                    menuOpen && i === 1 ? "scale-x-0" : ""
                                }`}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-[65] bg-background flex flex-col overflow-y-auto overflow-x-hidden lg:hidden">
                    <div className="flex items-center justify-between p-4 px-6 border-b border-border-default sticky top-0 bg-background z-10">
                        <span className="text-text-primary font-bold text-lg">ACEC</span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
                            className="w-10 h-10 rounded-full border border-border-default bg-surface text-text-primary flex items-center justify-center cursor-pointer text-xl flex-shrink-0 hover:bg-surface-hover transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex-1 py-2">
                        {allNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-4 py-4 px-6 border-b border-border-default text-text-primary no-underline text-lg font-medium transition-colors hover:bg-white/5"
                            >
                                <span className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                                <span className="ms-auto text-text-muted text-sm opacity-50">
                                    {isRTL ? "←" : "→"}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-border-default bg-background sticky bottom-0">
                        <Link
                            href={`/${locale}/contact`}
                            onClick={() => setMenuOpen(false)}
                            className="block w-full py-3.5 bg-accent text-text-on-accent rounded-full text-center font-semibold text-base no-underline cursor-pointer hover:bg-accent-hover transition-colors"
                        >
                            {t("consultation")}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
