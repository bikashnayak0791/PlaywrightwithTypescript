import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  // Selectors
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';
  private errorMessage = '.error-message';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.goto('/login');
  }

  async enterUsername(username: string) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }

  async getErrorMessage(): Promise<string | null> {
    return this.getText(this.errorMessage);
  }
}
