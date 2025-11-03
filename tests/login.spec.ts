import { test, expect } from '@playwright/test';
import { login, assertOnLoginPage } from '../utils/helpers';

test.describe('Scenario B/C — Login', () => {
  test('positive login', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html$/);
    
    const count = await page.locator('.inventory_item').count();
expect(count).toBeGreaterThan(0);
  });

  test('negative login (wrong password)', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await assertOnLoginPage(page);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
