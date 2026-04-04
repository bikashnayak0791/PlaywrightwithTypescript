# How to Run Tests - Complete Guide

## 🚀 Running Playwright Tests

### 1. Run All Playwright Tests
```bash
npm test
```

### 2. Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### 3. Run Tests for Specific Browser
```bash
npm run test:chromium      # Chrome
npm run test:firefox       # Firefox
npm run test:webkit        # Safari
```

### 4. Run Tests in Debug Mode
```bash
npm run test:debug
```
This opens the Playwright Inspector where you can:
- Step through code line-by-line
- Set breakpoints
- Inspect variables

### 5. Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```
Opens a visual interface to run and debug tests

### 6. Run Tests Sequentially (One at a Time)
```bash
npm run test:serial
```

### 7. View Test Reports
```bash
npm run report
```

---

## 🥒 Running Cucumber Tests

### 1. Run All Cucumber Features
```bash
npm run cucumber:features
```

### 2. Run Specific Feature File

#### Option A: Using Full Path
```bash
npx cucumber-js --require-module ts-node/register --require 'step-definitions/**/*.ts' features/login.feature
```

#### Option B: Shorthand (Recommended)
```bash
npx cucumber-js features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

### 3. Run Multiple Specific Features
```bash
npx cucumber-js features/login.feature features/navigation.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

### 4. Run with Tags (Specific Scenarios)

Run only **@smoke** tests:
```bash
npx cucumber-js --tags "@smoke" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

Run **@regression** tests:
```bash
npx cucumber-js --tags "@regression" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

Run tests with **multiple tags** (AND logic):
```bash
npx cucumber-js --tags "@smoke AND @login" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

Run tests with **multiple tags** (OR logic):
```bash
npx cucumber-js --tags "@smoke OR @regression" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

Run all tests **EXCEPT @slow**:
```bash
npx cucumber-js --tags "NOT @slow" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### 5. Run Cucumber Tests in Headed Mode (See Browser)
```bash
HEADLESS=false npm run cucumber:features
```

### 6. Run Cucumber with Different Browser
```bash
BROWSER=firefox npm run cucumber:features
BROWSER=webkit npm run cucumber:features
```

### 7. Run Dry-Run (Check Steps Without Execution)
```bash
npm run cucumber:dry-run
```

This validates that all steps are implemented without actually running tests.

### 8. Run in Debug Mode
```bash
npm run cucumber:debug
```

---

## 📊 View Test Reports

After running tests, check the `reports/` folder:

### View HTML Report
```bash
# Windows
start reports/cucumber-report.html

# macOS
open reports/cucumber-report.html

# Linux
xdg-open reports/cucumber-report.html
```

### View JSON Report
```bash
cat reports/cucumber-report.json
```

### View JUnit Report
```bash
cat reports/cucumber-report.xml
```

---

## 🎯 Real-World Examples

### Example 1: Quick Smoke Test
```bash
HEADLESS=false npx cucumber-js --tags "@smoke" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### Example 2: Run Login Feature File in Debug
```bash
npm run cucumber:debug -- features/login.feature
```

### Example 3: Run Navigation Feature Headed Mode
```bash
HEADLESS=false npx cucumber-js features/navigation.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

### Example 4: Run Registration Feature with Firefox
```bash
BROWSER=firefox npx cucumber-js features/registration.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

### Example 5: Run All Regression Tests in Parallel
```bash
npx cucumber-js --tags "@regression" --parallel 4 --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### Example 6: Dry-Run Login Feature
```bash
npx cucumber-js --dry-run features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

---

## 📝 Command Reference Table

### Playwright Commands
| Command | What It Does |
|---------|------------|
| `npm test` | Run all tests |
| `npm run test:headed` | See browser while running |
| `npm run test:chromium` | Run on Chrome |
| `npm run test:firefox` | Run on Firefox |
| `npm run test:webkit` | Run on Safari |
| `npm run test:debug` | Open debugger |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:serial` | Run tests one-by-one |
| `npm run report` | View test report |

### Cucumber Commands
| Command | What It Does |
|---------|------------|
| `npm run cucumber:features` | Run all features |
| `npm run cucumber:dry-run` | Check steps without execution |
| `npm run cucumber:debug` | Debug mode |
| Feature File | `features/login.feature` |
| With Tags | `--tags "@smoke"` |
| Headed Mode | `HEADLESS=false npm run...` |
| Different Browser | `BROWSER=firefox npm run...` |

---

## 🎯 Most Common Use Cases

### Case 1: "Run Login Feature File"
```bash
npx cucumber-js features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

### Case 2: "Run Only Smoke Tests"
```bash
npx cucumber-js --tags "@smoke" --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature
```

### Case 3: "Run Everything in Headed Mode"
```bash
HEADLESS=false npm run cucumber:features
```

### Case 4: "Run One Feature in Debug"
```bash
npm run cucumber:debug -- features/login.feature
```

### Case 5: "Check What Steps are Implemented"
```bash
npm run cucumber:dry-run
```

### Case 6: "Run Navigation Feature with Firefox"
```bash
BROWSER=firefox npx cucumber-js features/navigation.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

---

## 🏷️ For Running Specific Features Using npm Scripts

You can create custom npm scripts in `package.json` for frequently used features:

```json
{
  "scripts": {
    "test:login": "npx cucumber-js features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'",
    "test:navigation": "npx cucumber-js features/navigation.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'",
    "test:smoke": "npx cucumber-js --tags '@smoke' --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature",
    "test:regression": "npx cucumber-js --tags '@regression' --require-module ts-node/register --require 'step-definitions/**/*.ts' features/**/*.feature"
  }
}
```

Then run with:
```bash
npm run test:login
npm run test:navigation
npm run test:smoke
npm run test:regression
```

---

## 🔧 Environment Variables

When running tests, you can use these environment variables:

```bash
# See the browser while tests run
HEADLESS=false npm run cucumber:features

# Use specific browser
BROWSER=firefox npm run cucumber:features
BROWSER=webkit npm run cucumber:features

# Both together
HEADLESS=false BROWSER=firefox npm run cucumber:features
```

---

## 📂 Your Test Files Structure

```
PlayWrightTypescript/
├── features/
│   ├── login.feature           ← Run this: npx cucumber-js features/login.feature
│   ├── navigation.feature      ← Run this: npx cucumber-js features/navigation.feature
│   └── registration.feature    ← Run this: npx cucumber-js features/registration.feature
├── step-definitions/
│   ├── hooks.ts               (Browser setup/teardown)
│   ├── common-steps.ts        (Generic steps)
│   └── login-steps.ts         (Login-specific)
└── reports/
    ├── cucumber-report.html   (View after running)
    ├── cucumber-report.json
    └── cucumber-report.xml
```

---

## 💡 Tips & Tricks

1. **Tab Completion**: Most shells support tab completion for filenames
   ```bash
   npx cucumber-js features/[TAB]  # Press Tab to see options
   ```

2. **Run Last Command**: Use `!!` to repeat the last command
   ```bash
   !!  # Repeats your last cucumber-js command
   ```

3. **Copy Command**: You can copy commands from the examples above and paste directly in terminal

4. **Save Frequently Used Commands**: Add them to `package.json` as npm scripts (see above)

---

## 🚨 Troubleshooting

### Problem: "Feature file not found"
**Solution**: Make sure the path is correct
```bash
# Wrong
npx cucumber-js login.feature

# Correct
npx cucumber-js features/login.feature
```

### Problem: "Step is not implemented"
**Solution**: Check if step definition exists in `step-definitions/`

### Problem: "Module not found"
**Solution**: Make sure you have `--require-module ts-node/register`

### Problem: "Timeout"
**Solution**: Add more time with `--timeout`:
```bash
npx cucumber-js features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts' --timeout 120000
```

---

## ✅ Quick Start

**First time?** Just run this to see a test execute:

```bash
npm run cucumber:features
```

**Want to run one feature?** Use this:

```bash
npx cucumber-js features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

**Want to see the browser?** Add `HEADLESS=false`:

```bash
HEADLESS=false npx cucumber-js features/login.feature --require-module ts-node/register --require 'step-definitions/**/*.ts'
```

---

**That's it! You're ready to run tests!** 🎉
