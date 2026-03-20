import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import testData from '../utils/testData.json';
import { expect } from '@playwright/test';

let loginPage: LoginPage;

Given('user is on login page', async function () {
  loginPage = new LoginPage(this.page);
});

Given('user is already logged in', async function () {
  // nothing needed, handled in hook
});

When('user enters valid credentials', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.login(
    testData.validUser.username,
    testData.validUser.password
  );
});

// ✅ ADD THIS (MISSING)
When('user enters invalid credentials', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.login('wronguser', 'wrongpass');
});

Then('error message should be displayed', async function () {
  const errorMsg = this.page.locator('#notistack-snackbar');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toBeVisible();
});

Then('user should be logged in', async function () {
  // ✅ Check Logout button (most reliable)
  const logoutBtn = this.page.getByRole('button', { name: 'Logout' });

  await expect(logoutBtn).toBeVisible();
});