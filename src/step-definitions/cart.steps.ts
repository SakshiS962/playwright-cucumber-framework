import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../utils/testData.json';
import { generateUser } from '../utils/userHelper';

let loginPage: LoginPage;
let productPage: ProductPage;
let checkoutPage: CheckoutPage;
let user: any;

const address = "Test Address 1234567890";


// ✅ SEARCH
When('user searches for a product', async function () {
  productPage = new ProductPage(this.page);
  
  await productPage.searchProduct(testData.product.name);
  
});


// ✅ ADD TO CART
When('user adds product to cart', async function () {
  
  await productPage.addToCart(testData.product.name);
  
});

When('user adds multiple products to cart', async function () {
  productPage = new ProductPage(this.page);
  for (const product of testData.products) {
  await productPage.searchProduct(product.name);
  await productPage.addToCart(product.name);
  }
});


// ✅ CHECKOUT FLOW
When('user navigates to checkout', async function () {
  checkoutPage = new CheckoutPage(this.page);

  await this.page.locator("//button[normalize-space()='Checkout']").click();
});

When('user adds new address', async function () {
  await checkoutPage.addNewAddress(address);
});

When('user selects address', async function () {
  await checkoutPage.selectAddress(address);
});

When('user places order', async function () {
  await checkoutPage.placeOrder();
});


// ✅ VALIDATION
Then('Verify order is placed successfully', async function () {
  await checkoutPage.verifyOrderPlaced();
});