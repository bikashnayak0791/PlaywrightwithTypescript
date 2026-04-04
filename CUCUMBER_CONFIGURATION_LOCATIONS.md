# Cucumber Configuration Guide - Complete Setup

## 📍 Configuration Locations

### 1. **Main Cucumber Configuration** (`cucumber.js`)

```javascript
module.exports = {
  require: [
    'step-definitions/**/*.ts',  // ← Where step definitions are loaded
  ],
  requireModule: ['ts-node/register'],  // ← TypeScript support
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json',
    'junit:reports/cucumber-report.xml',
  ],
  formatOptions: {
    snippetInterface: 'async-await',
  },
  parallel: 2,           // ← 2 parallel test workers
  timeout: 60000,        // ← 60 seconds timeout per scenario
};
```

**What each option does:**
- `require` - Loads step definition files
- `requireModule` - Enables TypeScript compilation
- `format` - Report output formats
- `parallel` - Number of parallel workers
- `timeout` - Maximum time per scenario

---

### 2. **npm Scripts** (`package.json`)

```json
"scripts": {
  "cucumber": "cucumber-js",
  "cucumber:debug": "node --inspect-brk node_modules/.bin/cucumber-js",
  "cucumber:features": "cucumber-js --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature",
  "cucumber:dry-run": "cucumber-js --dry-run --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature"
}
```

---

### 3. **Feature Files Location** (`features/` folder)

```
features/
├── login.feature           # Login test scenarios
├── navigation.feature      # Navigation scenarios
└── registration.feature    # Registration scenarios
```

---

## 🏷️ Using Tags in Cucumber

### How to Add Tags to Feature Files

Edit any `.feature` file and add tags before `Scenario`:

```gherkin
Feature: User Login

  @smoke @regression
  Scenario: Successful login
    Given I navigate to "https://example.com/login"
    When I fill "input[name='username']" with "user@example.com"
    Then the current URL should contain "/dashboard"

  @regression @slow
  Scenario: Login with invalid credentials
    Given I navigate to "https://example.com/login"
    When I fill "input[name='username']" with "invalid@example.com"
    Then I should see "Invalid credentials"
```

### Run Tests with Specific Tags

```bash
# Run only @smoke tests
npx cucumber-js --tags "@smoke" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature

# Run @regression tests
npx cucumber-js --tags "@regression" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature

# Run tests with multiple tags (AND logic)
npx cucumber-js --tags "@smoke AND @login" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature

# Run tests with multiple tags (OR logic)
npx cucumber-js --tags "@smoke OR @regression" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature

# Run all tests EXCEPT @slow
npx cucumber-js --tags "NOT @slow" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

---

## 🔍 Dry-Run Configuration

### What is Dry-Run?
Dry-run checks if all steps are implemented WITHOUT actually executing them.

### Run Dry-Run

```bash
npm run cucumber:dry-run
```

Or manually:

```bash
cucumber-js --dry-run --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### Sample Output
```
Feature: User Login

  Scenario: Successful login
    Given I navigate to "https://example.com/login"  ✓ (not executed)
    When I fill "input[name='username']" with "user@example.com"  ✓ (not executed)
    Then the current URL should contain "/dashboard"  ✓ (not executed)

3 scenarios, 0 failures, 0 steps skipped, 9 steps skipped
```

### Key Points:
- ✅ `--dry-run` does NOT execute steps
- ✅ Only checks if steps are implemented/defined
- ✅ Fast way to verify test structure
- ✅ Great for CI/CD validation

---

## 📋 Complete Configuration Examples

### Example 1: Run All Features

```bash
npm run cucumber:features
```

### Example 2: Run Specific Feature File

```bash
npx cucumber-js --require-module ts-node/register --require 'step-definitions/**/*.ts' features/login.feature
```

### Example 3: Run with Tags and Reporting

```bash
npx cucumber-js \
  --tags "@smoke" \
  --format html:reports/smoke-report.html \
  --format json:reports/smoke-report.json \
  --require-module ts-node/register \
  --require 'step-definitions/**/*.ts' \
  features/**/*.feature
```

### Example 4: Run in Parallel with Specific Tags

```bash
npx cucumber-js \
  --tags "@regression" \
  --parallel 4 \
  --require-module ts-node/register \
  --require 'step-definitions/**/*.ts' \
  features/**/*.feature
```

### Example 5: Dry-Run Specific Feature

```bash
npx cucumber-js \
  --dry-run \
  --require-module ts-node/register \
  --require 'step-definitions/**/*.ts' \
  features/login.feature
```

---

## 🎯 Common Cucumber CLI Options

| Option | Purpose | Example |
|--------|---------|---------|
| `--dry-run` | Test check without execution | `--dry-run` |
| `--tags` | Run scenarios with specific tags | `--tags "@smoke"` |
| `--parallel` | Number of parallel workers | `--parallel 4` |
| `--format` | Output format | `--format html:report.html` |
| `--require` | Load step definitions | `--require 'step-definitions/**/*.ts'` |
| `--require-module` | Module for TypeScript | `--require-module ts-node/register` |
| `--timeout` | Scenario timeout in ms | `--timeout 60000` |
| `--fail-fast` | Exit on first failure | `--fail-fast` |
| `--profile` | Use cucumber profile | `--profile smoke` |

---

## 📂 Directory Structure Reference

```
PlayWrightTypescript/
├── features/                          # Feature files (Gherkin)
│   ├── login.feature
│   ├── navigation.feature
│   └── registration.feature
├── step-definitions/                  # Step implementations
│   ├── hooks.ts                      # Before/After hooks
│   ├── common-steps.ts               # Generic steps
│   └── login-steps.ts                # Login steps
├── pages/                             # Page Objects
│   ├── BasePage.ts
│   └── LoginPage.ts
├── cucumber.js                        # ← MAIN CONFIG
├── package.json                       # ← NPM SCRIPTS
├── tsconfig.json                      # TypeScript config
└── reports/                           # Generated reports
    ├── cucumber-report.html
    ├── cucumber-report.json
    └── cucumber-report.xml
```

---

## 🚀 Quick Setup Checklist

- ✅ `cucumber.js` - Main configuration file
- ✅ Step definitions in `step-definitions/` folder
- ✅ Feature files in `features/` folder
- ✅ npm scripts in `package.json`
- ✅ TypeScript support via ts-node

---

## 📝 Common Scenarios

### Scenario 1: Run All Smoke Tests
```bash
npx cucumber-js --tags "@smoke" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### Scenario 2: Check What Steps Need Implementation
```bash
npm run cucumber:dry-run
```

### Scenario 3: Run Tests with Custom Reports
```bash
npx cucumber-js \
  --format html:reports/custom-report.html \
  --require-module ts-node/register \
  --require 'step-definitions/**/*.ts' \
  features/**/*.feature
```

### Scenario 4: Run Tests in Serial (No Parallelization)
```bash
npx cucumber-js --parallel 1 --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### Scenario 5: Exit on First Failure
```bash
npx cucumber-js --fail-fast --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

---

## 🔧 Advanced Configuration

### Customize cucumber.js for Different Environments

Edit `cucumber.js`:

```javascript
module.exports = {
  require: ['step-definitions/**/*.ts'],
  requireModule: ['ts-node/register'],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json',
    'junit:reports/cucumber-report.xml',
  ],
  formatOptions: {
    snippetInterface: 'async-await',
  },
  parallel: process.env.CI ? 1 : 2,  // Single worker in CI
  timeout: process.env.CI ? 120000 : 60000,  // Longer timeout in CI
  tags: process.env.TAGS || '',  // Accept tags from environment
};
```

Then run with:
```bash
TAGS="@smoke" npm run cucumber:features
```

---

## 📊 Report Viewing

After running tests, view reports:

```bash
# View HTML report
open reports/cucumber-report.html

# View JSON report
cat reports/cucumber-report.json

# View JUnit report
cat reports/cucumber-report.xml
```

---

## 🎓 Summary

| What | Where | How |
|-----|-------|-----|
| **Main Config** | `cucumber.js` | Step definitions, timeouts, parallelization |
| **npm Scripts** | `package.json` | `cucumber:features`, `cucumber:dry-run` |
| **Feature Files** | `features/` | Gherkin scenarios with tags |
| **Step Definitions** | `step-definitions/` | TypeScript implementation |
| **Tags** | In `.feature` files | `@tagname` before Scenario |
| **Dry-Run** | npm command | `npm run cucumber:dry-run` |
| **Reports** | `reports/` | HTML, JSON, JUnit formats |

---

**Everything is configured and ready to use!** 🎉
