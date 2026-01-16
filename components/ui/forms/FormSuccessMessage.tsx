"use client";

import React from "react";

interface FormSuccessMessageProps {
    title: string;
    message: string;
    subMessage?: string;
    onReset?: () => void;
    resetButtonText?: string;
}

export default function FormSuccessMessage({
    title,
    message,
    subMessage,
    onReset,
    resetButtonText = "Nouvelle soumission",
}: FormSuccessMessageProps) {
    return (
        <div className="text-center py-10">
            <div className="w-16 h-16 bg-[#C6A667] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-[#A0A0A0] mb-2">{message}</p>
            {subMessage && (
                <p className="text-[#9B8452] text-sm">{subMessage}</p>
            )}
            {onReset && (
                <button
                    onClick={onReset}
                    className="mt-6 text-[#C6A667] hover:underline"
                >
                    {resetButtonText}
                </button>
            )}
        </div>
    );
}
