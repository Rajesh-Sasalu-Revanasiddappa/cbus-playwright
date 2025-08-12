# Playwright Test Automation Framework

This framework demonstrates automated testing using Playwright with TypeScript, implementing the Page Object Model pattern.

## 🛠 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cbus-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🚀 Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test test-1.spec.ts
```

Run tests with UI mode:
```bash
npx playwright test --ui
```

## 🏗 Framework Structure

### Page Object Model (POM)
The framework uses POM pattern to separate test logic from page interactions:
- `/page-object-model/pages/` - Contains page classes
- `/page-object-model/fixtures/` - Contains test fixtures
- `/tests/` - Contains test files

Example page object:
```typescript
class LoginPage {
  async login(username: string, password: string) {
    // Page interactions
  }
}
```

### Environment Configuration
We use dotenv for environment management:
- `/configs/env/.env.test` - Test environment variables
- `/configs/env/.env.uat` - UAT environment variables

To run tests with specific environment:
```bash
ENV=uat npx playwright test
```
NOTE: Tests in uat env should fail, which is expected and intentional, as base url is pointing to non-Orange HRM system.

### Base Page Setup
`basePage.ts` handles common setup and teardown:
- Global test fixtures
- Common page actions
- Authentication state management

```typescript
import { test as base } from '@playwright/test';
export const test = base.extend({
  // Custom fixtures
});
```

### Key Features
- ✨ Page Object Model
- 🔐 Environment-based configuration
- 🔄 Global setup/teardown
- 📝 TypeScript support
- 🎭 Playwright test runner

## 📁 Project Structure
```
cbus-playwright/
├── page-object-model/
│   ├── pages/
│   └── fixtures/
├── tests/
├── configs/
│   └── env/
├── playwright.config.ts
└── package.json
```

## 🤝 Contributing
1. Create a feature branch
2. Commit changes
3. Push to the branch
4. Create a Pull Request

## 📝 License
This project is licensed under the MIT License.
