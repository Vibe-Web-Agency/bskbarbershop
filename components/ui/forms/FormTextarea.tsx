"use client";

import React from "react";

interface FormTextareaProps {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    className?: string;
    disabled?: boolean;
}

export default function FormTextarea({
    id,
    name,
    label,
    required = false,
    value,
    onChange,
    placeholder,
    rows = 3,
    className = "",
    disabled = false,
}: FormTextareaProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-[#D0D0D0] mb-2">
                {label} {required && "*"}
            </label>
            <textarea
                id={id}
                name={name}
                required={required}
                rows={rows}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={placeholder}
            />
        </div>
    );
}
