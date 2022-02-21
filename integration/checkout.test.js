describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should show Lorem Ipsum message', async () => {
    await expect(page).toMatchElement('p', { text: 'Lorem Ipsum Lorem' });

    await expect(page).toClick('button', { text: 'View All Plants' });
    // await page.waitForTimeout(5000);

    await page.waitForNavigation();
    expect(page.url()).toBe('http://localhost:3000/Products');
  });

  // it('should go to shopping cart ', async () => {
  //   await page.setDefaultTimeout(80000);
  //   await expect(page).toClick('[data-test-id="cart-link] a');
  //   await page.waitForNavigation();
  //   expect(page.url()).toBe('http://localhost:3000/Shoppingcart');
  //   await expect(page.title).toMatchElement({ text: 'Shopping Cart Items' });
  // });
});

// await expect(page).toFillForm('form[name="myForm"]', {
//   firstName: 'James',
//   lastName: 'Bond',
// })
