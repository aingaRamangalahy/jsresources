import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-black [a&]:hover:bg-[var(--color-primary)]/90",
        secondary:
          "border-transparent bg-[var(--color-neutral-800)] text-[var(--color-neutral-300)] [a&]:hover:bg-[var(--color-neutral-700)]",
        success:
          "border-transparent bg-[var(--color-success)] text-black [a&]:hover:bg-[var(--color-success)]/90",
        info:
          "border-transparent bg-[var(--color-info)] text-black [a&]:hover:bg-[var(--color-info)]/90",
        purple:
          "border-transparent bg-[var(--color-purple)] text-black [a&]:hover:bg-[var(--color-purple)]/90",
        warning:
          "border-transparent bg-[var(--color-warning)] text-black [a&]:hover:bg-[var(--color-warning)]/90",
        danger:
          "border-transparent bg-[var(--color-danger)] text-white [a&]:hover:bg-[var(--color-danger)]/90",
        outline:
          "text-[var(--color-neutral-300)] border-[var(--color-neutral-700)] [a&]:hover:bg-[var(--color-neutral-800)] [a&]:hover:text-[var(--color-neutral-100)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
