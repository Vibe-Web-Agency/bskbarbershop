"use client";

import React from "react";

interface FormWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function FormWrapper({
    children,
    className = "",
}: FormWrapperProps) {
    return (
        <section className={`w-full py-16 bg-[#1B1C1E] ${className}`}>
            <div className="max-w-2xl mx-auto px-6">
                <div className="bg-[#232426] rounded-2xl p-8 md:p-12 shadow-2xl border border-[#333]">
                    {children}
                </div>
            </div>
        </section>
    );
}
