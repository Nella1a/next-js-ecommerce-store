import { expect, test } from '@playwright/test';

test('test add product to cart', async ({ page }) => {
  // start from the index page
  await page.goto('/');

  // navigate to single product page
  await expect(page.getByText('Bestsellers').first()).toBeVisible();
  await expect(page.getByText('Pilea Peperomioides').first()).toBeVisible();
  await page
    .getByRole('img', { name: 'plantName-Ficus Lyrata' })
    .first()
    .click();

  await expect(page).toHaveURL('/product/ficus-lyrata');
  // await expect(page.getByTestId('product-price')).toHaveValue('€ 9.95');
  await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  await expect(page.getByRole('button', { name: '-' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
  await expect(page.getByTestId('add-quantity')).toContainText('1');

  // add to cart
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.getByTestId('add-quantity')).toContainText('3');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByTestId('cart-count')).toContainText('3');

  // check cart
  await page.getByTestId('cart-link').click();
  await expect(
    page.getByRole('heading', { name: 'Your Cart (3 Products)' }),
  ).toBeVisible();
  await expect(page.getByText('Ficus Lyrata', { exact: true })).toBeVisible();
  await expect(page.getByTestId('add-quantity')).toContainText('3');
  await expect(page.getByRole('button', { name: '-' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
  expect(page.getByText('€ 29.85').all()).toBeTruthy();
  await expect(page.getByRole('button', { name: 'remove' })).toBeVisible();

  // cart total
  await expect(page.getByRole('heading', { name: 'Total' })).toBeVisible();
  await expect(page.getByText('Subtotal')).toBeInViewport();
  await expect(page.getByText('Delivery', { exact: true })).toBeInViewport();
});
