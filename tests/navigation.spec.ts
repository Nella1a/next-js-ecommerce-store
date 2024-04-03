// @ts-check
import { expect, test } from '@playwright/test';

test('test navigation links', async ({ page }) => {
  // start from the index page
  await page.goto('/');

  await expect(
    page.getByRole('link', { name: 'Plants', exact: true }),
  ).toContainText('Plants');

  // navigate to products overview page
  await page.getByTestId('products-link').click();
  await expect(page).toHaveURL('/plants');
  await expect(
    page.getByRole('heading', { name: 'All Plants', exact: true }),
  ).toBeVisible();

  // navigate to login page
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL('/login');
  await expect(
    page.getByRole('heading', { name: 'Login to your account', exact: true }),
  ).toBeVisible();

  // navigate to cart
  await page.getByTestId('cart-link').click();
  await expect(page.getByText('Your cart is currently empty.')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Continue Shopping' }),
  ).toBeVisible();

  // navigate to index page
  await page.getByTestId('nav-home-button').click();
  await expect(
    page.getByRole('heading').filter({ hasText: 'Bestsellers' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('heading').filter({ hasText: 'New Releases' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading').filter({ hasText: 'Summer Favorites' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading').filter({ hasText: 'On Sale' }),
  ).toBeVisible();
});

test('navigate to single product page', async ({ page }) => {
  // start from the index page
  await page.goto('/');

  await expect(page.getByText('Bestsellers').first()).toBeVisible();
  await expect(page.getByText('Pilea Peperomioides').first()).toBeVisible();
  await expect(page.getByText('Pilea Peperomioides')).toHaveCount(4);

  // navigate to single product page
  await page
    .getByRole('img', { name: 'plantName-Pilea Peperomioides' })
    .first()
    .click();

  await expect(page).toHaveURL('/product/pilea-peperomioides');
  await expect(
    page.getByRole('heading').filter({ hasText: 'Pilea Peperomioides' }),
  ).toBeVisible();
  // await expect(page.getByTestId('product-price')).toHaveValue('€ 12.95');
  await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  await expect(page.getByRole('button', { name: '-' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
});
