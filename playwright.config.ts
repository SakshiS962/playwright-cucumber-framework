import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://crio-qkart-frontend-qa.vercel.app',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  retries: 2, // retry failed tests
  workers: 4 ,// parallel execution
  reporter: [
    ['list'],
    ['allure-playwright']
  ]
});


