import { Page } from '@playwright/test';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async getText(selector: string): Promise<string | null> {
    return this.page.textContent(selector);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }
}
