import { test, expect } from '@playwright/test';
import { login } from '../utils/helpers';

async function getUIProductNames(page) {
  return await page.locator('.inventory_item_name').allInnerTexts();
}

async function getUIProductPrices(page) {
  const texts = await page.locator('.inventory_item_price').allInnerTexts();
  return texts.map(t => parseFloat(t.replace('$', '')));
}

test.describe('Scenario D — Sorting Validation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html$/);
  });

  test('Name (A→Z) and (Z→A)', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const namesAZ = await getUIProductNames(page);
    const sortedAZ = [...namesAZ].sort((a,b) => a.localeCompare(b));
    expect(namesAZ).toEqual(sortedAZ);

    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const namesZA = await getUIProductNames(page);
    const sortedZA = [...namesZA].sort((a,b) => b.localeCompare(a));
    expect(namesZA).toEqual(sortedZA);
  });

  test('Price (low→high) and (high→low)', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const pricesLoHi = await getUIProductPrices(page);
    const sortedLoHi = [...pricesLoHi].sort((a,b) => a - b);
    expect(pricesLoHi).toEqual(sortedLoHi);

    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const pricesHiLo = await getUIProductPrices(page);
    const sortedHiLo = [...pricesHiLo].sort((a,b) => b - a);
    expect(pricesHiLo).toEqual(sortedHiLo);
  });
});
