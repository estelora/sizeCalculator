import { test, expect } from '@playwright/test';

test.describe('SizeCalculator', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where your SizeCalculator component is rendered
    await page.goto('http://localhost:5173/');
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

  test('should show error for small  bust measurements', async ({ page }) => {
    await page.fill('#bust', '20');
    await page.fill('#waist', '30');
    await page.fill('#hips', '39');

    const errorMessage = page.locator('text=Your bust measurement is too small for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for small waist measurements', async ({ page }) => {
    await page.fill('#bust', '36');
    await page.fill('#waist', '20');
    await page.fill('#hips', '39');

    const errorMessage = page.locator('text=Your waist measurement is too small for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for small hips measurements', async ({ page }) => {
    await page.fill('#bust', '39');
    await page.fill('#waist', '36');
    await page.fill('#hips', '20');

    const errorMessage = page.locator('text=Your hips measurement is too small for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for large measurements', async ({ page }) => {
    await page.fill('#bust', '60');
    await page.fill('#waist', '60');
    await page.fill('#hips', '60');

    const errorMessage = page.locator('text=Your bust measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for large waist measurements', async ({ page }) => {
    await page.fill('#bust', '35');
    await page.fill('#waist', '60');
    await page.fill('#hips', '39');

    const errorMessage = page.locator('text=Your waist measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for large  bust measurements', async ({ page }) => {
    await page.fill('#bust', '60');
    await page.fill('#waist', '30');
    await page.fill('#hips', '39');

    const errorMessage = page.locator('text=Your bust measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });
  test('should show error for large hips measurements', async ({ page }) => {
    await page.fill('#bust', '36');
    await page.fill('#waist', '36');
    await page.fill('#hips', '60');

    const errorMessage = page.locator('text=Your hips measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });
});