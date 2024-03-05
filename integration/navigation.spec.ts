// @ts-check
import { expect, test } from '@playwright/test';

test('test navigation links', async ({ page }) => {
  // start from the index page
  await page.goto('/');

  await expect(
    page.getByRole('link', { name: 'Plants', exact: true }),
  ).toContainText('Plants');

  // navigate to products overview page
  await page.getByRole('link', { name: 'Plants', exact: true }).click();

  // the new url should be "/plants"
  await expect(page).toHaveURL('/plants');

  // the new page should contain an h1 with "Products"
  await expect(
    page.getByRole('heading', { name: 'Products', exact: true }),
  ).toBeVisible();

  // navigate to cart
  await page.getByAltText('shopping cart icon').click();
  await expect(page.getByText('Your cart is currently empty.')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'CONTINUE SHOPPING' }),
  ).toBeVisible();

  // click logo to navigate back to index
  await page.getByAltText('logo she loves plants').click();

  await expect(
    page.getByRole('button', { name: 'VIEW ALL PLANTS' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading').filter({ hasText: 'On Sale' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading').filter({ hasText: 'Best Sellers' }).first(),
  ).toBeVisible();

  await expect(
    page.getByRole('heading').filter({ hasText: 'Summer Favorites' }),
  ).toBeVisible();
});

test('navigate to single product page', async ({ page }) => {
  // start from the index page
  await page.goto('/');

  await expect(page.getByText('Best Sellers').first()).toBeVisible();
  await expect(page.getByText('Pilea Peperomioides').first()).toBeVisible();
  await expect(page.getByText('Pilea Peperomioides')).toHaveCount(4);

  // navigate to single product page
  await page
    .getByRole('img', { name: 'plantName-Pilea Peperomioides' })
    .first()
    .click();

  // the new url should be "/product/pilea-peperomioides"
  await expect(page).toHaveURL('/product/pilea-peperomioides');
  await expect(page.getByText('Pilea Peperomioides')).toBeVisible();
  await expect(page.getByText('€12.95')).toBeVisible();
  await expect(page.getByAltText('Pilea Peperomioides')).toBeVisible();
  await expect(page.getByRole('button', { name: 'ADD TO CART' })).toBeVisible();
  await expect(page.getByRole('button', { name: '-' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
});
