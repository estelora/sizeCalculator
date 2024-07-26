import { test, expect } from '@playwright/test';

test.describe('SizeCalculator', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where your SizeCalculator component is rendered
    await page.goto('zoo-keeper-lizard-13777.netlify.app');
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

  test('should show when low edge case measurements (bust 31.5, waist 24.5, hips 34.5) are entered and the "See My Sizes" button is clicked that Size 2 for the Zara brand is displayed', async ({ page }) => {
    await page.fill('#bust', '31.5');
    await page.fill('#waist', '24.5');
    await page.fill('#hips', '34.5');
    await page.getByRole('button').click();

    const zaraSize2 = page.getByText('Size 2').nth(0); 
    await zaraSize2.scrollIntoViewIfNeeded();
    await expect(zaraSize2).toBeVisible();
    }); 

    test('should show when low edge case measurements (bust 31.5, waist 24.5, hips 34.5) are entered and the "See My Sizes" button is clicked that Size 2 for the Talbots brand is displayed', async ({ page }) => {
      await page.fill('#bust', '31.5');
      await page.fill('#waist', '24.5');
      await page.fill('#hips', '34.5');
      await page.getByRole('button').click();
  
      const talbotsSize2 = page.getByText('Size 2').nth(1); 
      await talbotsSize2.scrollIntoViewIfNeeded();
      await expect(talbotsSize2).toBeVisible();
      }); 

    test('should show when low edge case measurements (bust 31.5, waist 24.5, hips 34.5) are entered and the "See My Sizes" button is clicked that Size 0 for the Banana Republic brand is displayed', async ({ page }) => {
      await page.fill('#bust', '31.5');
      await page.fill('#waist', '24.5');
      await page.fill('#hips', '34.5');
      await page.getByRole('button').click();
  
      const bananaRepublicSize0 = page.getByText('Size 0').nth(0); 
      await bananaRepublicSize0.scrollIntoViewIfNeeded();
      await expect(bananaRepublicSize0).toBeVisible();
      });
      
    test('should show when low edge case measurements (bust 31.5, waist 24.5, hips 34.5) are entered and the "See My Sizes" button is clicked that Size 0 for the J Crew brand is displayed', async ({ page }) => {
      await page.fill('#bust', '31.5');
      await page.fill('#waist', '24.5');
      await page.fill('#hips', '34.5');
      await page.getByRole('button').click();
  
      const jCrewSize0 = page.getByText('Size 0').nth(1); 
      await jCrewSize0.scrollIntoViewIfNeeded();
      await expect(jCrewSize0).toBeVisible();
      });

    test('should show when high edge case measurements (bust 54.25, waist 46, hips 56.25) are entered and the "See My Sizes" button is clicked that Size 14 for the Zara brand is displayed', async ({ page }) => {
      await page.fill('#bust', '54.25');
      await page.fill('#waist', '46');
      await page.fill('#hips', '56.25');
      await page.getByRole('button').click();
  
      const zaraSize14 = page.getByText('Size 14'); 
      await zaraSize14.scrollIntoViewIfNeeded();
      await expect(zaraSize14).toBeVisible();
      });

    test('should show when high edge case measurements (bust 54.25, waist 46, hips 56.25) are entered and the "See My Sizes" button is clicked that Size 18 for the Talbots brand is displayed', async ({ page }) => {
      await page.fill('#bust', '54.25');
      await page.fill('#waist', '46');
      await page.fill('#hips', '56.25');
      await page.getByRole('button').click();
  
      const talbotsSize18 = page.getByText('Size 18'); 
      await talbotsSize18.scrollIntoViewIfNeeded();
      await expect(talbotsSize18).toBeVisible();
      });

    test('should show when high edge case measurements (bust 54.25, waist 46, hips 56.25) are entered and the "See My Sizes" button is clicked that Size 20 for the Banana Republic brand is displayed', async ({ page }) => {
      await page.fill('#bust', '54.25');
      await page.fill('#waist', '46');
      await page.fill('#hips', '56.25');
      await page.getByRole('button').click();
  
      const bananaRepublicSize20 = page.getByText('Size 20').nth(0); 
      await bananaRepublicSize20.scrollIntoViewIfNeeded();
      await expect(bananaRepublicSize20).toBeVisible();
      });
      
    test('should show when high edge case measurements (bust 54.25, waist 46, hips 56.25) are entered and the "See My Sizes" button is clicked that Size 20 for the J Crew brand is displayed', async ({ page }) => {
      await page.fill('#bust', '54.25');
      await page.fill('#waist', '46');
      await page.fill('#hips', '56.25');
      await page.getByRole('button').click();
  
      const jCrewSize20 = page.getByText('Size 20').nth(1); 
      await jCrewSize20.scrollIntoViewIfNeeded();
      await expect(jCrewSize20).toBeVisible();
      });
});