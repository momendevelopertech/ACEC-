import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Dashboard | لوحة التحكم",
  description: "Manage themes and site settings",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <section className="section-padding">
          <div className="container-custom">
            <div className="section-label" style={{ marginBottom: "1rem", justifyContent: "center" }}>
              ACEC DASHBOARD
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              Theme <span className="gold-text">Management</span>
            </h1>

            {/* Theme Management UI will be added here */}
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <p style={{ color: "var(--color-muted)", fontSize: "1.1rem" }}>
                Dashboard under construction
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Theme management interface coming soon...
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
