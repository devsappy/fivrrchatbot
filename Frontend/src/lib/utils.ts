import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function validateEmail(email: string): boolean {
    if (!email) return false;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export function validateRequired(value: string): boolean {
    return value.trim().length > 0;
}

export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}
