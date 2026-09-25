import { test, expect } from '@playwright/test';

test('ST-07: ตรวจสอบ Validation เมื่อไม่ได้กรอก Postal Code ในหน้า Checkout', async ({ page }) => {
  // 1. Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 2. Add สินค้า และไปหน้า Checkout
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  // 3. กรอกเฉพาะ First Name และ Last Name (เว้น Postal Code ไว้)
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('[data-test="continue"]').click();

  // 4. Verify ต้องแสดง Error "Postal Code is required" และคงค้างหน้าเดิม
  await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});