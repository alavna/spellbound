# Contributing to Spellbound

Thank you for your interest in contributing to Spellbound! This document provides guidelines and information for contributors.

## Code of Conduct

Please be respectful and constructive in all interactions. We're building something together.

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm 8.x

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/spellbound.git
cd spellbound

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

### Project Structure

```
spellbound/
├── packages/
│   ├── core/           # Core spell/grammar checking engine
│   ├── react/          # React bindings (hooks, components)
│   └── dictionaries/
│       └── en-us/      # US English dictionary
├── examples/
│   └── blocknote-demo/ # Demo application
├── scripts/            # Build and conversion scripts
└── docs/               # Documentation
```

## How to Contribute

### Reporting Bugs

Before reporting a bug, please:
1. Search existing issues to see if it's already reported
2. Try to reproduce with the latest version
3. Include a minimal reproduction case

When creating an issue, include:
- Your environment (OS, Node version, browser)
- Steps to reproduce
- Expected vs actual behavior
- Any error messages

### Suggesting Features

We welcome feature suggestions! Please:
1. Search existing issues first
2. Describe the use case clearly
3. Explain why this would benefit others

### Pull Requests

1. **Fork** the repository
2. **Create a branch** for your feature: `git checkout -b feature/my-feature`
3. **Make your changes** with clear, atomic commits
4. **Add tests** for new functionality
5. **Run tests**: `pnpm test`
6. **Run linting**: `pnpm lint`
7. **Submit** a pull request

#### Commit Messages

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

Example: `feat: add support for custom phonetic algorithms`

### Adding New Grammar Rules

Grammar rules live in `packages/core/src/rules/`. See the existing rules for examples.

#### Built-in Rules

For simple pattern-based rules:

```typescript
// packages/core/src/rules/built-in/my-rule.ts
import type { GrammarRule } from '../../types';

export const myRule: GrammarRule = {
  id: 'my-rule',
  name: 'My Rule',
  description: 'Description of what this rule checks',
  category: 'grammar', // or 'style', 'punctuation', etc.
  severity: 'warning', // or 'error', 'suggestion', 'info'
  
  check(text, context) {
    const issues = [];
    // Your detection logic here
    return issues;
  }
};
```

#### Testing Rules

Add tests in a corresponding `.test.ts` file:

```typescript
import { myRule } from './my-rule';

describe('myRule', () => {
  it('should detect the pattern', () => {
    const issues = myRule.check('text with issue', {});
    expect(issues).toHaveLength(1);
  });
  
  it('should not flag correct text', () => {
    const issues = myRule.check('correct text', {});
    expect(issues).toHaveLength(0);
  });
});
```

### Adding Dictionary Support

To add a new language dictionary:

1. Create a new package: `packages/dictionaries/[lang-code]/`
2. Follow the structure of `packages/dictionaries/en-us/`
3. Include word frequency data if available
4. Document the data sources and licenses

## Development Workflow

### Running the Demo

```bash
cd examples/blocknote-demo
pnpm dev
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
cd packages/core && pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Run tests for specific package
cd packages/core && pnpm test
```

### Linting & Formatting

```bash
# Check linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## License Considerations

### Your Contributions

By contributing, you agree that your contributions will be licensed under the MIT License.

### Third-Party Code

If your contribution includes code from other sources:
1. Ensure the license is compatible (MIT, BSD, Apache 2.0, etc.)
2. Add attribution in `NOTICE` file
3. Update `THIRD_PARTY_LICENSES.md` if adding new dependencies

### LanguageTool Rules

If converting rules from LanguageTool:
1. They remain under LGPL-2.1
2. Place them in `packages/core/src/rules/imported/`
3. Include source attribution in the file header

## Questions?

Feel free to open an issue for questions or join discussions. We're happy to help!

---

Thank you for contributing to Spellbound! 🔮
