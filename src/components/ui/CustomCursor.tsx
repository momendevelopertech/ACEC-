"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const detector = () => {
            const finePointer = window.matchMedia("(pointer: fine)").matches;
            const hoverSupported = window.matchMedia("(hover: hover)").matches;
            const hasTouch = (navigator.maxTouchPoints ?? 0) > 0 || "ontouchstart" in window;
            setEnabled(finePointer && hoverSupported && !hasTouch);
        };

        detector();

        const pointerQuery = window.matchMedia("(pointer: fine)");
        const hoverQuery = window.matchMedia("(hover: hover)");

        pointerQuery.addEventListener("change", detector);
        hoverQuery.addEventListener("change", detector);

        return () => {
            pointerQuery.removeEventListener("change", detector);
            hoverQuery.removeEventListener("change", detector);
        };
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let animationFrame = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        };

        const animate = () => {
            ringX += (mouseX - ringX - 20) * 0.12;
            ringY += (mouseY - ringY - 20) * 0.12;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            animationFrame = requestAnimationFrame(animate);
        };

        const onMouseEnterInteractive = () => {
            ring.style.width = "60px";
            ring.style.height = "60px";
            ring.style.borderColor = "rgba(201, 168, 76, 0.9)";
        };

        const onMouseLeaveInteractive = () => {
            ring.style.width = "40px";
            ring.style.height = "40px";
            ring.style.borderColor = "rgba(201, 168, 76, 0.6)";
        };

        const handledElements = new Set<Element>();
        const addListeners = () => {
            document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
                if (!handledElements.has(el)) {
                    el.addEventListener("mouseenter", onMouseEnterInteractive);
                    el.addEventListener("mouseleave", onMouseLeaveInteractive);
                    handledElements.add(el);
                }
            });
        };

        const removeListeners = () => {
            handledElements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnterInteractive);
                el.removeEventListener("mouseleave", onMouseLeaveInteractive);
            });
            handledElements.clear();
        };

        document.documentElement.classList.add("custom-cursor-enabled");
        window.addEventListener("mousemove", onMouseMove);
        addListeners();
        animate();

        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            removeListeners();
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
            document.documentElement.classList.remove("custom-cursor-enabled");
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <>
            <style>{`
                .custom-cursor-enabled {
                    cursor: none !important;
                }
                .custom-cursor-enabled * {
                    cursor: none !important;
                }
                .custom-cursor-enabled button,
                .custom-cursor-enabled a,
                .custom-cursor-enabled input,
                .custom-cursor-enabled textarea,
                .custom-cursor-enabled select {
                    cursor: none !important;
                }
            `}</style>
            <div ref={dotRef} className="cursor-dot" style={{ display: "block" }} />
            <div ref={ringRef} className="cursor-ring" style={{ display: "block" }} />
        </>
    );
}
