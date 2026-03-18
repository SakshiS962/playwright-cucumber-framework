import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async searchProduct(productName: string) {
    const searchBox = this.page.locator('input[name="search"]').first();
    await searchBox.fill(productName);
    await this.page.locator(`//p[normalize-space()= "${productName}"]`).first().waitFor();
  
  }

  async selectProduct(productName: string) {
    await this.page.locator(`//p[normalize-space()= "${productName}"]`).first().click();
  }

  async addToCart(productName: string) {
    const product = this.page
    .locator(`//p[normalize-space()="${productName}"]`)
    .first();

  await product
    .locator('xpath=.//ancestor::div[contains(@class,"MuiCard-root")]//button[normalize-space()="Add to cart"]')
    .click();

    
  }
  
}