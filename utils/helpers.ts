import { Page, expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

export async function logout(page: Page) {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
}

export async function assertOnLoginPage(page: Page) {
  await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

export async function addToCartByName(page: Page, name: string) {
  const card = page.locator('.inventory_item').filter({ hasText: name });
  await expect(card).toBeVisible();
  await card.getByRole('button', { name: /Add to cart/i }).click();
}
