import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge multiple class names into one.
 *
 * @param {...inputs} One or more class names to merge
 * @returns A single class name string containing all the merged class names
 *
 * @example
 * cn('text-sm', 'font-bold') // 'text-sm font-bold'
 * cn('text-sm', ['font-bold', 'text-primary']) // 'text-sm font-bold text-primary'
 */
export default function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
