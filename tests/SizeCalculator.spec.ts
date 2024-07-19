import { test, expect } from '@playwright/test';

test.describe('SizeCalculator', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where your SizeCalculator component is rendered
    await page.goto('http://localhost:5173');
  });

  test('should render the SizeCalculator component', async ({ page }) => {
    const title = page.locator('h1:has-text("Women\'s Size Calculator")');
    await expect(title).toBeVisible();
  });

  test('should show error for small measurements', async ({ page }) => {
    await page.fill('#bust', '20');
    await page.fill('#waist', '20');
    await page.fill('#hips', '20');

    const errorMessage = page.locator('text=Your bust measurement is too small for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for large measurements', async ({ page }) => {
    await page.fill('#bust', '60');
    await page.fill('#waist', '60');
    await page.fill('#hips', '60');

    const errorMessage = page.locator('text=Your bust measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });
});