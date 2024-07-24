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

  test('should show error for small bust measurements', async ({ page }) => {
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
    await page.fill('#bust', '30');
    await page.fill('#waist', '36');
    await page.fill('#hips', '20');

    const errorMessage = page.locator('text=Your hips measurement is too small for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for large bust measurements', async ({ page }) => {
    await page.fill('#bust', '60');
    await page.fill('#waist', '30');
    await page.fill('#hips', '39');

    const errorMessage = page.locator('text=Your bust measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for large waist measurements', async ({ page }) => {
    await page.fill('#bust', '26');
    await page.fill('#waist', '60');
    await page.fill('#hips', '39');

    const errorMessage = page.locator('text=Your waist measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show error for large hips measurements', async ({ page }) => {
    await page.fill('#bust', '36');
    await page.fill('#waist', '30');
    await page.fill('#hips', '60');

    const errorMessage = page.locator('text=Your hips measurement is too large for this size calculator.');
    await expect(errorMessage).toBeVisible();
  });

  test('should show when measurements are entered and the "See My Sizes" button is clicked that "Closest Size Matches" is displayed', async ({ page }) => {
    await page.fill('#bust', '36.5');
    await page.fill('#waist', '30');
    await page.fill('#hips', '39.5');
    await page.getByRole('button').click();
    
    const sizeMatches = page.getByText('Closest Size Matches');
    await expect(sizeMatches).toBeVisible();
  });

  test('should show when in-range measurements (bust 36.5, waist 30, hips 39.5) are entered and the "See My Sizes" button is clicked that Size 8 for the Zara brand is displayed', async ({ page }) => {
      await page.fill('#bust', '36.5');
      await page.fill('#waist', '30');
      await page.fill('#hips', '39.5');
      await page.getByRole('button').click();

      const zaraSize8 = page.getByText('Size 8').nth(0); 
      await zaraSize8.scrollIntoViewIfNeeded();
      await expect(zaraSize8).toBeVisible();
    });
  
  test('should show when in-range measurements (bust 36.5, waist 30, hips 39.5) are entered and the "See My Sizes" button is clicked that Size 8 for the Talbots brand is displayed', async ({ page }) => {
      await page.fill('#bust', '36.5');
      await page.fill('#waist', '30');
      await page.fill('#hips', '39.5');
      await page.getByRole('button').click();

      const talbotsSize8 = page.getByText('Size 8').nth(1); 
      await talbotsSize8.scrollIntoViewIfNeeded();
      await expect(talbotsSize8).toBeVisible();
    });

  test('should show when in-range measurements (bust 36.5, waist 30, hips 39.5) are entered and the "See My Sizes" button is clicked that Size 8 for the Banana Republic brand is displayed', async ({ page }) => {
      await page.fill('#bust', '36.5');
      await page.fill('#waist', '30');
      await page.fill('#hips', '39.5');
      await page.getByRole('button').click();

      const bananaRepublicSize8 = page.getByText('Size 8').nth(2); 
      await bananaRepublicSize8.scrollIntoViewIfNeeded();
      await expect(bananaRepublicSize8).toBeVisible();
    });

    test('should show when in-range measurements (bust 36.5, waist 30, hips 39.5) are entered and the "See My Sizes" button is clicked that Size 8 for the J Crew brand is displayed', async ({ page }) => {
        await page.fill('#bust', '36.5');
        await page.fill('#waist', '30');
        await page.fill('#hips', '39.5');
        await page.getByRole('button').click();

        const jCrewSize8 = page.getByText('Size 8').last(); 
        await jCrewSize8.scrollIntoViewIfNeeded();
        await expect(jCrewSize8).toBeVisible();
    });

});