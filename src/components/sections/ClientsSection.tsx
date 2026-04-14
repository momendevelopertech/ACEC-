"use client";

import { useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

export function ClientsSection() {
    const locale = useLocale();
    const isArabic = locale === "ar";

    // Client logos - using relevant imagery for each client
    const clients = [
        { name: "Dr. Sulaiman Al Habib", logo: "/images/client-logo.svg" },
        { name: "Deemah", logo: "/images/client-logo.svg" },
        { name: "McDonald's", logo: "/images/client-logo.svg" },
        { name: "Pepsico", logo: "/images/client-logo.svg" },
        { name: "Leejam", logo: "/images/client-logo.svg" },
        { name: "STC", logo: "/images/client-logo.svg" },
        { name: "SRMG", logo: "/images/client-logo.svg" },
        { name: "Amlak", logo: "/images/client-logo.svg" },
        { name: "Flyadeal", logo: "/images/client-logo.svg" },
        { name: "Floward", logo: "/images/client-logo.svg" },
        { name: "Gulf Aluminum", logo: "/images/client-logo.svg" },
        { name: "SME Marketplace", logo: "/images/client-logo.svg" },
        { name: "Hataba", logo: "/images/client-logo.svg" },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section
            style={{
                padding: "6rem 1.5rem",
                background: "linear-gradient(180deg, transparent 0%, rgba(201, 168, 76, 0.02) 100%)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: "4rem" }}
                >
                    <div
                        className="section-label"
                        style={{ justifyContent: "center", marginBottom: "1rem" }}
                    >
                        {isArabic ? "عملاؤنا" : "Our Clients"}
                    </div>
                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 5vw, 3rem)",
                            fontWeight: 700,
                            color: "var(--color-white)",
                            marginBottom: "1rem",
                        }}
                    >
                        {isArabic ? (
                            <>
                                عملاؤنا{" "}
                                <span className="gold-text">بفخر</span>
                            </>
                        ) : (
                            <>
                                {" "}
                                Our <span className="gold-text">Clients</span>
                            </>
                        )}
                    </h2>
                    <p
                        style={{
                            fontSize: "1.0625rem",
                            color: "rgba(245, 245, 240, 0.6)",
                            maxWidth: "600px",
                            margin: "0 auto",
                            lineHeight: 1.6,
                        }}
                    >
                        {isArabic
                            ? "نفخر بشراكتنا مع أكبر وأبرز الشركات والمؤسسات في المملكة العربية السعودية"
                            : "We are proud to partner with leading companies and organizations in Saudi Arabia"}
                    </p>
                </motion.div>

                {/* Clients Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "2rem",
                    }}
                    className="clients-grid"
                >
                    {clients.map((client) => (
                        <motion.div
                            key={client.name}
                            variants={itemVariants}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "2rem",
                                borderRadius: "var(--radius-lg)",
                                background: "rgba(18, 18, 26, 0.6)",
                                border: "1px solid rgba(201, 168, 76, 0.1)",
                                backdropFilter: "blur(10px)",
                                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                cursor: "pointer",
                                minHeight: "140px",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            whileHover={{
                                borderColor: "rgba(201, 168, 76, 0.3)",
                                background: "rgba(18, 18, 26, 0.8)",
                                scale: 1.05,
                                y: -4,
                            }}
                            className="client-card"
                        >
                            {/* Card background effect */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(135deg, rgba(201, 168, 76, 0.1) 0%, transparent 100%)",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                    pointerEvents: "none",
                                }}
                                className="card-bg"
                            />

                            {/* Client Logo/Name */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "1rem",
                                    width: "100%",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "60px",
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        fill
                                        className="object-contain"
                                        style={{
                                            filter: "brightness(0.9) contrast(1.1)",
                                            opacity: 0.8,
                                        }}
                                    />
                                </div>
                                <span
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: 600,
                                        color: "var(--color-muted)",
                                        transition: "color 0.3s",
                                    }}
                                    className="client-name"
                                >
                                    {client.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: "center",
                        marginTop: "4rem",
                        paddingTop: "3rem",
                        borderTop: "1px solid var(--color-border)",
                    }}
                >
                    <p
                        style={{
                            fontSize: "1rem",
                            color: "rgba(245, 245, 240, 0.7)",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {isArabic
                            ? "هل تريد أن تكون من عملائنا المميزين؟"
                            : "Want to become one of our valued clients?"}
                    </p>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.875rem 2.5rem",
                            background: "linear-gradient(135deg, #c9a84c 0%, #e8c547 100%)",
                            border: "none",
                            borderRadius: "0.5rem",
                            color: "#1a1a1a",
                            fontWeight: 600,
                            fontSize: "1rem",
                            cursor: "pointer",
                            textDecoration: "none",
                            boxShadow: "0 4px 15px rgba(201, 168, 76, 0.3)",
                            transition: "all 0.3s",
                        }}
                    >
                        {isArabic ? "احجز استشارة" : "Book Consultation"}
                        <span>→</span>
                    </motion.a>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .clients-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
            gap: 1.5rem !important;
          }
          
          .client-card {
            padding: 1.5rem !important;
            min-height: 120px !important;
          }
        }

        @media (max-width: 480px) {
          .clients-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          
          .client-card {
            padding: 1rem !important;
            min-height: 100px !important;
          }
          
          .client-name {
            font-size: 0.7rem !important;
          }
        }

        .client-card:hover .card-bg {
          opacity: 1 !important;
        }

        .client-card:hover .client-name {
          color: var(--color-gold) !important;
        }
      `}</style>
        </section>
    );
}
