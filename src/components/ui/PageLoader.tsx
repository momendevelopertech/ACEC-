"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const minTime = 900;
    const maxTime = 2800;
    const startTime = Date.now();
    let timeoutId: ReturnType<typeof setTimeout>;
    let hideRequested = false;

    const finish = () => {
      if (hideRequested) return;
      hideRequested = true;
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, minTime - elapsed);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 500);
      }, delay);
    };

    const onLoad = () => finish();

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      timeoutId = setTimeout(finish, maxTime);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="acec-page-loader" className={fadeOut ? "loader-hidden" : ""}>
      <div className="loader-backdrop">
        <svg
          className="loader-grid-svg"
          viewBox="0 0 360 240"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="loaderGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="rgba(201, 168, 76, 0.14)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loaderGrid)" />
          <path d="M40 180 L80 130 L140 170 L220 90 L300 130" fill="none" stroke="rgba(201, 168, 76, 0.18)" strokeWidth="2" />
          <path className="loader-arch" d="M90 200 L90 135 L135 110 L180 135 L180 200" fill="none" stroke="rgba(201, 168, 76, 0.65)" strokeWidth="2" />
          <path className="loader-arch" d="M100 135 L165 135" fill="none" stroke="rgba(201, 168, 76, 0.65)" strokeWidth="1.5" />
          <circle cx="110" cy="60" r="24" fill="rgba(201, 168, 76, 0.08)" />
          <rect x="220" y="40" width="60" height="90" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(201, 168, 76, 0.16)" strokeWidth="1" />
        </svg>

        <div className="loader-content">
          <span className="loader-logo">ACEC</span>
          <span className="loader-tag">Arab Charter Engineering Consultants</span>
          <div className="loader-bar">
            <span />
          </div>
        </div>
      </div>

      <style>{`
        #acec-page-loader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #0a1628;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 1;
          transition: opacity 0.5s ease, visibility 0.5s ease;
          visibility: visible;
        }

        #acec-page-loader.loader-hidden {
          opacity: 0;
          visibility: hidden;
        }

        .loader-backdrop {
          position: relative;
          width: min(94vw, 560px);
          padding: 2rem 1.5rem 2.4rem;
          display: grid;
          place-items: center;
          gap: 1.4rem;
          overflow: hidden;
          animation: loaderBackdropPulse 4.5s ease-in-out infinite alternate;
        }

        .loader-grid-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.35;
          animation: loaderGridShift 12s linear infinite;
        }

        .loader-content {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 1rem;
          align-items: center;
          justify-items: center;
          text-align: center;
          animation: loaderContentIn 0.9s ease-out forwards;
          opacity: 0;
          transform: translateY(12px);
        }

        .loader-logo {
          display: block;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #ffffff;
          opacity: 0;
          transform: scale(0.82);
          animation: loaderLogoIn 0.72s ease-out 0.1s forwards;
        }

        .loader-tag {
          display: block;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.95);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(14px);
          animation: loaderTagIn 0.8s ease-out 0.22s forwards;
        }

        .loader-bar {
          position: relative;
          width: min(84vw, 380px);
          height: 0.35rem;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.08);
          box-shadow: inset 0 0 18px rgba(255,255,255,0.06);
        }

        .loader-bar span {
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: left center;
          transform: scaleX(0);
          background: linear-gradient(90deg, #c9a84c 0%, #f3d98c 50%, #c9a84c 100%);
          background-size: 220% 100%;
          animation: loaderBar 2.6s ease-out forwards, loaderBarGlow 2.6s ease-in-out 0.4s infinite alternate;
        }

        @keyframes loaderBackdropPulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.01); }
        }

        @keyframes loaderGridShift {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-18px, 12px) rotate(1deg); }
        }

        @keyframes loaderContentIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loaderLogoIn {
          0% {
            opacity: 0;
            transform: scale(0.78) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes loaderTagIn {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loaderArchDraw {
          from {
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .loader-arch {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: loaderArchDraw 1.5s ease-out forwards 0.35s;
        }

        @keyframes loaderBar {
          0% { transform: scaleX(0); }
          45% { transform: scaleX(0.42); }
          75% { transform: scaleX(0.84); }
          100% { transform: scaleX(1); }
        }

        @keyframes loaderBarGlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @media (max-width: 520px) {
          .loader-backdrop {
            width: min(96vw, 340px);
            padding: 1.5rem 1rem 2rem;
          }
          .loader-logo {
            font-size: clamp(2.2rem, 14vw, 3.4rem);
          }
          .loader-bar {
            width: 92%;
          }
        }
      `}</style>
    </div>
  );
}
