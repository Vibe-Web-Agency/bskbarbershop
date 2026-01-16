"use client";

import React from "react";

interface FormSubmitButtonProps {
    isSubmitting: boolean;
    submittingText?: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export default function FormSubmitButton({
    isSubmitting,
    submittingText = "Envoi en cours...",
    children,
    className = "",
    disabled = false,
}: FormSubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={isSubmitting || disabled}
            className={`w-full py-4 bg-[#C6A667] text-black font-bold rounded-lg hover:bg-[#9B8452] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
        >
            {isSubmitting ? (
                <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {submittingText}
                </>
            ) : (
                children
            )}
        </button>
    );
}
