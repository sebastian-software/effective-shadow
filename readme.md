# Effective/Shadow

[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm]

[sponsor]: https://www.sebastian-software.de
[sponsor-img]: https://badgen.net/badge/Sponsored%20by/Sebastian%20Software/c41e54
[npm]: https://www.npmjs.com/package/@effective/shadow
[npm-downloads-img]: https://badgen.net/npm/dm/@effective/shadow
[npm-version-img]: https://badgen.net/npm/v/@effective/shadow

**Effective Shadow** is a powerful, framework-independent library designed to create rich, harmonious shadows for web interfaces. Utilizing a shadow factory based on Bézier curves, this library generates consistent shadow layers from minimal input parameters. It supports both CSS `box-shadow` and filter-based `drop-shadow`, ensuring nearly identical visual results across both techniques.

## Demo

Take a look at the shadows in our [Storybook Demo](https://effective-shadow.vercel.app/).

## Installation

Install the npm package:

```bash
npm install @effective/shadow
```

## Quick Start

<img src="images/default-shadows.png" alt="Predefined Shadows" width="522"/>

### Using Predefined Shadows

Effective Shadow provides a set of typical shadow values for quick and easy use. The index position in both arrays corresponds to the effective elevation.

#### Importing Predefined Shadows

```typescript
import { boxShadow, dropShadow } from "@effective/shadow"

// Using predefined box-shadow
const firstBoxShadow: string = boxShadow[0]
const secondBoxShadow: string = boxShadow[1]

// Using predefined drop-shadow
const firstDropShadow: string = dropShadow[0]
const secondDropShadow: string = dropShadow[1]
```

### Example Usage

You can directly use these predefined shadow values in your e.g. CSS-in-JS

```js
{
  boxShadow: boxShadow[2]
}
```

or

```js
{
  filter: dropShadow[2]
}
```

## Custom Shadows

For more control over shadow creation, you can generate custom shadows using the library's methods.

### Generating Shadows

To create a custom shadow set, use the `buildShadow` function with a partial `ShadowConfig` object:

```typescript
import {
  buildShadow,
  toBoxShadow,
  toDropShadow,
  ShadowConfig,
  ShadowSet
} from "@effective/shadow"

const config: Partial<ShadowConfig> = {
  shadowLayers: 3,
  finalOffsetX: 10,
  finalOffsetY: 10,
  offsetEasing: [0.25, 0.1, 0.25, 1.0],
  finalBlur: 20,
  blurEasing: [0.25, 0.1, 0.25, 1.0],
  finalAlpha: 0.8,
  alphaEasing: [0.25, 0.1, 0.25, 1.0],
  reverseAlpha: false
}

const shadowSet: ShadowSet = buildShadow(config)
```

### Converting to CSS Shadows

To convert the generated shadow set to a CSS `box-shadow` or `drop-shadow` string, use the respective functions:

```typescript
const boxShadowString: string = toBoxShadow(shadowSet)
const dropShadowString: string = toDropShadow(shadowSet)
```

## API Reference

### Types

#### EasingValue

An array of four numbers representing a Bézier curve:

```typescript
export type EasingValue = [number, number, number, number]
```

#### ShadowConfig

The configuration object for generating shadows:

```typescript
export interface ShadowConfig {
  shadowLayers: number
  finalOffsetX: number
  finalOffsetY: number
  offsetEasing: EasingValue
  finalBlur: number
  blurEasing: EasingValue
  finalAlpha: number
  alphaEasing: EasingValue
  reverseAlpha: boolean
}
```

#### ShadowValues

An array of four numbers representing a single shadow layer:

```typescript
export type ShadowValues = [number, number, number, number]
```

#### ShadowSet

An array of `ShadowValues`, representing multiple shadow layers:

```typescript
export type ShadowSet = ShadowValues[]
```

### Functions

#### buildShadow

Generates a set of shadow layers based on the provided configuration:

```typescript
export declare function buildShadow(config: Partial<ShadowConfig>): ShadowSet
```

#### toBoxShadow

Converts a `ShadowSet` to a CSS `box-shadow` string:

```typescript
export declare function toBoxShadow(
  shadowSet: ShadowSet,
  precision?: number
): string
```

#### toDropShadow

Converts a `ShadowSet` to a CSS `drop-shadow` string:

```typescript
export declare function toDropShadow(
  shadowSet: ShadowSet,
  precision?: number
): string
```

### Constants

#### boxShadow

An array of predefined `box-shadow` strings:

```typescript
export declare const boxShadow: string[]
```

#### dropShadow

An array of predefined `drop-shadow` strings:

```typescript
export declare const dropShadow: string[]
```

## Examples

Here are some practical examples to get you started:

```typescript
// Basic usage
const basicConfig: Partial<ShadowConfig> = {
  shadowLayers: 5,
  finalOffsetX: 15,
  finalOffsetY: 15,
  offsetEasing: [0.42, 0, 0.58, 1],
  finalBlur: 30,
  blurEasing: [0.42, 0, 0.58, 1],
  finalAlpha: 0.9,
  alphaEasing: [0.42, 0, 0.58, 1],
  reverseAlpha: true
}

const basicShadowSet = buildShadow(basicConfig)
console.log(toBoxShadow(basicShadowSet))
console.log(toDropShadow(basicShadowSet))

// Using predefined shadows
console.log(boxShadow[3])
console.log(dropShadow[3])
```

## Demo

To see our library in action and explore the possibilities it offers, check out our [Storybook demo](https://effective-color.vercel.app/).

## License

[Apache License; Version 2.0, January 2004](http://www.apache.org/licenses/LICENSE-2.0)

## Copyright

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/0d4ec9d6/sebastiansoftware-en.svg" alt="Logo of Sebastian Software GmbH, Mainz, Germany" width="460" height="160"/>

Copyright 2024<br/>[Sebastian Software GmbH](https://www.sebastian-software.de)
