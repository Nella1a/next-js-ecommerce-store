import { expect, test } from '@playwright/test';

const plants = [];

test('should navigate to the products page', async ({ page }) => {
  // start form the index page
  await page.goto('/');

  // get link
  const plantsLink = page.getByRole('link', { name: 'Plants' });
  await plantsLink.click();

  //find element with the text Plants and click on it
  // await page.click('text=Plants');

  // the new url should be "/products"
  await expect(page).toHaveURL('/products');

  // the new page should contain an h1 with "Products"
  await expect(page.locator('h1')).toContainText('Products');
});
