/**
 * Josh W. Comeau Shadow Style
 *
 * Shadows inspired by the article "Designing Beautiful Shadows in CSS"
 * Source: https://www.joshwcomeau.com/css/designing-shadows/
 *
 * These use the layered approach Josh describes, with consistent
 * light source angle and smooth opacity/blur progression.
 */

/**
 * Josh Comeau-style layered shadows.
 *
 * Key principles from the article:
 * - Multiple layers for realism
 * - Consistent light angle (vertical offset ~2x horizontal)
 * - Blur increases with distance
 * - Opacity decreases with distance
 * - Color-matched shadows (using hsl with low saturation)
 */
export const joshComeauShadows = {
  name: "Josh Comeau",
  description:
    "Layered shadows from 'Designing Beautiful Shadows in CSS' article",
  url: "https://www.joshwcomeau.com/css/designing-shadows/",

  /**
   * Low elevation - subtle lift
   * Good for: cards at rest, subtle depth
   */
  low: `
    0px 0.5px 0.6px hsl(0deg 0% 0% / 0.36),
    0px 0.8px 0.9px -1.2px hsl(0deg 0% 0% / 0.36),
    0px 2px 2.3px -2.5px hsl(0deg 0% 0% / 0.36)
  `.trim(),

  /**
   * Medium elevation - noticeable lift
   * Good for: hovered cards, dropdowns
   */
  medium: `
    0px 0.6px 0.7px hsl(0deg 0% 0% / 0.34),
    0px 1.3px 1.5px -0.8px hsl(0deg 0% 0% / 0.34),
    0px 3.2px 3.6px -1.7px hsl(0deg 0% 0% / 0.34),
    0px 7.7px 8.7px -2.5px hsl(0deg 0% 0% / 0.34)
  `.trim(),

  /**
   * High elevation - significant lift
   * Good for: modals, popovers, dialogs
   */
  high: `
    0px 0.7px 0.8px hsl(0deg 0% 0% / 0.37),
    0px 1.8px 2px -0.4px hsl(0deg 0% 0% / 0.37),
    0px 3.3px 3.7px -0.7px hsl(0deg 0% 0% / 0.37),
    0px 5.4px 6.1px -1.1px hsl(0deg 0% 0% / 0.37),
    0px 8.6px 9.7px -1.4px hsl(0deg 0% 0% / 0.37),
    0px 13.5px 15.2px -1.8px hsl(0deg 0% 0% / 0.37),
    0px 20.7px 23.3px -2.1px hsl(0deg 0% 0% / 0.37),
    0px 31px 34.9px -2.5px hsl(0deg 0% 0% / 0.37)
  `.trim(),

  /** As array for easy iteration */
  levels: [
    { name: "none", boxShadow: "none" },
    {
      name: "low",
      boxShadow: `
        0px 0.5px 0.6px hsl(0deg 0% 0% / 0.36),
        0px 0.8px 0.9px -1.2px hsl(0deg 0% 0% / 0.36),
        0px 2px 2.3px -2.5px hsl(0deg 0% 0% / 0.36)
      `.trim()
    },
    {
      name: "medium",
      boxShadow: `
        0px 0.6px 0.7px hsl(0deg 0% 0% / 0.34),
        0px 1.3px 1.5px -0.8px hsl(0deg 0% 0% / 0.34),
        0px 3.2px 3.6px -1.7px hsl(0deg 0% 0% / 0.34),
        0px 7.7px 8.7px -2.5px hsl(0deg 0% 0% / 0.34)
      `.trim()
    },
    {
      name: "high",
      boxShadow: `
        0px 0.7px 0.8px hsl(0deg 0% 0% / 0.37),
        0px 1.8px 2px -0.4px hsl(0deg 0% 0% / 0.37),
        0px 3.3px 3.7px -0.7px hsl(0deg 0% 0% / 0.37),
        0px 5.4px 6.1px -1.1px hsl(0deg 0% 0% / 0.37),
        0px 8.6px 9.7px -1.4px hsl(0deg 0% 0% / 0.37),
        0px 13.5px 15.2px -1.8px hsl(0deg 0% 0% / 0.37),
        0px 20.7px 23.3px -2.1px hsl(0deg 0% 0% / 0.37),
        0px 31px 34.9px -2.5px hsl(0deg 0% 0% / 0.37)
      `.trim()
    }
  ]
} as const
