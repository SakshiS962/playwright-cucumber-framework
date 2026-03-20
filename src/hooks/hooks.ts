import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { generateUser } from '../utils/userHelper';

const browserType = process.env.BROWSER || 'chromium';
Before(async function () {
  // ✅ Launch browser
  if (browserType === 'chromium') {
    this.browser = await chromium.launch({ headless: true });
  } else if (browserType === 'firefox') {
    this.browser = await firefox.launch({ headless: true });
  } else if (browserType === 'webkit') {
    this.browser = await webkit.launch({ headless: true });
  }

  // ✅ Create context + page
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // ✅ Create dynamic user
  const user = generateUser();

  const loginPage = new LoginPage(this.page);

  // ✅ Register new user
  await loginPage.register(user.username, user.password);

  // ✅ Login with same user
  await loginPage.login(user.username, user.password);

  // ✅ Ensure login success
  await this.page.getByRole('button', { name: 'Logout' }).waitFor();
});




After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ path: `screenshots/${Date.now()}.png` });

    await this.attach(screenshot, 'image/png');
  }

  await this.page.close();
  await this.browser.close();
});