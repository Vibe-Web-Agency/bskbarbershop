"use client";

import React from "react";

interface FormDatePickerProps {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: string;
    max?: string;
    className?: string;
    disabled?: boolean;
}

export default function FormDatePicker({
    id,
    name,
    label,
    required = false,
    value,
    onChange,
    min,
    max,
    className = "",
    disabled = false,
}: FormDatePickerProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-[#D0D0D0] mb-2">
                {label} {required && "*"}
            </label>
            <input
                type="date"
                id={id}
                name={name}
                required={required}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
    );
}
