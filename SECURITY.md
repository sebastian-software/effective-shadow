# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please report it by emailing **s.werner@sebastian-software.de**.

Please do **not** create a public GitHub issue for security vulnerabilities.

### What to include

- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (optional)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Depends on complexity, but we aim to address critical issues promptly

### Disclosure Policy

- We will acknowledge receipt of your report
- We will investigate and validate the issue
- We will work on a fix and coordinate disclosure timing with you
- We will credit you in the release notes (unless you prefer to remain anonymous)

## Security Best Practices

This library generates CSS shadow values and does not:

- Execute user-provided code
- Make network requests
- Access the filesystem
- Store any data

The library accepts numeric configuration values. While we validate inputs internally, always ensure you're passing sanitized values when using user input.
