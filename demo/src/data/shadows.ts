// Shadow values from various design systems (for comparison)

// Tailwind CSS v4
// Source: https://tailwindcss.com/docs/box-shadow
export const TAILWIND_SHADOWS = [
  { name: "none", value: "none" },
  { name: "2xs", value: "0 1px rgb(0 0 0 / 0.05)" },
  { name: "xs", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  {
    name: "sm",
    value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
  },
  {
    name: "md",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  {
    name: "lg",
    value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  },
  {
    name: "xl",
    value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  { name: "2xl", value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }
]

// Material Design 3 (key shadow + ambient shadow combined)
// Source: https://m3.material.io/styles/elevation
// Values approximated from dp to px, combining key (26% opacity) and ambient (8% opacity) shadows
export const MATERIAL_SHADOWS = [
  { name: "0", value: "none" },
  {
    name: "1",
    value:
      "0 1px 1px 0 rgb(0 0 0 / 0.14), 0 2px 1px -1px rgb(0 0 0 / 0.12), 0 1px 3px 0 rgb(0 0 0 / 0.2)"
  },
  {
    name: "2",
    value:
      "0 2px 2px 0 rgb(0 0 0 / 0.14), 0 3px 1px -2px rgb(0 0 0 / 0.12), 0 1px 5px 0 rgb(0 0 0 / 0.2)"
  },
  {
    name: "3",
    value:
      "0 3px 4px 0 rgb(0 0 0 / 0.14), 0 3px 3px -2px rgb(0 0 0 / 0.12), 0 1px 8px 0 rgb(0 0 0 / 0.2)"
  },
  {
    name: "4",
    value:
      "0 4px 5px 0 rgb(0 0 0 / 0.14), 0 1px 10px 0 rgb(0 0 0 / 0.12), 0 2px 4px -1px rgb(0 0 0 / 0.2)"
  },
  {
    name: "6",
    value:
      "0 6px 10px 0 rgb(0 0 0 / 0.14), 0 1px 18px 0 rgb(0 0 0 / 0.12), 0 3px 5px -1px rgb(0 0 0 / 0.2)"
  },
  {
    name: "8",
    value:
      "0 8px 10px 1px rgb(0 0 0 / 0.14), 0 3px 14px 2px rgb(0 0 0 / 0.12), 0 5px 5px -3px rgb(0 0 0 / 0.2)"
  },
  {
    name: "12",
    value:
      "0 12px 17px 2px rgb(0 0 0 / 0.14), 0 5px 22px 4px rgb(0 0 0 / 0.12), 0 7px 8px -4px rgb(0 0 0 / 0.2)"
  }
]

// Radix UI Themes
// Source: https://github.com/radix-ui/themes (shadow.css)
export const RADIX_SHADOWS = [
  { name: "0", value: "none" },
  { name: "1", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  {
    name: "2",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.1)"
  },
  {
    name: "3",
    value: "0 2px 4px -1px rgb(0 0 0 / 0.06), 0 4px 5px -2px rgb(0 0 0 / 0.1)"
  },
  {
    name: "4",
    value: "0 3px 7px -2px rgb(0 0 0 / 0.08), 0 6px 12px -4px rgb(0 0 0 / 0.14)"
  },
  {
    name: "5",
    value:
      "0 8px 20px -6px rgb(0 0 0 / 0.1), 0 12px 28px -8px rgb(0 0 0 / 0.18)"
  },
  {
    name: "6",
    value:
      "0 12px 32px -8px rgb(0 0 0 / 0.12), 0 20px 48px -16px rgb(0 0 0 / 0.22)"
  },
  { name: "-", value: "none" } // Radix only has 6 levels, padding for alignment
]

// Level names for display
export const LEVEL_NAMES = ["0", "1", "2", "3", "4", "5", "6", "7"]

export const LEVEL_DESCRIPTIONS = [
  "None",
  "Subtle",
  "Low",
  "Raised",
  "Floating",
  "Overlay",
  "Modal",
  "Peak"
]
