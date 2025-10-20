import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Lightweight global events for cart/wishlist counts
type CartEvent = { type: "cart:add" | "cart:remove"; delta: number } | { type: "wishlist:set"; count: number };

const listeners = new Set<(e: CartEvent) => void>();

export const cartEvents = {
  on(listener: (e: CartEvent) => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  emit(event: CartEvent) {
    listeners.forEach((l) => l(event));
  },
};