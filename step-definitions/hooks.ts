import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

setDefaultTimeout(60 * 1000); // 60 seconds timeout

// Global variables
export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

// Define World context type
interface CucumberWorld {
  page: Page;
  browser: Browser;
  context: BrowserContext;
}

Before(async function(this: CucumberWorld) {
  // Get browser type from environment or use chromium as default
  const browserType = process.env.BROWSER || 'chromium';
  
  let launcher;
  if (browserType === 'firefox') {
    launcher = firefox;
  } else if (browserType === 'webkit') {
    launcher = webkit;
  } else {
    launcher = chromium;
  }

  // Launch browser
  browser = await launcher.launch({
    headless: process.env.HEADLESS !== 'false', // set HEADLESS=false to see browser
  });

  // Create context and page
  context = await browser.newContext();
  page = await context.newPage();

  // Store in World object for step definitions
  this.page = page;
  this.browser = browser;
  this.context = context;
});

After(async function(this: CucumberWorld) {
  // Close browser after each scenario
  if (page) {
    await page.close();
  }
  if (context) {
    await context.close();
  }
  if (browser) {
    await browser.close();
  }
});
