/**
 * Tailwind CSS Original Shadows
 *
 * The exact shadow values from Tailwind CSS v3.x
 * Source: https://tailwindcss.com/docs/box-shadow
 */

/**
 * Original Tailwind shadow values (hardcoded, not generated).
 */
export const tailwindOriginal = {
  name: "Tailwind CSS",
  description: "Original Tailwind CSS v3 shadow utilities",
  url: "https://tailwindcss.com/docs/box-shadow",

  boxShadow: {
    none: "none",
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
  },

  /** As array for easy iteration (excluding 'inner') */
  levels: [
    { name: "none", boxShadow: "none" },
    { name: "sm", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
    {
      name: "DEFAULT",
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
    },
    {
      name: "md",
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    },
    {
      name: "lg",
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
    },
    {
      name: "xl",
      boxShadow:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    },
    { name: "2xl", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }
  ]
} as const
