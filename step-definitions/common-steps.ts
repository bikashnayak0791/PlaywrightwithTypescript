import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';

interface CucumberWorld {
  page: Page;
}

let page: Page;

Given('I navigate to {string}', async function(this: CucumberWorld, url: string) {
  page = this.page;
  // Replace baseURL placeholder if needed
  const fullUrl = url.startsWith('http') ? url : `https://example.com${url}`;
  await page.goto(fullUrl);
});

When('I fill {string} with {string}', async function(this: CucumberWorld, selector: string, text: string) {
  await page.fill(selector, text);
});

When('I click on {string}', async function(this: CucumberWorld, selector: string) {
  await page.click(selector);
});

When('I select {string} from {string}', async function(this: CucumberWorld, value: string, selector: string) {
  await page.selectOption(selector, value);
});

When('I wait for {string}', async function(this: CucumberWorld, selector: string) {
  await page.waitForSelector(selector);
});

When('I wait for {int} milliseconds', async function(this: CucumberWorld, milliseconds: number) {
  await page.waitForTimeout(milliseconds);
});

Then('I should see {string}', async function(this: CucumberWorld, text: string) {
  const content = await page.content();
  expect(content).toContain(text);
});

Then('I should see element {string}', async function(this: CucumberWorld, selector: string) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
});

Then('I should not see element {string}', async function(this: CucumberWorld, selector: string) {
  const element = page.locator(selector);
  await expect(element).not.toBeVisible();
});

Then('the page title should be {string}', async function(this: CucumberWorld, title: string) {
  expect(await page.title()).toBe(title);
});

Then('the current URL should contain {string}', async function(this: CucumberWorld, urlPart: string) {
  expect(page.url()).toContain(urlPart);
});

Then('I should see {string} in element {string}', async function(this: CucumberWorld, text: string, selector: string) {
  const element = page.locator(selector);
  await expect(element).toContainText(text);
});
