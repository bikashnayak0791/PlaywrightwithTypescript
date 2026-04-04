# Cucumber Integration Guide

## Quick Reference

### Common Cucumber Commands

```bash
# Run all features
npm run cucumber:features

# Run specific feature
npx cucumber-js --require-module ts-node/register --require 'step-definitions/**/*.ts' features/login.feature

# Dry run (syntax check)
npm run cucumber:dry-run

# Debug mode
npm run cucumber:debug

# With specific browser
BROWSER=firefox npm run cucumber:features

# Headed mode
HEADLESS=false npm run cucumber:features
```

### File Structure

```
features/              # Gherkin feature files
├── login.feature     
├── navigation.feature 
└── registration.feature

step-definitions/      # Step implementations
├── hooks.ts          # Browser setup/teardown
├── common-steps.ts   # Generic steps
└── login-steps.ts    # Login-specific steps

pages/                 # Page objects used in steps
├── BasePage.ts
└── LoginPage.ts
```

### Writing Steps

```typescript
// Given - Setup state
Given('I am on the login page', async function() {
  // Setup code
});

// When - Perform action
When('I click the login button', async function() {
  // Action code
});

// Then - Verify result
Then('I should see an error message', async function() {
  // Assertion code
});
```

### Using Page Objects in Steps

```typescript
import { LoginPage } from '../pages/LoginPage';

When('I log in with valid credentials', async function() {
  const loginPage = new LoginPage(this.page);
  await loginPage.login('user@example.com', 'password');
});
```

### Accessing Playwright Objects

In any step definition:
```typescript
// Access page object
const page = this.page;

// Access browser
const browser = this.browser;

// Access context
const context = this.context;
```

### Feature File Syntax

```gherkin
Feature: Login Functionality
  Description of the feature

  Background:
    # Runs before each scenario
    Given I navigate to the login page

  Scenario: Single scenario
    Given initial condition
    When I perform an action
    Then I verify the result

  Scenario Outline: parametrized scenario
    When I enter "<param1>"
    Then I see "<result>"
    
    Examples:
      | param1 | result |
      | value1 | result1 |
```

## Reports

Reports are generated in `reports/` folder after test execution:

- **HTML Report**: `cucumber-report.html` - Best for viewing in browser
- **JSON Report**: `cucumber-report.json` - For CI/CD integration
- **JUnit Report**: `cucumber-report.xml` - For Jenkins, GitLab CI, etc.

## Debugging

Use `--debug` flag to enter debug mode:
```bash
npm run cucumber:debug
```

This will open Node debugger where you can set breakpoints and inspect code.

## For More Information

See [CUCUMBER.md](./CUCUMBER.md) for comprehensive documentation.
