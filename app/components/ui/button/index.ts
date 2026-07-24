import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-[var(--color-primary-border)] shadow-[0_3px_0_0_var(--color-primary-shadow)] hover:translate-y-[-1px] hover:shadow-[0_4px_0_0_var(--color-primary-shadow)] active:translate-y-[2px] active:shadow-[0_1px_0_0_var(--color-primary-shadow)]",
        destructive:
          "bg-destructive text-white border-2 border-destructive shadow-[0_3px_0_0_#9A3412] hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-[0_1px_0_0_#9A3412]",
        outline:
          "border-2 border-border bg-card text-foreground shadow-[0_2px_0_0_#D9D6CE] hover:bg-muted hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-[0_1px_0_0_#D9D6CE]",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-border shadow-[0_2px_0_0_#D9D6CE] hover:translate-y-[-1px] active:translate-y-[2px]",
        ghost:
          "hover:bg-muted hover:text-foreground rounded-xl",
        link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground border-2 border-accent shadow-[0_3px_0_0_#0D5C56] hover:translate-y-[-1px] hover:shadow-[0_4px_0_0_#0D5C56] active:translate-y-[2px] active:shadow-[0_1px_0_0_#0D5C56]",
      },
      size: {
        "default": "h-10 px-4 py-2 has-[>svg]:px-3",
        "sm": "h-9 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        "lg": "h-12 rounded-2xl px-6 text-base has-[>svg]:px-4",
        "icon": "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
