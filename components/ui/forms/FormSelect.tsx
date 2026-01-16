"use client";

import React from "react";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface FormSelectProps {
    id: string;
    name: string;
    label: string;
    labelExtra?: React.ReactNode;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
}

export default function FormSelect({
    id,
    name,
    label,
    labelExtra,
    required = false,
    value,
    onChange,
    options,
    placeholder = "Choisir une option",
    className = "",
    disabled = false,
    loading = false,
    loadingText = "Chargement...",
}: FormSelectProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-[#D0D0D0] mb-2">
                {label} {required && "*"} {labelExtra}
            </label>
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    required={required}
                    value={value}
                    onChange={onChange}
                    disabled={disabled || loading}
                    className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="" disabled>
                        {loading ? loadingText : placeholder}
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={`${option.value}-${index}`}
                            value={option.value}
                            disabled={option.disabled}
                            className={option.disabled ? "text-gray-500" : ""}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#888]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
