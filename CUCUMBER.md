# Cucumber BDD with Playwright TypeScript

This project integrates Cucumber (Gherkin) with Playwright for Behavior-Driven Development (BDD) testing.

## Project Structure

```
├── features/                           # Feature files (.feature)
│   ├── login.feature                  # Gherkin scenarios for login
│   └── navigation.feature             # Gherkin scenarios for navigation
├── step-definitions/                  # Step definitions (.ts)
│   ├── hooks.ts                       # Before/After hooks for browser setup
│   ├── common-steps.ts                # Common step definitions
│   └── login-steps.ts                 # Login-specific step definitions
├── pages/                             # Page Object Models
│   ├── BasePage.ts                    # Base page class
│   └── LoginPage.ts                   # Login page object
├── cucumber.js                        # Cucumber configuration
└── package.json                       # Dependencies and scripts
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Installation
```bash
npm run cucumber:dry-run
```

## Writing Feature Files

Feature files use Gherkin syntax and are stored in the `features/` folder.

### Example Feature File Structure

```gherkin
Feature: Login Functionality
  As a user
  I want to log in to the application
  So that I can access my account

  Background:
    Given I navigate to "https://example.com/login"

  Scenario: Successful login with valid credentials
    When I fill "input[name='username']" with "testuser@example.com"
    And I fill "input[name='password']" with "Test@1234"
    And I click on "button[type='submit']"
    Then the current URL should contain "/dashboard"

  Scenario Outline: Login with various credentials
    When I fill "input[name='username']" with "<username>"
    And I fill "input[name='password']" with "<password>"
    And I click on "button[type='submit']"
    Then I should see "<result>"

    Examples:
      | username              | password  | result           |
      | valid@example.com     | Valid123  | Dashboard        |
      | invalid@example.com   | Wrong123  | Invalid login    |
```

## Step Definitions

Step definitions are in the `step-definitions/` folder. They connect Gherkin steps to Playwright code.

### Built-in Common Steps

#### Navigation
```gherkin
Given I navigate to "https://example.com"
```

#### Form Interactions
```gherkin
When I fill "input[id='username']" with "testuser"
When I click on "button[type='submit']"
When I select "English" from "select[name='language']"
When I wait for "div.loader"
When I wait for 3000 milliseconds
```

#### Assertions
```gherkin
Then I should see "Welcome message"
Then I should see element "h1.title"
Then I should not see element ".error"
Then the page title should be "Login"
Then the current URL should contain "/dashboard"
Then I should see "Success" in element ".alert"
```

### Creating Custom Step Definitions

1. Create a new file in `step-definitions/` folder (e.g., `custom-steps.ts`)
2. Import Cucumber decorators and Playwright:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';

let page: Page;

Given('I have a custom setup', async function() {
  page = this.page;
  // Your setup code
});

When('I perform a custom action', async function() {
  // Your action code
});

Then('I verify a custom condition', async function() {
  // Your assertion code
});
```

## Using Page Object Models

Combine Gherkin with Page Objects for better maintainability:

```typescript
// step-definitions/user-steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { UserPage } from '../pages/UserPage';

let userPage: UserPage;

Given('I am on the user profile page', async function() {
  userPage = new UserPage(this.page);
  await userPage.navigateToProfile();
});

When('I edit my full name to {string}', async function(name: string) {
  await userPage.editFullName(name);
});

Then('my profile should display {string}', async function(name: string) {
  const displayedName = await userPage.getDisplayedName();
  expect(displayedName).toBe(name);
});
```

## Running Tests

### Run all features
```bash
npm run cucumber:features
```

### Run specific feature
```bash
npx cucumber-js --require-module ts-node/register --require 'step-definitions/**/*.ts' features/login.feature
```

### Run with dry-run (syntax check only)
```bash
npm run cucumber:dry-run
```

### Run in debug mode
```bash
npm run cucumber:debug
```

### Run with different browser
```bash
BROWSER=firefox npm run cucumber:features
BROWSER=webkit npm run cucumber:features
```

### Run in headed mode (see browser)
```bash
HEADLESS=false npm run cucumber:features
```

## Test Reports

Cucumber generates multiple report formats in the `reports/` folder:

- **HTML Report**: `reports/cucumber-report.html` (Best for viewing in browser)
- **JSON Report**: `reports/cucumber-report.json` (For CI/CD integration)
- **JUnit Report**: `reports/cucumber-report.xml` (For Jenkins, GitLab, etc.)

View HTML report:
```bash
# Open the HTML file in your browser
# Windows
start reports/cucumber-report.html

# macOS
open reports/cucumber-report.html

# Linux
xdg-open reports/cucumber-report.html
```

## Hooks (Before & After)

Hooks in `step-definitions/hooks.ts` run before and after each scenario:

```typescript
Before(async function() {
  // Runs before each scenario
  // Browser, context, and page are automatically created
});

After(async function() {
  // Runs after each scenario
  // Browser, context, and page are automatically closed
});
```

## World Context

Access Playwright resources in step definitions via `this`:

```typescript
When('I perform an action', async function() {
  const page = this.page;        // Playwright Page object
  const browser = this.browser;  // Playwright Browser object
  const context = this.context;  // Playwright BrowserContext
});
```

## Scenario Outline

Run the same scenario with multiple datasets:

```gherkin
Scenario Outline: Login with different users
  When I log in as "<user>" with "<role>"
  Then I should see the "<dashboard>"

  Examples:
    | user     | role  | dashboard   |
    | admin    | admin | Admin Panel |
    | user123  | user  | User Board  |
```

## Background

Share common steps across scenarios:

```gherkin
Feature: User Management

  Background:
    Given I navigate to "https://example.com"
    And I log in as admin

  Scenario: Create new user
    When I click on "Create User"
    Then I should see the user creation form
```

## Best Practices

1. **Keep Scenarios Simple**: Each scenario should test one behavior
2. **Use Given-When-Then**: Maintain the pattern
   - Given (initial state)
   - When (action)
   - Then (expected outcome)

3. **Avoid Technical Details**: Write in business language
4. **Reuse Steps**: Write generic steps that can be reused
5. **Use Page Objects**: Keep selectors and interactions in page objects
6. **Name Scenarios Clearly**: Use business-friendly names
7. **Use Data Tables**: For complex data scenarios

```gherkin
Scenario: Create user with multiple permissions
  Given I have the following user data:
    | field    | value                |
    | name     | John Doe             |
    | email    | john@example.com     |
    | role     | Admin                |
  When I submit the form
  Then the user should be created successfully
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module 'ts-node'" | Run `npm install` to ensure dependencies are installed |
| "Step is not implemented" | Create step definition in `step-definitions/` folder |
| "Timeout" | Increase timeout in `cucumber.js` or use specific wait steps |
| "Selector not found" | Use `describe` or `codegen` to find correct selector |
| "Reports not generated" | Ensure `reports/` folder exists and has write permissions |

## Example Workflow

1. **Write Feature File** (`features/user-signup.feature`)
   ```gherkin
   Scenario: User can sign up
     Given I navigate to "/signup"
     When I fill form with user details
     And I click signup button
     Then I should see success message
   ```

2. **Run and Get Snippets**
   ```bash
   npm run cucumber:features
   ```

3. **Implement Steps** (in `step-definitions/signup-steps.ts`)
4. **Execute Tests** with verification
5. **View Reports** in `reports/cucumber-report.html`

## Environment Variables

| Variable | Values | Default | Usage |
|----------|--------|---------|-------|
| `BROWSER` | chromium, firefox, webkit | chromium | Select browser |
| `HEADLESS` | true, false | true | Show browser window |
| `CI` | true, false | false | CI mode (affects timeouts) |

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Cucumber Tests
  run: npm run cucumber:features
```

### GitLab CI Example
```yaml
test:
  script:
    - npm install
    - npm run cucumber:features
  artifacts:
    reports:
      junit: reports/cucumber-report.xml
```

## Additional Resources

- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/reference/)
- [Playwright Documentation](https://playwright.dev)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)
