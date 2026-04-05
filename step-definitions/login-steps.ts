import { Given, When, Then } from '@cucumber/cucumber'; 
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DataTable } from '@cucumber/cucumber';
import { Dashboard } from '../pages/Dashboard';

let loginPage: LoginPage;
let dashboardPage: Dashboard;

Given("I am on the login page and enter valid credentials", async function (dataTable: DataTable) {
  loginPage = new LoginPage(this.page);
  const credentials = dataTable.rowsHash();
  await loginPage.loginapplication(credentials.Username, credentials.Password);
});

Then('I should be redirected to the dashboard page', async function () {
  dashboardPage = new Dashboard(this.page);
  await dashboardPage.verifydashboard();
});
