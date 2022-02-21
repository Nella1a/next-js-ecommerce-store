// import 'expect-puppeteer';

describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should show the home page message', async () => {
    await expect(page).toMatchElement('p', { text: 'Lorem' });
  });
});

// const baseUrl = 'http://localhost:3001';
// test('assert the page is loading, basic test functionality is there', async () => {
//   await page.goto(`${baseUrl}/`);
//   // Expect that the page URL will be correct
//   expect(page.url()).toBe(`${baseUrl}/`);
//   // Match any page content
//   await expect(page).toMatch('Love Plants');
// });

// ***********************************
// const browser = await puppeteer.launch({ headless: false });
// const page = await browser.newPage();

// Expect that the page URL will be correct

// Match h1 on page
// await expect(page).toMatchElement('h1', { text: 'Best Sellers' });

// // Click on element and wait for navigation
// await expect(page).toClick('[data-test-id="button-view-all-plants"] a');
// await page.waitForNavigation();
// // Expect that the page URL will be correct
// expect(page.url()).toBe(`${baseUrl}/Products`);
