# Changelog

All notable changes to this project will be documented in this file.

## [2.0.3](/compare/v2.0.2...v2.0.3) (2025-12-05)

### Bug Fixes

- updated ci script 9eef26a

## [2.0.2](/compare/2.0.1...v2.0.2) (2025-12-05)

### Bug Fixes

- enhance Safari rendering 1d55b46
- **release:** update conventional-changelog config for v10 badf5a6
- **release:** use angular preset instead of conventionalcommits e56f724
- tweaked config 594ec36
- **vitest:** exclude dist directories from test discovery 96aec50

## 2.0.1 (2025-12-05)

### Bug Fixes

- **demo:** remove shimmer animation from colored shadow buttons e78eed7

# 2.0.0 (2025-12-05)

### Bug Fixes

- align alpha values with Tailwind and update demo comparison fd7a0db
- correct GPU acceleration info, replace Lucide JS with SVG sprites 8b162f0
- **demo:** add text-fill-color transparent for dark section h2 gradient 8d844dd
- **demo:** center comparison table 569a3ee
- **demo:** center inspiration-list + remove Brumm link (site offline) 4153e1e
- **demo:** center prose, recommendation and shadow-demo elements 9c0c6dc
- **demo:** change all SVG icons from stroke=black to stroke=currentColor 912f6a8
- **demo:** make footer link icons visible with proper color 6e9e27a
- **demo:** remove confusing API reference from colored shadows section dea2a99
- **demo:** section centering + playground preview gradient 902c1bf, closes #f8f9ff #fff5f7
- **demo:** use !important for section-dark h2 to override general section h2 styles 824f620
- **demo:** visible colored CTA shadows + ChatGPT mention 02880f1
- enhance image 2b67910
- reduce alpha for higher layer counts to balance intensity f179fef

### Features

- add CSS classes, CSS modules, and Tailwind plugin b37aa91
- colored elevation API + visual overhaul fe109b0
- **demo:** add 3-column comparison showing box-shadow vs drop-shadow parity c6aa819
- **demo:** add colored CTA glow examples, remove ShadCN 99ece45
- **demo:** add comparison table for box-shadow vs filter: drop-shadow 1cd8838
- **demo:** add hero prose, integration logos, and switch to system fonts e446814
- **demo:** add Material Design 3 and Radix UI to shadow comparison c89b344
- **demo:** add Tailwind CSS plugin demo 3e0cc1d
- **demo:** enable local file:// access with relative paths 032a475
- **demo:** improve shadow comparison with circle vs icon f9bcdd2
- **demo:** improved code blocks + 3-tab playground 5feaf6f, closes #1e2430
- **demo:** inline all assets for file:// compatibility b2d0d4a
- **demo:** major visual overhaul with animations and gradients fbcc7a3
- **demo:** new indigo/cyan color scheme + visual polish f25da93, closes #6366f1 #22d3ee #0f172a
- **demo:** prism-react-renderer + react-colorful 01e0607
- **demo:** pure blue palette + diverse section backgrounds de9ec2d, closes #2563eb #0c1222
- **demo:** redesign color picker with preset buttons and custom picker 5bd1e91
- **demo:** redesign footer with branding and polished links 0ecece1
- **demo:** simplify CTA glow + add color picker to playground 688431c
- **demo:** simplify inspired-by section, fix shadow demo, merge code blocks 03ddf8b
- **demo:** split comparison into two sections, add ShadCN 0820444
- enhance demo page with playground improvements and better presets 1da5584
- enhance shadow system with Tailwind levels, colors, and improved drop-shadow matching c310a1c
- harmonize shadow progression with numeric naming 5efd28f
- improve demo page with light theme code and parallel previews 9a7c2da
- redesign demo with prose sections and full-width code blocks 74b21c3
- replace Storybook with lightweight Vite demo page 88c0858
- restructure presets with original Tailwind and Josh Comeau values 17d8a8f

# 1.1.0 (2024-08-02)

### Bug Fixes

- improved image e65998f

### Features

- added screenshot f72f77b
- added screenshot 8842b7c

## 1.0.3 (2024-08-02)

### Bug Fixes

- fixed ts build issue a5d1a17

## 1.0.2 (2024-07-31)

### Bug Fixes

- added missing deps 56f926b
- cleanup 65ee120

### Features

- tweaked dev deps 1c8b20e

## 1.0.1 (2024-07-23)

### Bug Fixes

- fixed typo in readme 0de44c7

# 1.0.0 (2024-07-23)

### Bug Fixes

- fixed build 098cc9a
- fixed config 338078b
- minor fixes dd96df4

### Features

- added demo link 49d5117
- added missing tool for release management e8e091f
- added more meta files c04a402
- added storybook demo a625d52
- initial commit 30cce76
- tweaked config 1a74626
- tweaked meta data 98bc2e9
- updated scripts 2ec0982
- worked on readme 8749612

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- ESLint flat config with TypeScript support
- Vitest unit tests for shadow factory
- Husky pre-commit hooks with lint-staged
- Commitlint for conventional commits
- GitHub Actions CI pipeline
- GitHub Pages deployment for Storybook
- Conditional exports in package.json
- JSDoc documentation for public API
- CONTRIBUTING.md guide
- CODE_OF_CONDUCT.md
- SECURITY.md policy
- Issue and PR templates

### Changed

- Modernized README with better structure and explanations
- Updated to React 19 and Storybook 10
- Updated all dependencies to latest versions

## [1.1.0] - 2024-07-29

### Added

- Storybook demo for shadow visualization
- Drop shadow support with blur/alpha modifiers

### Changed

- Improved documentation with API reference

## [1.0.0] - 2024-07-20

### Added

- Initial release
- `buildShadow` function for generating shadow layers
- `toBoxShadow` and `toDropShadow` converters
- Predefined shadow presets (`boxShadow`, `dropShadow` arrays)
- Bézier curve-based easing for smooth shadow transitions

[Unreleased]: https://github.com/sebastian-software/effective-shadow/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/sebastian-software/effective-shadow/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/sebastian-software/effective-shadow/releases/tag/v1.0.0
