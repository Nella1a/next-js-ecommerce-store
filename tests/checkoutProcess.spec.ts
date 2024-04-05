import { expect, test } from '@playwright/test';

test('test checkout process', async ({ page }) => {
  // start from the index page
  await page.goto('/');

  // navigate to single products
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

  //add to cart
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.getByTestId('add-quantity')).toContainText('3');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByTestId('cart-count')).toContainText('3');

  // navigate to cart
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

  // navigate to checkout page
  await page.getByRole('link', { name: 'Go to checkout' }).click();
  await expect(page).toHaveURL('/checkout');

  // fill out contact information
  await expect(
    page.getByRole('heading', { name: 'Contact information', exact: true }),
  ).toBeVisible();
  //  await page.getByPlaceholder('Email').fill('testemail@test.at');
  await page.getByRole('textbox', { name: 'Email' }).fill('testemail@test.at');

  // fill out shipping details
  await expect(
    page.getByRole('heading', { name: 'Shipping address', exact: true }),
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'First name' }).fill('First');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Name');
  await page.getByRole('textbox', { name: 'Address' }).fill('Test Street 1');
  await page.getByRole('textbox', { name: 'City' }).fill('Vienna');
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('1030');
  await page.getByRole('textbox', { name: 'Country' }).fill('Austria');

  await page.getByRole('button', { name: 'Continue to Payment' }).click();

  // fill out payment details
  await page.getByRole('combobox').selectOption('visa');
  await expect(
    page.getByRole('heading', { name: 'Payment information', exact: true }),
  ).toBeVisible();

  await page.getByRole('textbox', { name: 'Card number' }).fill('123123123123');
  await page.getByRole('textbox', { name: 'Name on card' }).fill('First Name');
  await page
    .getByRole('textbox', { name: 'Expiry Date (MM/YY)' })
    .fill('07/25');
  await page.getByRole('textbox', { name: 'Security Code (CVC)' }).fill('123');

  // place order and navigate to thank you page
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page).toHaveURL('/thankyou');
  await expect(
    page.getByRole('heading', { name: 'Thank you for your order' }),
  ).toBeVisible();
});
