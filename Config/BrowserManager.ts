
import * as fs from 'fs';
import { Browser, BrowserContext, Page, chromium, firefox, webkit, LaunchOptions } from '@playwright/test';
import { EnvConfig, getEnvConfig } from './EnvConfig';

export class BrowserManager {
  private static browser: Browser | null = null;
  private static context: BrowserContext | null = null;
  private static page: Page | null = null;
  private static config: EnvConfig | null = null;
  private static storageStatePath = 'storageState.json';
  private static useStorageState = process.env.PERSIST_LOGIN === 'true';

  public static async initBrowser(): Promise<Page> {
    // Load config once
    this.config = getEnvConfig(process.env.NODE_ENV || 'qa');

    let launcher;
    switch (this.config.browser) {
      case 'firefox':
        launcher = firefox;
        break;
      case 'webkit':
        launcher = webkit;
        break;
      default:
        launcher = chromium;
    }

    const launchOptions: LaunchOptions = {
      headless: this.config.headless,
      args: process.env.DOCKER
        ? ['--no-sandbox', '--disable-dev-shm-usage']
        : ['--start-maximized'],
    };

    this.browser = await launcher.launch(launchOptions);

    const contextOptions: any = { viewport: null };
    if (this.useStorageState && fs.existsSync(this.storageStatePath)) {
      contextOptions.storageState = this.storageStatePath;
    }

    this.context = await this.browser.newContext(contextOptions);

    this.page = await this.context.newPage();
    if (this.config.baseURL) {
      await this.page.goto(this.config.baseURL);
    }

    return this.page;
  }

  public static async saveStorageState(): Promise<void> {
    if (this.useStorageState && this.context) {
      await this.context.storageState({ path: this.storageStatePath });
    }
  }

  // --- Getters ---
  public static getBrowser(): Browser | null {
    return this.browser;
  }

  public static getContext(): BrowserContext | null {
    return this.context;
  }

  public static getPage(): Page | null {
    return this.page;
  }

  // --- Close everything ---
  public static async quitDriver(): Promise<void> {
    if (this.context) {
      await this.saveStorageState();
    }

    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();

    this.page = null;
    this.context = null;
    this.browser = null;
    this.config = null;
  }
}