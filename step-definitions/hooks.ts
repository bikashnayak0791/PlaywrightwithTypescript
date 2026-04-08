import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page} from '@playwright/test';
import { BrowserManager } from '../Config/BrowserManager';

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
  browserManager: BrowserManager;
}

Before(async function(this: CucumberWorld) {
  // Get browser type from environment or use chromium as default
 page = await BrowserManager.initBrowser();
  this.page = page;
  this.browser = BrowserManager.getBrowser()!;
  this.context = BrowserManager.getContext()!;
});

After(async function(this: CucumberWorld) {
  await BrowserManager.quitDriver();
});
