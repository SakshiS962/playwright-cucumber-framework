import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
// import { LoginPage } from '../pages/LoginPage';
// import { generateUser } from '../utils/userHelper';
import { getLoginToken } from '../utils/apiHelper';
import fs from 'fs';

const browserType = process.env.BROWSER || 'chromium';
Before({ timeout: 60 * 1000 }, async function () {
  // ✅ Launch browser
  if (browserType === 'chromium') {
    this.browser = await chromium.launch({ headless: false , slowMo: 50});
  } else if (browserType === 'firefox') {
    this.browser = await firefox.launch({ headless: true , slowMo: 50});
  } else if (browserType === 'webkit') {
    this.browser = await webkit.launch({ headless: true, slowMo: 50 });
  }

 // ✅ Check if session already exists
 if (fs.existsSync('auth.json')) {
  console.log('✅ Using existing session');

  this.context = await this.browser.newContext({
    storageState: 'auth.json'
  });

} else {
  console.log('⚡ No session found, logging in via API');

  this.context = await this.browser.newContext();

  // 👉 Get token
  const token = await getLoginToken('testUser', 'testPassword');

  // 👉 Inject token
  await this.context.addInitScript((token : string) => {
    localStorage.setItem('token', token);
  }, token);
  this.page = await this.context.newPage();
    await this.page.goto('https://crio-qkart-frontend-qa.vercel.app');

    // ✅ Save session
    await this.context.storageState({ path: 'auth.json' });

    console.log('💾 Session saved');
  }

  if (!this.page) {
    this.page = await this.context.newPage();
  }
  await this.page.goto('https://crio-qkart-frontend-qa.vercel.app');

  
  /** 
   // ✅ Get token via API
   const token = await getLoginToken('testUser', 'testPassword');

   // ✅ Inject token into local storage
   await this.context.addInitScript((token: string) => {
     localStorage.setItem('token', token);
   }, token);
 
  // ✅ Create context + page
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
*/

});




After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot();
    console.log('Screenshot captured for failed test');
  }

  await this.browser.close();
});