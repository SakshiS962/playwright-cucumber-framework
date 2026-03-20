import { request } from '@playwright/test';

export async function getLoginToken(username: string, password: string) {
  const apiContext = await request.newContext();

  const response = await apiContext.post(
   'https://qkart-qa-backend.labs.crio.do/api/v1/auth/login',
    {
      data: {
        username,
        password
      }
    }
  );

  const body = await response.json();

  return body.token; // token returned by API
}