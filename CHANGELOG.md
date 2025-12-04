# Changelog

All notable changes to this project will be documented in this file.

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
