import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (value: string | number) => {
  return typeof value === "string"
    ? parseFloat(value.replace(",", "."))
    : value;
};

export const convertToReal = (value: string | number) => {
  const formatValue = formatPrice(value);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(formatValue || 0);
};

export const capitalizeFirstLetter = (name: string) => {
  if (typeof name !== "string" || name.length === 0) {
    return name;
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};
