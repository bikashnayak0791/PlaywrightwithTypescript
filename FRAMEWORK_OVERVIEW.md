# Cucumber Playwright TypeScript Framework - Final Structure

## 📁 Project Structure

```
PlayWrightTypescript/
│
├── features/                           # Cucumber Feature Files (BDD)
│   ├── login.feature
│   ├── navigation.feature
│   └── registration.feature
│
├── step-definitions/                   # Cucumber Step Implementations
│   ├── hooks.ts                       # Browser setup/teardown
│   ├── common-steps.ts                # Generic step definitions
│   └── login-steps.ts                 # Login-specific steps
│
├── pages/                              # Page Object Models
│   ├── BasePage.ts                    # Base page class
│   └── LoginPage.ts                   # Login page implementation
│
├── utils/                              # Utilities
│   ├── TestData.ts                    # Test data constants
│   └── UIHelpers.ts                   # Helper functions
│
├── tests/                              # (OPTIONAL) Traditional Playwright Tests
│   ├── login.spec.ts                  # Can be used for unit-style tests
│   └── example.spec.ts                # Examples
│
├── reports/                            # Test Reports (auto-generated)
│   ├── cucumber-report.html           # HTML report
│   ├── cucumber-report.json           # JSON report
│   └── cucumber-report.xml            # JUnit report
│
├── cucumber.js                         # ← Cucumber Config (USE THIS)
├── playwright.config.ts               # ← Playwright Config
├── tsconfig.json                      # TypeScript Config
└── package.json                       # Dependencies & Scripts
```

---

## 🚀 Running Tests - Cucumber First

### Run All Cucumber Features
```bash
npm run cucumber:features
```

### Run Specific Feature File
```bash
npx cucumber-js features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

### Run with Tags
```bash
npx cucumber-js --tags "@smoke" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### Run Dry-Run (Validate Steps)
```bash
npm run cucumber:dry-run
```

### Run in Headed Mode (See Browser)
```bash
HEADLESS=false npm run cucumber:features
```

### Run with Different Browser
```bash
BROWSER=firefox npm run cucumber:features
BROWSER=webkit npm run cucumber:features
```

---

## 🎭 About the `tests/` Folder

The `tests/` folder contains **optional** traditional Playwright test files (`.spec.ts`).

### Use Cases for `tests/` folder:
- Unit testing specific functions
- Quick smoke tests
- Testing without BDD/Cucumber format
- Integration tests that don't fit BDD

### Run Playwright Tests (if needed)
```bash
npm test
npm run test:headed
npx playwright test tests/login.spec.ts
```

### Recommendation:
✅ **For BDD Testing**: Use `features/` + `step-definitions/`  
✅ **For Traditional Testing**: Use `tests/` folder  
✅ **You can use both** - they don't conflict!

---

## 📝 Creating New Tests (Cucumber Way)

### Step 1: Create Feature File
Create `features/your-feature.feature`:
```gherkin
Feature: Your Feature
  Scenario: Test scenario
    Given I navigate to "https://example.com"
    When I fill "input[name='email']" with "test@example.com"
    Then I should see "Success"
```

### Step 2: Run Dry-Run
```bash
npm run cucumber:dry-run
```

### Step 3: Get Step Snippets and Implement
Cucumber will tell you which steps are missing. Add them to `step-definitions/` folder:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';

When('I fill {string} with {string}', async function(selector: string, text: string) {
  await this.page.fill(selector, text);
});
```

### Step 4: Run Feature
```bash
npx cucumber-js features/your-feature.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

---

## 🔧 Key Files Explained

### `cucumber.js` - Main Cucumber Configuration
```javascript
{
  'require-module ts-node/register'     // TypeScript support
  'step-definitions/**/*.ts'            // Load all step definitions
  'features/**/*.feature'               // Load all feature files
  '--parallel 2'                        // Run 2 tests in parallel
  '--timeout 60000'                     // 60-second timeout
  '--format html:reports/...'           // HTML report
  '--format json:reports/...'           // JSON report
  '--format junit:reports/...'          // JUnit report
}
```

### `playwright.config.ts` - Playwright Configuration
Used when running traditional Playwright tests:
```bash
npm test  # Uses this config
```

### `tsconfig.json` - TypeScript Configuration
Includes all necessary paths and type definitions for both Cucumber and Playwright.

---

## 📊 View Test Reports

After running tests:

```bash
# View HTML Report
open reports/cucumber-report.html

# View JSON Report
cat reports/cucumber-report.json

# View JUnit Report
cat reports/cucumber-report.xml
```

---

## 🏷️ Using Tags

### Add Tags to Feature File
```gherkin
@smoke @critical
Scenario: Login test
  Given I navigate to login
```

### Run Specific Tags
```bash
# Smoke tests only
npx cucumber-js --tags "@smoke" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature

# Multiple tags (AND)
npx cucumber-js --tags "@smoke AND @critical" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature

# Multiple tags (OR)
npx cucumber-js --tags "@smoke OR @regression" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature

# Exclude tags
npx cucumber-js --tags "NOT @slow" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

---

## 🎯 Quick Command Reference

| Command | Purpose |
|---------|---------|
| `npm run cucumber:features` | Run all Cucumber tests |
| `npm run cucumber:dry-run` | Validate steps without running |
| `npm run cucumber:debug` | Debug mode |
| `npm test` | Run Playwright tests (if using tests/ folder) |
| `HEADLESS=false npm run cucumber:features` | See browser |
| `BROWSER=firefox npm run cucumber:features` | Use Firefox |

---

## 💡 Best Practices

1. **Use Cucumber First**: Write `.feature` files for all test scenarios
2. **Keep Steps Reusable**: Create generic steps in `common-steps.ts`
3. **Use Page Objects**: Encapsulate page interactions in `pages/` folder
4. **Organize Features**: Group related scenarios in feature files
5. **Add Tags**: Use `@smoke`, `@regression`, `@slow` for easy filtering
6. **Use Test Data**: Keep constants in `utils/TestData.ts`

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run a sample feature
npm run cucumber:features

# 3. Create your own feature file in features/
# 4. Add steps to step-definitions/
# 5. Run your feature
npx cucumber-js features/your-feature.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'

# 6. View reports
open reports/cucumber-report.html
```

---

## ⚙️ Configuration Summary

- ✅ Cucumber configured for BDD testing
- ✅ Playwright integrated for browser automation
- ✅ TypeScript support enabled
- ✅ Multiple report formats (HTML, JSON, JUnit)
- ✅ Parallel execution setup (2 workers)
- ✅ Page Object Model ready
- ✅ Optional traditional Playwright tests

---

## 🎓 Learn More

- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Playwright Documentation](https://playwright.dev)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/reference/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

---

**Your framework is ready for Cucumber + Playwright + TypeScript testing!** 🎉
