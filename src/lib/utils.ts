import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Centralized slug generator to ensure consistency across app
export function toSlug(text: string): string {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics if any (after normalization)
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
