"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationType = "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-in";

interface AnimatedSectionProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number; // délai en ms
    className?: string;
    threshold?: number;
}

export default function AnimatedSection({
    children,
    animation = "fade-in",
    delay = 0,
    className = "",
    threshold = 0.1,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: "0px 0px -50px 0px" }
        );

        const current = ref.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [threshold]);

    const animationClass = isVisible ? `animate-${animation}` : "opacity-0";

    return (
        <div
            ref={ref}
            className={`${animationClass} ${className}`}
            style={{
                animationDelay: isVisible ? `${delay}ms` : "0ms",
                animationFillMode: "backwards",
            }}
        >
            {children}
        </div>
    );
}
