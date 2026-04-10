# Playwright TypeScript Framework with Cucumber BDD

A comprehensive Playwright testing framework using TypeScript with Page Object Model pattern and Cucumber BDD for behavior-driven development.

## Project Structure

```
├── tests/                       # Playwright test specifications
│   ├── login.spec.ts           # Login page tests
│   └── example.spec.ts         # Example tests
├── features/                   # Cucumber feature files (Gherkin)
│   ├── login.feature           # Login scenarios
│   └── navigation.feature      # Navigation scenarios
├── step-definitions/           # Cucumber step implementations
│   ├── hooks.ts               # Before/After hooks
│   ├── common-steps.ts        # Generic step definitions
│   └── login-steps.ts         # Login-specific steps
├── pages/                      # Page Object Models
│   ├── BasePage.ts            # Base page class
│   └── LoginPage.ts           # Login page object
├── utils/                      # Utility functions
│   ├── TestData.ts            # Test data constants
│   └── UIHelpers.ts           # UI helpers
├── config/                     # Configuration files
├── reports/                    # Test reports and artifacts
├── playwright.config.ts       # Playwright configuration
├── cucumber.js                # Cucumber configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## Key Features

- **Dual Testing Approach**: Both Playwright and Cucumber BDD frameworks
- **Page Object Model Pattern**: Reusable page classes for maintainability
- **Gherkin Scenarios**: Business-readable test scenarios with Cucumber
- **TypeScript Support**: Full type safety and intellisense
- **Multiple Browsers**: Runs on Chromium, Firefox, and WebKit
- **Comprehensive Reporting**: HTML, JSON, and JUnit reports
- **Visual Evidence**: Screenshots on failure and video recording
- **Parallel Execution**: Tests run in parallel by default
- **Retry Logic**: Automatic retry for flaky tests in CI
- **Behavior-Driven Development**: Write tests in plain English with Cucumber
- **AI-Powered Automation**: Playwright Agent for natural language browser automation

## Playwright Agent Integration

This framework now includes **Playwright Agent**, an AI-powered browser automation tool that allows you to control the browser using natural language instructions.

### Setup Playwright Agent

1. **Install Dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure API Key**:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key:
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   OPENAI_MODEL=gpt-4
   ```

3. **Run AI-Powered Demo**:
   ```bash
   npm run agent:demo
   ```

### Using Playwright Agent in Tests

```typescript
import { PlaywrightAgent } from 'playwright-agent';

const agent = new PlaywrightAgent({
  page,
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4'
});

// Execute natural language commands
await agent.execute('Click the login button and enter username "testuser"');
await agent.execute('Navigate to dashboard and verify welcome message');
```

The agent can understand and execute complex browser interactions using AI, making test creation more intuitive and reducing boilerplate code.

### Alternative: Playwright MCP Server

For VS Code integration with AI assistants like GitHub Copilot, consider installing the Playwright MCP Server:

```bash
npm install -g @executeautomation/playwright-mcp-server
```

This provides AI-assisted test generation and execution through the Model Context Protocol.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Update Configuration
Edit `playwright.config.ts`:
- Update `baseURL` to your application URL
- Modify `webServer` if needed
- Configure `use` options (traces, screenshots, videos)

### 3. Create Page Objects
Create new page classes in `pages/` folder extending `BasePage`

### 4. Write Tests
Create test files in `tests/` folder with `.spec.ts` extension

## Running Tests

### Playwright Tests

#### Run all tests
```bash
npm test
```

#### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

#### Run tests in debug mode
```bash
npm run test:debug
```

#### Run tests in UI mode (recommended for development)
```bash
npm run test:ui
```

#### Run tests for specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

#### Run tests sequentially (one at a time)
```bash
npm run test:serial
```

#### View test report
```bash
npm run report
```

### Playwright Agent Demo

#### Run AI-powered browser automation demo
```bash
npm run agent:demo
```
*Requires OpenAI API key configured in `.env` file*

### Cucumber BDD Tests

#### Run all Cucumber features
```bash
npm run cucumber:features
```

#### Run with dry-run (syntax check only)
```bash
npm run cucumber:dry-run
```

#### Run in debug mode
```bash
npm run cucumber:debug
```

#### Run with different browser
```bash
BROWSER=firefox npm run cucumber:features
BROWSER=webkit npm run cucumber:features
```

#### Run in headed mode (see browser)
```bash
HEADLESS=false npm run cucumber:features
```

**For detailed Cucumber documentation, see [CUCUMBER.md](CUCUMBER.md)**

## Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestData } from '../utils/TestData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should successfully login', async () => {
    await loginPage.login(TestData.VALID_USERNAME, TestData.VALID_PASSWORD);
    expect(await page.url()).toContain('/dashboard');
  });
});
```

## Example Page Object

```typescript
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = 'input[name="username"]';
  
  async enterUsername(username: string) {
    await this.fill(this.usernameInput, username);
  }
}
```

## Best Practices

1. **Use Page Object Models**: Encapsulate page interactions
2. **Separate Test Data**: Use TestData constants
3. **Meaningful Selectors**: Use data-testid attributes
4. **Wait for Elements**: Use proper wait strategies
5. **Descriptive Test Names**: Clear test description
6. **Assertions**: Use Playwright's built-in expect assertions
7. **Error Handling**: Handle errors gracefully

## Debugging

### Debug specific test
```bash
npx playwright test tests/login.spec.ts --debug
```

### Inspect selectors
```bash
npx playwright codegen https://example.com
```

## CI/CD Integration

The framework is ready for CI/CD pipelines. Environment variable support:
- `CI`: Set automatically by CI systems
- Tests retry twice in CI mode
- Single worker in CI mode for stability

## File Organization

- **pages/**: Page Object Models
- **tests/**: Test specifications
- **features/**: Cucumber feature files (Gherkin)
- **step-definitions/**: Cucumber step definitions
- **utils/**: Helpers, test data, utilities
- **config/**: Configuration related files
- **reports/**: Generated test reports and artifacts

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests fail to run | Run `npm install` to ensure dependencies are installed |
| TypeScript errors | Check `tsconfig.json` and ensure all imports are correct |
| Selector not found | Use `npx playwright codegen` to inspect elements |
| Timeout errors | Increase timeout in specific test or `playwright.config.ts` |
| Screenshot not capture | Ensure `screenshots/` folder exists in reports |
| "Step is not implemented" error | Create step definition in `step-definitions/` folder |
| Cucumber reports not generated | Ensure `reports/` folder exists and has write permissions |

## Cucumber Quick Start

1. **Create a feature file** in `features/` folder:
   ```gherkin
   Feature: User Login
     Scenario: Login with valid credentials
       Given I navigate to "https://example.com/login"
       When I fill "input[name='username']" with "user@example.com"
       And I fill "input[name='password']" with "password123"
       And I click on "button[type='submit']"
       Then the current URL should contain "/dashboard"
   ```

2. **Run Cucumber tests**:
   ```bash
   npm run cucumber:features
   ```

3. **View Cucumber reports**:
   ```bash
   open reports/cucumber-report.html
   ```

**For comprehensive Cucumber documentation, see [CUCUMBER.md](CUCUMBER.md)**

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-test)
- [Locator Strategies](https://playwright.dev/docs/locators)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/reference/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)
