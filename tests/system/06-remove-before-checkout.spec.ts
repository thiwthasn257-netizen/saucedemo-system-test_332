import { test, expect } from '@playwright/test';

test('ST-06: ลบสินค้าออกในหน้า Cart แล้วต้องแสดงจำนวนสินค้าถูกต้องในหน้า Overview', async ({ page }) => {
  // 1. Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 2. Add สินค้า 2 ชิ้น
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // 3. เข้าหน้า Cart และ Remove สินค้าออก 1 ชิ้น (Bike Light)
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 4. กด Checkout และกรอกข้อมูลลูกค้า
  await page.locator('[data-test="checkout"]').click();
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill('50000');
  await page.locator('[data-test="continue"]').click();

  // 5. Verify หน้า Overview ต้องเหลือรายการสินค้าเพียง 1 ชิ้น
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});