import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  async launchBrowser() {
    this.browser = await chromium.launch({ headless: false });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
