import { test, expect } from '@playwright/test';

test('ST-05: ตรวจสอบการเรียงลำดับราคาจากน้อยไปมาก (Price Low to High)', async ({ page }) => {
  // 1. Login เข้าสู่ระบบ
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  // 2. เลือกการเรียงลำดับเป็น Price (low to high)
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // 3. ดึงราคาทั้งหมดบนหน้าจอมาเก็บในตัวแปร
  const priceElements = page.locator('.inventory_item_price');
  const count = await priceElements.count();
  const prices: number[] = [];

  for (let i = 0; i < count; i++) {
    const priceText = await priceElements.nth(i).innerText();
    // แปลงข้อความราคา เช่น "$7.99" ให้เป็นตัวเลข 7.99
    const priceValue = parseFloat(priceText.replace('$', ''));
    prices.push(priceValue);
  }

  // 4. Verify ว่าราคาทั้งหมดเรียงจากน้อยไปมากจริง (Ascending Order)
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});