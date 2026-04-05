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
}
const BM = new BrowserManager();
Before(async function(this: CucumberWorld) {
  // Get browser type from environment or use chromium as default
  const BM = new BrowserManager();
  page = await BM.init();
  this.page = page;
  this.browser = BM.getBrowser();
  this.context = BM.getContext();
});

After(async function(this: CucumberWorld) {
  // Close browser after each scenario
 BM.close();
});
