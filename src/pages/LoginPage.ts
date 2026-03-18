import { Page } from '@playwright/test';
import { config } from '../config/config';

export class LoginPage {
  constructor(private page: Page) {}

 

  async login(username: string, password: string) {
    await this.page.goto(`${config.baseURL}/login`);
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('//button[normalize-space()="Login to QKart"]');
  }

  async register(username: string, password: string) {
   
    await this.page.goto(`${config.baseURL}/register`); 
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#confirmPassword').fill(password);
  
    await this.page.click('//button[normalize-space()="Register Now"]');
  
    // wait for successful registration → redirected to login
    await this.page.waitForURL('**/login');
  }
}
