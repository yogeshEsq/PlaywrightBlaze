// spec: specs/demoblaze-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Authentication Suite', () => {
  test('User Registration - Duplicate Username', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto('https://www.demoblaze.com/');

    // 2. Click on 'Sign up' link in navigation
    await page.getByRole('link', { name: 'Sign up' }).click();

    // Verify signup modal is displayed
    await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();

    // 3. Enter an existing username (e.g., 'testuser123')
    await page.getByRole('textbox', { name: 'Username:' }).fill('testuser123');

    // 4. Enter a valid password
    await page.getByRole('textbox', { name: 'Password:' }).fill('password123');

    // 5. Click the 'Sign up' button
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('This user already exist.');
      await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Sign up' }).click();

    // Verify user remains on signup modal with form fields intact
    await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username:' })).toHaveValue('testuser123');
    await expect(page.getByRole('textbox', { name: 'Password:' })).toHaveValue('password123');
  });
});
