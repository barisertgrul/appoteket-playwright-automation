import { test, expect } from '@playwright/test';
import { login, addToCartByName, cartCount, logout } from '../utils/helpers';

test.describe('Scenario E — Add to Cart, Checkout, Logout (End-to-End)', () => {
  test('happy path', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await addToCartByName(page, 'Sauce Labs Backpack');
    await addToCartByName(page, 'Sauce Labs Bike Light');
    expect(await cartCount(page)).toBe(2);

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    const count = await page.locator('[data-test="shopping-cart-badge"]').innerText();
expect(Number(count)).toBe(2);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('User');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();


    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

    await logout(page);
    await page.goto('/inventory.html');
    await expect(page).not.toHaveURL(/.*inventory\.html$/);
  });
});
