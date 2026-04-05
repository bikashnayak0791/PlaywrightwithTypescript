
import { Page } from '@playwright/test';

export class LoginPage {
  private usernameplaceholder = 'Username';
  private passwordplaceholder = 'Password';
  private adminradiobutton = "//input[@value='admin']";
  private submitbutton = '#submit_login';
  private errorMessage = "//div[@role='alert']";
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async loginapplication(username: string,password: string) {
    await this.page.getByPlaceholder(this.usernameplaceholder).fill(username);
    await this.page.getByPlaceholder(this.passwordplaceholder).fill(password);
    await this.page.locator(this.adminradiobutton).click();
    await this.page.locator(this.submitbutton).click();
  }
}
