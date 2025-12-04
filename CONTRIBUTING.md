# Contributing to Effective Shadow

Thank you for your interest in contributing to Effective Shadow! This document provides guidelines and information about contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (managed via corepack)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/effective-shadow.git
   cd effective-shadow
   ```
3. Enable corepack and install dependencies:
   ```bash
   corepack enable
   pnpm install
   ```

### Development Scripts

| Command              | Description                |
| -------------------- | -------------------------- |
| `pnpm dev`           | Start Storybook dev server |
| `pnpm test`          | Run tests                  |
| `pnpm test:watch`    | Run tests in watch mode    |
| `pnpm test:coverage` | Run tests with coverage    |
| `pnpm lint`          | Run ESLint                 |
| `pnpm lint:fix`      | Run ESLint with auto-fix   |
| `pnpm format`        | Format code with Prettier  |
| `pnpm check`         | TypeScript type check      |
| `pnpm build`         | Build the library          |

## Making Changes

### Branching

Create a feature branch from `main`:

```bash
git checkout -b feat/your-feature-name
```

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages must follow this format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat: add spread parameter to shadow config
fix: correct blur modifier calculation for drop shadows
docs: update API reference with new options
```

### Code Style

- Write TypeScript
- Use functional programming patterns
- Add JSDoc comments for public API
- Ensure all tests pass
- Follow the existing code style (enforced by ESLint and Prettier)

### Testing

- Write tests for new functionality
- Ensure existing tests pass: `pnpm test`
- Aim for good coverage on critical paths

## Pull Requests

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure CI passes
4. Request review from maintainers

### PR Title

Use the same format as commit messages:

```
feat: add spread parameter to shadow config
```

## Questions?

Feel free to open an issue for questions or discussions.

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.
