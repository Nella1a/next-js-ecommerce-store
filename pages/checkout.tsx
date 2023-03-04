import Head from 'next/head';
import Link from 'next/link';
import { flexStyle, formStyle } from '../components/elements';
import Layout from '../components/Layout';
import { disableGrayLayer } from '../hooks';
import { deleteCookie } from '../util/cookies';
import { PropsTypeGrayLayer } from './types';

export default function CheckOut({showGrayLayer, setShowGrayLayer}: PropsTypeGrayLayer ) {


  disableGrayLayer(showGrayLayer, setShowGrayLayer)

  const required = true;
  const checkform = (event: React.SyntheticEvent): void => {
    event.preventDefault()

    deleteCookie('cart');
  }

  return (
    <Layout
    showGrayLayer={showGrayLayer}
    setShowGrayLayer={setShowGrayLayer}
    >
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
          onSubmit={checkform}
          method="post"
        >
          <section>
            <h2>Delivery to: </h2>
            <p>
              <label htmlFor="email">
                <span>E-mail: </span>
              </label>
              <input
                id="email"
                type="email"
                name="usermail"
                data-test-id="checkout-email"
                required={required}
              />
            </p>
            <div css={flexStyle}>
              <p>
                <label htmlFor="firstName">
                  <span>First Name: </span>
                  <input
                    // id="firstName"
                    name="lastName"
                    data-test-id="checkout-first-name"
                    required={required}
                  />
                </label>
              </p>
              <p>
                <label htmlFor="lastName">
                  <span>Last Name </span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  data-test-id="checkout-last-name"
                  required={required}
                />
              </p>
            </div>
            <div css={flexStyle}>
              <p>
                <label htmlFor="adress">
                  <span>Adress: </span>
                </label>
                <input
                  id="adress"
                  name="adress"
                  data-test-id="checkout-address"
                  required={required}
                />
              </p>
              <p>
                <label htmlFor="city">
                  <span>City: </span>
                </label>
                <input
                  id="city"
                  name="city"
                  data-test-id="checkout-city"
                  required={required}
                />
              </p>
            </div>
            <div css={flexStyle}>
              <p>
                <label htmlFor="postalCode">
                  <span>Postal Code: </span>
                </label>
                {/* <input  id="postalCode" name="postalCode" type="number" /> */}
                <input
                  placeholder="Zip Code"
                  title="Please enter a Zip Code"
                  pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
                  // To be friendly to the user, this also permits whitespace before/after the string, which the developer will need to trim serverside.
                  data-test-id="checkout-postal-code"
                  required={required}
                />
              </p>
              <p>
                <label htmlFor="country">
                  <span>Country: </span>
                </label>
                <input
                  id="country"
                  name="country"
                  data-test-id="checkout-country"
                  required={required}
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
              </label>
              <input
                type="tel"
                id="cardNumber"
                name="cardnumber"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength={19}
                placeholder="xxxx xxxx xxxx xxxx"
                data-test-id="checkout-credit-card"
                required={required}
              />
            </p>
            <p>
              <label htmlFor="nameOncard">
                <span>Name on card:</span>
              </label>
              <input
                id="nameOncard"
                name="nameOncard"
                data-test-id="name-on-card"
                required={required}
              />
            </p>
            <div css={flexStyle}>
              <p>
                <label htmlFor="expiration">
                  <span>Expiry Date:</span>
                </label>
                <input
                  id="expiration"
                  required={required}
                  placeholder="MM/YY"
                  pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                  data-test-id="checkout-expiration-date"
                />
              </p>
              <p>
                <label htmlFor="securityCode">
                  <span>Security Code</span>
                </label>
                <input
                  id="securityCode"
                  required={true}
                  // pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                  name="securityCode"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  maxLength={3}
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
