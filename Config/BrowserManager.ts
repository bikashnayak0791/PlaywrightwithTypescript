import { Browser, BrowserContext, Page, chromium, firefox, webkit, LaunchOptions } from '@playwright/test';
import { EnvConfig, getEnvConfig } from './EnvConfig';



export class BrowserManager {
  private browser!: Browser;
  private context!: BrowserContext;
  private page!: Page;
  private config!: EnvConfig;

  public async init(env: string = 'qa'): Promise<Page> {
    this.config = getEnvConfig(env);

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
      args: process.env.DOCKER ? ['--no-sandbox', '--disable-dev-shm-usage'] : [],
    };

    this.browser = await launcher.launch(launchOptions);
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    await this.page.goto(this.config.baseURL);
    return this.page;
  }

  public getContext(): BrowserContext {
    return this.context;
  }

  public getBrowser(): Browser {
    return this.browser;
  }

  public async close(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}