/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Head from 'next/head';
import Link from 'next/link';
// import { useState } from 'react';
import { flexStyle, formStyle } from '../components/elements';
import Layout from '../components/Layout';
import { deleteCookie } from '../util/cookies';

export default function CheckOut() {
  // const [required, setRequired] = useState(true);

  const required = true;
  function checkform(event) {
    console.log(`So your name is ${event.target.name.value}?`);
    // event.preventDefault();
    deleteCookie('cart');
  }

  return (
    <Layout>
      <Head>
        <title>Checkout</title>
        <meta name="checkout" content="shipping and payment details" />
      </Head>

      <section>
        {' '}
        <h1>Shipping Information</h1>
        <form
          action="/thankyou"
          css={formStyle}
          onSubmit={(event) => checkform(event)}
          method="post"
        >
          <section>
            <h2>Delivery to: </h2>
            <p>
              <strong>
                Required fields are followed by
                <abbr title="required ">*</abbr>
              </strong>
            </p>
            <p>
              <label htmlFor="email">
                <span>E-mail: </span>
                <strong>
                  <abbr title="required">*</abbr>
                </strong>
              </label>
              <input
                id="email"
                type="email"
                name="usermail"
                data-test-id="checkout-email"
                required
              />
            </p>
            <div css={flexStyle}>
              <p>
                <label htmlFor="firstName">
                  <span>First Name: </span>

                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>

                  <input
                    // id="firstName"
                    name="lastName"
                    data-test-id="checkout-first-name"
                    required="required"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="lastName">
                  <span>Last Name </span>
                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  data-test-id="checkout-last-name"
                  required="required"
                />
              </p>
            </div>
            <div css={flexStyle}>
              <p>
                <label htmlFor="adress">
                  <span>Adress: </span>
                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>
                </label>
                <input
                  id="adress"
                  name="adress"
                  data-test-id="checkout-address"
                  required="required"
                />
              </p>
              <p>
                <label htmlFor="city">
                  <span>City: </span>
                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>
                </label>
                <input
                  id="city"
                  name="city"
                  data-test-id="checkout-city"
                  required
                />
              </p>
            </div>
            <div css={flexStyle}>
              <p>
                <label htmlFor="postalCode">
                  <span>Postal Code: </span>
                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>
                </label>
                {/* <input  id="postalCode" name="postalCode" type="number" /> */}
                <input
                  placeholder="Zip Code"
                  title="Please enter a Zip Code"
                  pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
                  // To be friendly to the user, this also permits whitespace before/after the string, which the developer will need to trim serverside.
                  data-test-id="checkout-postal-code"
                  required="required"
                />
              </p>
              <p>
                <label htmlFor="country">
                  <span>Country: </span>
                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>
                </label>
                <input
                  id="country"
                  name="country"
                  data-test-id="checkout-country"
                  required="required"
                />
              </p>
            </div>
          </section>
          <section>
            <h2>Payment information</h2>
            {/* <p>
              <label htmlfor="card">
                <span>Card type:</span>
              </label>
              <select
                id="card"
                name="usercard"
                data-test-id="checkout-credit-card"
                required="required"
              >
                <option value="visa">Visa</option>
                <option value="mc">Mastercard</option>
                <option value="amex">American Express</option>
              </select>
            </p> */}
            <p>
              <label htmlFor="cardNumber">
                <span>Card number:</span>
                <strong>
                  <abbr title="required" aria-label="required">
                    *
                  </abbr>
                </strong>
              </label>
              <input
                type="tel"
                id="cardNumber"
                name="cardnumber"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength="19"
                placeholder="xxxx xxxx xxxx xxxx"
                data-test-id="checkout-credit-card"
                required="required"
              />
            </p>
            <p>
              <label htmlFor="nameOncard">
                <span>Name on card:</span>
                <strong>
                  <abbr title="required" aria-label="required">
                    *
                  </abbr>
                </strong>
              </label>
              <input
                id="nameOncard"
                name="nameOncard"
                data-test-id="name-on-card"
                required="required"
              />
            </p>
            <div css={flexStyle}>
              <p>
                <label htmlFor="expiration">
                  <span>Expiry Date:</span>
                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>
                </label>
                <input
                  id="expiration"
                  required="required"
                  placeholder="MM/YY"
                  pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                  data-test-id="checkout-expiration-date"
                />
              </p>
              <p>
                <label htmlFor="securityCode">
                  <span>Security Code</span>
                  <strong>
                    <abbr title="required" aria-label="required">
                      *
                    </abbr>
                  </strong>
                </label>
                <input
                  id="securityCode"
                  required="required"
                  // pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                  name="securityCode"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  maxLength="3"
                  data-test-id="checkout-security-code"
                />
              </p>
            </div>
            <div css={flexStyle}>
              {/* <Link href="/thankyou">
                <a>
                  <button data-test-id="checkout-confirm-order">
                    Complete payment
                  </button>
                </a>
              </Link> */}
              {!required ? (
                <Link href="/thankyou">
                  <a>
                    <input
                      type="submit"
                      data-test-id="checkout-confirm-order"
                      value="Complete payment"
                    />
                  </a>
                </Link>
              ) : (
                <input
                  type="submit"
                  data-test-id="checkout-confirm-order"
                  value="Complete payment"
                />
              )}
            </div>
            {/* {setRequired(false)} */}
          </section>
        </form>
      </section>
    </Layout>
  );
}
