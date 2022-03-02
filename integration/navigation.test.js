// import 'expect-puppeteer';
const baseUrl = 'http://localhost:3000';

// E2E: Add to cart, change quantity and remove from cart
test(' Add to cart, change quantity and remove from cart', async () => {
  await page.goto(`${baseUrl}/`);
  // page.setDefaultTimeout(15000);

  await expect(page).toClick('[data-test-id="button-view-all-plants"]');
  await page.waitForNavigation();

  expect(page.url()).toBe(`${baseUrl}/Products`);
  await expect(page).toClick('[data-test-id="data-test-id-5"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/Products/5`);

  // select quantity
  // await page.type('input[type="number"]', '3');
  await page.type('input[type="number"]', 3, { delay: 3 });
  // await page.waitForTimeout(5000);
  /*  await page.type('input[name=selectQuantity]', '5');
  await page.waitForTimeout(3000);
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');
 */

  // ********* add to cart
  // await page.$eval(
  //   '[data-test-id="product-quantity"]',
  //   (el) => (el.value = '5'),
  // );

  /*   await page.focus('[data-test-id="product-quantity"]');
  await page.keyboard.type('5'); */

  // add to cart
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');

  // check cookie
  await expect(page).toMatchElement('span', {
    text: '5',
  });

  // check change of amount in shopping cart item
  // await expect(page).toMatchElement('span', { text: '5' });

  // await selectQuantity.type('name', 5);
  // await page.$eval('input[name=selectQuantity]', (el) => (el.value = 5));

  // click link to shoppingCart link

  // await expect(page).toClick('a', '[data-test-id="header-shoppingCart-link"]');
  await expect(page).toClick('[data-test-id="header-shoppingCart-link"]');

  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/Shoppingcart`);
  await page.waitForTimeout(3000);
  await expect(page).toMatch('cart');
  await expect(page).toClick('[data-test-id="delete item from cart"]');

  await expect(page).toMatchElement(
    '[data-test-id="header-shoppingCart-link"]',
    {
      text: '0',
    },
  );
});

test('Checkout flow, payment page, thank you paget', async () => {
  await page.goto(`${baseUrl}/checkout`);
  expect(page.url()).toBe(`${baseUrl}/checkout`);

  await expect(page).toFill(
    '[data-test-id="checkout-email"]',
    'jane.doe@jane.com',
  );

  await expect(page).toFill('[data-test-id="checkout-first-name"]', 'Jane');
  await expect(page).toFill('[data-test-id="checkout-last-name"]', 'Doe');
  await expect(page).toFill(
    '[data-test-id="checkout-address"]',
    'Ungargasse 1',
  );
  await expect(page).toFill('[data-test-id="checkout-city"]', 'Vienna');
  await expect(page).toFill('[data-test-id="checkout-postal-code"]', '10307');
  await expect(page).toFill('[data-test-id="checkout-country"]', 'Austria');
  // await expect(page).toFill('[data-test-id="checkout-country"]', 'Austria');
  await expect(page).toFill(
    '[data-test-id="checkout-credit-card"]',
    '123 123 123 123',
  );

  await expect(page).toFill('[data-test-id="name-on-card"]', 'Jane Doe');
  await expect(page).toFill(
    '[data-test-id="checkout-expiration-date"]',
    '12/25',
  );
  await expect(page).toFill('[data-test-id="checkout-security-code"]', '123');
  await expect(page).toClick('[data-test-id="checkout-confirm-order"]');
  await page.waitForNavigation();

  expect(page.url()).toBe(`${baseUrl}/thankyou`);
  await page.waitForNavigation();

  await expect(page).toMatch('Thank you for your order');
});
