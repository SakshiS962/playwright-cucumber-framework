import { Page, expect} from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async navigateToCheckout() {
    await this.page.goto('https://crio-qkart-frontend-qa.vercel.app/checkout');
  }

  async addNewAddress(address: string) {
    await this.page.locator('#add-new-btn').click();

    const addressBox = this.page.locator('.MuiOutlinedInput-input').first();
    await addressBox.fill(address);

    const addButton = this.page.locator('button:has-text("ADD")');
    await addButton.click();

    // wait for address to appear
    await this.page.locator(`text=${address}`).waitFor();
  }

  async selectAddress(address: string) {
    await this.page.locator(`//p[text()="${address}"]`).click();
  }

  async placeOrder() {
    await this.page.locator('//button[text()="PLACE ORDER"]').click();
  }

  async verifyOrderPlaced() {
    const toast = this.page.locator('#notistack-snackbar');

    await expect(toast).toBeVisible();
    await expect(toast).toContainText(
      'Order placed successfully!'
    );
  }
}