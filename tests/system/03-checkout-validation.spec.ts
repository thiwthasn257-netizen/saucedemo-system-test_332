import { test, expect } from '@playwright/test';

test('ST-03: Checkout ต้องตรวจสอบข้อมูลที่จำเป็น', async ({ page }) => {

  // =====================================================

  // Login

  // =====================================================

  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // =====================================================

  // Add Product

  // =====================================================

  await page

    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')

    .click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // =====================================================

  // Cart

  // =====================================================

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  // =====================================================

  // Checkout

  // =====================================================

  await page.locator('[data-test="checkout"]').click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // =====================================================

  // ไม่กรอกข้อมูล แล้วกด Continue

  // =====================================================

  await page.locator('[data-test="continue"]').click();

  // =====================================================

  // Validation Result

  // =====================================================

  await expect(page.locator('[data-test="error"]'))

    .toContainText('First Name is required');

  // ต้องยังอยู่หน้า Checkout Step One

  await expect(page).toHaveURL(/checkout-step-one\.html/);

});
