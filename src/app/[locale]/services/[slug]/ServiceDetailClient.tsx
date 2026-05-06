"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

export type Service = {
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  features: { ar: string; en: string }[];
  deliverables: { ar: string; en: string }[];
  expertise: { ar: string; en: string }[];
  slug: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ServiceDetailClient({ service }: { service: Service }) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations();

  const title = isArabic ? service.title.ar : service.title.en;
  const subtitle = isArabic ? service.subtitle.ar : service.subtitle.en;
  const description = isArabic ? service.description.ar : service.description.en;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-content"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
          background: "linear-gradient(180deg, rgba(var(--color-gold-rgb), 0.04) 0%, transparent 100%)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="responsive-grid"
          >
            <motion.div variants={itemVariants}>
              <div
                className="section-label"
                style={{ marginBottom: "1rem" }}
              >
                ACEC SERVICE
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "var(--color-white)",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                {title.split(" ").map((word, idx) => (
                  <span key={idx}>
                    {idx === title.split(" ").length - 1 ? (
                      <span className="gold-text">{word}</span>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ))}
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "rgba(var(--color-text-rgb), 0.7)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.6,
                  maxWidth: "500px",
                }}
              >
                {subtitle}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "0.875rem 2rem",
                  background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "var(--color-bg)",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1rem",
                  boxShadow: "0 4px 15px rgba(var(--color-gold-rgb), 0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                {isArabic ? "احجز استشارة" : "Book Consultation"}
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                position: "relative",
                height: "400px",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
              className="responsive-height"
            >
              <Image
                src={service.image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(var(--color-gold-rgb), 0.2) 0%, rgba(var(--color-gold-light), 0.1) 100%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Description Section */}
      <motion.section
        variants={itemVariants}
        style={{
          padding: "4rem 1.5rem",
          background: "linear-gradient(180deg, transparent 0%, rgba(var(--color-gold-rgb), 0.02) 100%)",
        }}
      >
        <div className="container-custom">
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(var(--color-text-rgb), 0.8)",
              lineHeight: 1.8,
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: isArabic ? "right" : "left",
            }}
          >
            {description}
          </p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        variants={itemVariants}
        style={{
          padding: "4rem 1.5rem",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--color-white)",
              marginBottom: "3rem",
              textAlign: "center",
            }}
            className="section-title"
          >
            {isArabic ? "ميزات الخدمة" : "Service Features"}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="gradient-border"
                style={{
                  padding: "2rem",
                  borderRadius: "1rem",
                  background: "rgba(var(--color-gold-rgb), 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-bg)",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "var(--color-white)",
                      margin: 0,
                    }}
                  >
                    {isArabic ? feature.ar : feature.en}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Deliverables Section */}
      <motion.section
        variants={itemVariants}
        style={{
          padding: "4rem 1.5rem",
          background: "linear-gradient(180deg, rgba(var(--color-gold-rgb), 0.02) 0%, transparent 100%)",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--color-white)",
              marginBottom: "3rem",
              textAlign: "center",
            }}
            className="section-title"
          >
            {isArabic ? "المخرجات والتسليمات" : "Deliverables"}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {service.deliverables.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  background: "rgba(var(--color-gold-rgb), 0.03)",
                  border: "1px solid rgba(var(--color-gold-rgb), 0.1)",
                  alignItems: isArabic ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)",
                    color: "var(--color-bg)",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <p
                  style={{
                    color: "rgba(var(--color-text-rgb), 0.8)",
                    fontSize: "1rem",
                    margin: 0,
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {isArabic ? item.ar : item.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section
        variants={itemVariants}
        style={{
          padding: "4rem 1.5rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--color-white)",
              marginBottom: "3rem",
              textAlign: "center",
            }}
            className="section-title"
          >
            {isArabic ? "مجالات الخبرة" : "Areas of Expertise"}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {service.expertise.map((exp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                variants={itemVariants}
                className="gradient-border"
                style={{
                  padding: "2.5rem",
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, rgba(var(--color-gold-rgb), 0.1) 0%, rgba(var(--color-gold-light), 0.05) 100%)",
                  backdropFilter: "blur(10px)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--color-white)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {isArabic ? exp.ar : exp.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={itemVariants}
        style={{
          padding: "4rem 1.5rem",
          background: "linear-gradient(135deg, rgba(var(--color-gold-rgb), 0.1) 0%, rgba(var(--color-gold-light), 0.05) 100%)",
          borderTop: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <div className="container-custom" style={{ maxWidth: "600px" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--color-white)",
              marginBottom: "1rem",
            }}
          >
            {isArabic ? "هل أنت مهتم بهذه الخدمة؟" : "Interested in this service?"}
          </h2>
          <p
            style={{
              color: "rgba(var(--color-text-rgb), 0.7)",
              marginBottom: "2rem",
              fontSize: "1.125rem",
            }}
          >
            {isArabic
              ? "تواصل معنا اليوم للحصول على استشارة مجانية"
              : "Contact us today for a free consultation"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem 2.5rem",
              background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)",
              border: "none",
              borderRadius: "0.5rem",
              color: "var(--color-bg)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1.125rem",
              boxShadow: "0 6px 20px rgba(var(--color-gold-rgb), 0.4)",
              transition: "all 0.3s ease",
            }}
          >
            {isArabic ? "احجز استشارة الآن" : "Book Now"}
          </motion.button>
        </div>
      </motion.section>

      <style>{`
        .responsive-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .responsive-height {
            height: 300px !important;
          }
        }

        @media (max-width: 480px) {
          .responsive-height {
            height: 250px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
