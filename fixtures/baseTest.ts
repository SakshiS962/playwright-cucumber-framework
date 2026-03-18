import { test as base, expect } from '@playwright/test';
import { config } from '../src/config/config';
import fs from 'fs';


// Use storageState if available
const storagePath = 'storageState.json';
const storageExists = fs.existsSync(storagePath);

export const test = base.extend({
  page: async ({ browser }, use) => {
    const context = storageExists
      ? await browser.newContext({ storageState: storagePath })
      : await browser.newContext();

    const page = await context.newPage();
    await page.goto(env.baseURL);
    await use(page);
    await context.close();
  },
});

export { expect };
