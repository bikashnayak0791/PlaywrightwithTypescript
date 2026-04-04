# Cucumber BDD Integration Summary

## ✅ What's Been Set Up

### 1. **Cucumber Configuration**
   - `cucumber.js` - Main configuration file with:
     - TypeScript support via ts-node
     - Multiple report formats (HTML, JSON, JUnit)
     - Parallel execution (2 workers)
     - 60-second timeout

### 2. **Feature Files** (in `features/`)
   - `login.feature` - Login scenarios with valid/invalid credentials
   - `navigation.feature` - Website navigation scenarios
   - `registration.feature` - User registration with validation examples

### 3. **Step Definitions** (in `step-definitions/`)
   - `hooks.ts` - Browser setup/teardown with Before/After hooks
   - `common-steps.ts` - Generic steps for navigation, form interaction, and assertions
   - `login-steps.ts` - Login-specific steps using LoginPage object

### 4. **Package.json Updates**
   ```json
   "cucumber": "cucumber-js",
   "cucumber:debug": "node --inspect-brk node_modules/.bin/cucumber-js",
   "cucumber:features": "cucumber-js --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature",
   "cucumber:dry-run": "cucumber-js --dry-run --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature"
   ```

### 5. **Documentation**
   - `CUCUMBER.md` - Comprehensive Cucumber guide
   - `CUCUMBER_QUICK_REFERENCE.md` - Quick reference for common commands
   - `README.md` - Updated with Cucumber information

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Cucumber Tests
```bash
npm run cucumber:features
```

### 3. View Reports
```bash
# HTML Report
open reports/cucumber-report.html

# JSON Report
cat reports/cucumber-report.json
```

## 📝 Creating New Tests

### Step 1: Create Feature File
Create a new `.feature` file in `features/` folder:

```gherkin
Feature: User Profile Management
  Scenario: Update user profile
    Given I navigate to "/profile"
    When I fill "input[name='name']" with "New Name"
    And I click on "button.save"
    Then I should see "Profile updated successfully"
```

### Step 2: Run and See Missing Steps
```bash
npm run cucumber:features
```

### Step 3: Create Step Definitions
Create a new file in `step-definitions/` (e.g., `profile-steps.ts`):

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from '@playwright/test';

let page: Page;

When('I update my profile', async function() {
  page = this.page;
  // Implementation
});
```

## 🔄 Supported Browsers

Run tests on different browsers:

```bash
# Chromium (default)
npm run cucumber:features

# Firefox
BROWSER=firefox npm run cucumber:features

# WebKit (Safari)
BROWSER=webkit npm run cucumber:features
```

## 👁️ Headless vs Headed Mode

```bash
# Headless (default)
npm run cucumber:features

# Headed (see browser)
HEADLESS=false npm run cucumber:features
```

## 🐛 Debug Mode

```bash
npm run cucumber:debug
```

This opens Node.js debugger where you can:
- Set breakpoints
- Step through code
- Inspect variables

## 📊 Report Formats

After running tests, check `reports/` folder:

| Format | File | Best For |
|--------|------|----------|
| HTML | `cucumber-report.html` | Visual review |
| JSON | `cucumber-report.json` | CI/CD integration |
| JUnit | `cucumber-report.xml` | Jenkins, GitLab CI |

## 🎯 Built-in Step Definitions

### Navigation
```gherkin
Given I navigate to "https://example.com"
Given I navigate to "/login"
```

### Forms
```gherkin
When I fill "input[id='email']" with "test@example.com"
When I click on "button[type='submit']"
When I select "Option 1" from "select[id='dropdown']"
When I wait for ".loader"
When I wait for 3000 milliseconds
```

### Assertions
```gherkin
Then I should see "Welcome"
Then I should see element ".success-message"
Then I should not see element ".error"
Then the page title should be "Dashboard"
Then the current URL should contain "/home"
Then I should see "Success" in element ".alert"
```

## 📂 Project Structure

```
features/
├── login.feature           # Login scenarios
├── navigation.feature      # Navigation scenarios
└── registration.feature    # Registration scenarios

step-definitions/
├── hooks.ts               # BeforeEach/AfterEach setup
├── common-steps.ts        # Generic step definitions
└── login-steps.ts         # Login-specific steps

pages/
├── BasePage.ts            # Base page object
└── LoginPage.ts           # Login page implementation

cucumber.js               # Cucumber configuration
package.json             # Updated with Cucumber scripts
```

## ⚙️ Configuration Files

### cucumber.js
- Requires step definitions from `step-definitions/**/*.ts`
- Uses ts-node for TypeScript support
- Generates multiple report formats
- Parallel execution with 2 workers
- 60-second timeout per scenario

### tsconfig.json
- Already configured for Cucumber
- Strict TypeScript mode enabled
- Node types included

## 🔗 Integration with Page Objects

Steps can use Page Objects for better code organization:

```typescript
import { LoginPage } from '../pages/LoginPage';

When('I log in successfully', async function() {
  const loginPage = new LoginPage(this.page);
  await loginPage.login('user@example.com', 'password123');
});
```

## 📚 Available Resources

- Full Documentation: [CUCUMBER.md](./CUCUMBER.md)
- Quick Reference: [CUCUMBER_QUICK_REFERENCE.md](./CUCUMBER_QUICK_REFERENCE.md)
- Main README: [README.md](./README.md)
- Playwright Docs: https://playwright.dev
- Cucumber Docs: https://cucumber.io

## 🎓 Next Steps

1. ✅ Review example feature files in `features/`
2. ✅ Check out step definitions in `step-definitions/`
3. ✅ Run tests: `npm run cucumber:features`
4. ✅ Create your own feature files
5. ✅ Implement custom step definitions
6. ✅ Use Page Objects for complex scenarios
7. ✅ Integrate with CI/CD pipeline

## 💡 Tips & Tricks

- Use `Background` for common setup steps
- Use `Scenario Outline` for parametrized tests
- Keep steps generic and reusable
- Use Page Objects for page interactions
- Tag scenarios: `@smoke`, `@regression`, `@slow`
- Run specific tag: `npx cucumber-js --tags "@smoke"`

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Step is not implemented" | Create step definition in `step-definitions/` |
| Timeout | Increase timeout in `cucumber.js` |
| Selector not found | Use Playwright Inspector: `npx playwright codegen` |
| Reports not generated | Check write permissions on `reports/` folder |
| Type errors | Ensure `@types/node` is installed |

## 📞 Support

For issues or questions:
1. Check [CUCUMBER.md](./CUCUMBER.md) for detailed documentation
2. Check [CUCUMBER_QUICK_REFERENCE.md](./CUCUMBER_QUICK_REFERENCE.md) for quick answers
3. Review example features in `features/` folder
4. Check Playwright documentation: https://playwright.dev
5. Check Cucumber documentation: https://cucumber.io

---

**Happy Testing! 🎉**
