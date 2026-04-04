import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

interface CucumberWorld {
  page: Page;
}

let page: Page;
let loginPage: LoginPage;

Given('I am on the login page', async function(this: CucumberWorld) {
  page = this.page;
  loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
});

When('I log in with username {string} and password {string}', async function(this: CucumberWorld, username: string, password: string) {
  await loginPage.login(username, password);
});

When('I enter username {string}', async function(this: CucumberWorld, username: string) {
  await loginPage.enterUsername(username);
});

When('I enter password {string}', async function(this: CucumberWorld, password: string) {
  await loginPage.enterPassword(password);
});

When('I click the login button', async function(this: CucumberWorld) {
  await loginPage.clickLoginButton();
});

Then('the login error message should be visible', async function(this: CucumberWorld) {
  const isVisible = await loginPage.isErrorMessageVisible();
  expect(isVisible).toBeTruthy();
});

Then('the login error message should contain {string}', async function(this: CucumberWorld, expectedText: string) {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedText);
});
