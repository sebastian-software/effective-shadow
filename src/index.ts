import { buildShadow, toBoxShadow, toDropShadow } from "./factory";

export const boxShadow = [
  "none",

  toBoxShadow(
    buildShadow({
      finalOffsetY: 1,
      finalBlur: 2,
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 3,
      finalBlur: 4,
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 6,
      finalBlur: 10,
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 10,
      finalBlur: 16,
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 14,
      finalBlur: 24,
    })
  ),
];

export const dropShadow = [
  "",

  toDropShadow(
    buildShadow({
      finalOffsetY: 1,
      finalBlur: 2,
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 3,
      finalBlur: 4,
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 6,
      finalBlur: 10,
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 10,
      finalBlur: 16,
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 14,
      finalBlur: 24,
    })
  ),
];
