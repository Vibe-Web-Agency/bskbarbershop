"use client";

import React from "react";

interface FormErrorMessageProps {
    message: string;
    className?: string;
}

export default function FormErrorMessage({
    message,
    className = "",
}: FormErrorMessageProps) {
    if (!message) return null;

    return (
        <div className={`p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm ${className}`}>
            {message}
        </div>
    );
}
