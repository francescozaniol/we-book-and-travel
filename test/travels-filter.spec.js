import { describe, test, expect } from 'vitest';
import { setup, createPage } from '@nuxt/test-utils/e2e';

describe('Travel search filter', async () => {
  await setup({
    rootDir: '..',
  });

  test('should search correctly', async () => {
    const page = await createPage('/');

    await page.waitForSelector('[data-testid*=travel-card-]', { timeout: 5000 });

    const inputElement = await page.locator('#filter\\.search');
    await inputElement.fill('China');
    await inputElement.press('Enter');

    await page.waitForSelector('[data-testid*=travel-card-]', { timeout: 5000 });

    const card = await page.locator('[data-testid*=travel-card-]');

    expect(await card.locator('h1').innerText()).toEqual('China');

    await page.screenshot({ path: './test/screenshots/china.png' });
  });
});