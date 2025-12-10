"use client";

import React from "react";

interface FormInputProps {
    id: string;
    name: string;
    label: string;
    type?: "text" | "tel" | "email" | "number" | "password";
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export default function FormInput({
    id,
    name,
    label,
    type = "text",
    required = false,
    value,
    onChange,
    placeholder,
    className = "",
    disabled = false,
}: FormInputProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-[#D0D0D0] mb-2">
                {label} {required && "*"}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={placeholder}
            />
        </div>
    );
}
