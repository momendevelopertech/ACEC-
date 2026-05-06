"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { submitContactForm } from "@/lib/contactFormService";

export function ContactForm() {
    const t = useTranslations("contact");
    const locale = useLocale();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        service_interest: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await submitContactForm({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                service_type: formData.service_interest,
                lang: locale,
            });

            if (response.success) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "", service_interest: "" });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setErrorMessage(response.error || "Failed to submit contact form");
            }
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred");
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
            }}
        >
            {/* Name + Email row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                        {t("name")}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t("name")}
                        className="form-input"
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                        {t("email")}
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t("email")}
                        className="form-input"
                    />
                </div>
            </div>

            {/* Phone */}
            <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                    {t("phone")}
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+966 5x xxx xxxx"
                    className="form-input"
                />
            </div>

            {/* Service */}
            <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                    {t("service")}
                </label>
                <select
                    name="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className="form-input"
                    style={{ cursor: "pointer" }}
                >
                    <option value="">{locale === "ar" ? "اختر الخدمة" : "Select Service"}</option>
                    <option value="consulting">{locale === "ar" ? "الاستشارات الهندسية" : "Engineering Consultancy"}</option>
                    <option value="safety">{locale === "ar" ? "هندسة السلامة" : "Safety Engineering"}</option>
                    <option value="supervision">{locale === "ar" ? "الإشراف الهندسي" : "Engineering Supervision"}</option>
                    <option value="interior">{locale === "ar" ? "التصميم الداخلي" : "Interior Design"}</option>
                    <option value="factory">{locale === "ar" ? "تصميم المصانع" : "Factory Design"}</option>
                    <option value="modon">{locale === "ar" ? "التوافق مع MODON" : "MODON Compliance"}</option>
                </select>
            </div>

            {/* Message */}
            <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                    {t("message")}
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t("message")}
                    className="form-input"
                    style={{ resize: "vertical" }}
                />
            </div>

            {/* Status messages */}
            {status === "success" && (
                <div
                    style={{
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(var(--color-gold-rgb), 0.1)",
                        border: "1px solid rgba(var(--color-gold-rgb), 0.3)",
                        color: "var(--color-gold)",
                        fontSize: "0.9rem",
                        textAlign: "center",
                    }}
                >
                    ✓ {t("success")}
                </div>
            )}
            {status === "error" && (
                <div
                    style={{
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(200, 50, 50, 0.1)",
                        border: "1px solid rgba(200, 50, 50, 0.3)",
                        color: "#f87171",
                        fontSize: "0.9rem",
                        textAlign: "center",
                    }}
                >
                    ✕ {errorMessage || t("error")}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "loading"}
                className="magnetic-btn magnetic-btn-primary"
                style={{
                    width: "100%",
                    fontSize: "1rem",
                    padding: "1rem",
                    opacity: status === "loading" ? 0.7 : 1,
                    cursor: status === "loading" ? "wait" : "pointer",
                    justifyContent: "center",
                }}
            >
                {status === "loading"
                    ? locale === "ar"
                        ? "جاري الإرسال..."
                        : "Sending..."
                    : t("submit")}
            </button>

            <style>{`
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        select option {
          background: var(--color-surface);
          color: var(--color-white);
        }
      `}</style>
        </motion.form>
    );
}
