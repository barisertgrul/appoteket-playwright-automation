import { test } from '@playwright/test';
import { assertOnLoginPage } from '../utils/helpers';

test.describe('Scenario A — Auth Guard (Unauthorized Access)', () => {
  test('redirects unauthenticated user to login when opening inventory directly', async ({ page }) => {
    await page.goto('/inventory.html');
    await assertOnLoginPage(page);
  });
});
