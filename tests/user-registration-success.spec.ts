// spec: specs/demoblaze-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Authentication Suite', () => {
  test('User Registration - Successful', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto('https://www.demoblaze.com/');

    // 2. Click on 'Sign up' link in navigation
    await page.getByRole('link', { name: 'Sign up' }).click();

    // Verify signup modal is displayed
    await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password:' })).toBeVisible();

    // 3. Enter a unique username in the username field
    await page.getByRole('textbox', { name: 'Username:' }).fill('uniqueuser2026');

    // 4. Enter a valid password in the password field
    await page.getByRole('textbox', { name: 'Password:' }).fill('password123');

    // 5. Click the 'Sign up' button
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Sign up successful.');
      await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Sign up' }).click();
  });
});
