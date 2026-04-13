"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only on desktop
        if (window.matchMedia("(hover: none)").matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        };

        const animate = () => {
            ringX += (mouseX - ringX - 20) * 0.12;
            ringY += (mouseY - ringY - 20) * 0.12;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            requestAnimationFrame(animate);
        };

        const onMouseEnterInteractive = () => {
            if (ring) {
                ring.style.width = "60px";
                ring.style.height = "60px";
                ring.style.borderColor = "rgba(201, 168, 76, 0.9)";
            }
        };

        const onMouseLeaveInteractive = () => {
            if (ring) {
                ring.style.width = "40px";
                ring.style.height = "40px";
                ring.style.borderColor = "rgba(201, 168, 76, 0.6)";
            }
        };

        const addListeners = () => {
            const interactives = document.querySelectorAll(
                "a, button, [data-magnetic]"
            );
            interactives.forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnterInteractive);
                el.addEventListener("mouseleave", onMouseLeaveInteractive);
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        animate();
        addListeners();

        // Re-add listeners on DOM mutation (for dynamically added elements)
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" style={{ display: "block" }} />
            <div ref={ringRef} className="cursor-ring" style={{ display: "block" }} />
        </>
    );
}
