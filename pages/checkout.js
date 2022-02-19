import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { flexStyle, formStyle } from '../components/elements';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';

export default function CheckOut() {
  return (
    <Layout>
      <Head>
        <title>Checkout</title>
        <meta name="checkout" content="shipping and payment details" />
      </Head>

      <section>
        {' '}
        <h1>Shipping Information</h1>
        <form css={formStyle} onsubmit="event.preventDefault()">
          <section>
            <h2>Delivery to: </h2>
            <p>
              Required fields are followed by{' '}
              <strong>
                <abbr title="required">*</abbr>
              </strong>
              .
            </p>
            <p>
              <label htmlfor="mail">
                <span>E-mail: </span>
                <strong>
                  <abbr title="required">*</abbr>
                </strong>
              </label>
              <input type="email" id="mail" name="usermail" />
            </p>
            <div css={flexStyle}>
              <p>
                <label htmlfor="firstName">
                  <span>First Name: </span>
                </label>

                <strong>
                  <abbr title="required">*</abbr>
                </strong>

                <input id="firstName" name="lastName" />
              </p>
              <p>
                <label htmlfor="lastName">
                  <span>Last Name </span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <input type="email" id="lastName" name="lastName" />
              </p>
            </div>
            <div css={flexStyle}>
              <p>
                <label htmlfor="adress">
                  <span>Adress: </span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <input id="adress" name="adress" />
              </p>
              <p>
                <label htmlfor="city">
                  <span>City: </span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <input id="city" name="city" />
              </p>
            </div>
            <div css={flexStyle}>
              <p>
                <label htmlfor="postalCode">
                  <span>Postal Code: </span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                {/* <input  id="postalCode" name="postalCode" type="number" /> */}
                <input
                  placeholder="Zip Code"
                  title="Please enter a Zip Code"
                  pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
                  // To be friendly to the user, this also permits whitespace before/after the string, which the developer will need to trim serverside.
                />
              </p>
              <p>
                <label htmlfor="country">
                  <span>Country: </span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <input id="country" name="country" />
              </p>
            </div>
          </section>
          <section>
            <h2>Payment information</h2>
            <p>
              <label htmlfor="card">
                <span>Card type:</span>
              </label>
              <select id="card" name="usercard">
                <option value="visa">Visa</option>
                <option value="mc">Mastercard</option>
                <option value="amex">American Express</option>
              </select>
            </p>
            <p>
              <label htmlfor="cardNumber">
                <span>Card number:</span>
                <strong>
                  <abbr title="required">*</abbr>
                </strong>
              </label>
              <input
                type="tel"
                id="cardNumber"
                name="cardnumber"
                inputmode="numeric"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                maxlength="19"
                placeholder="xxxx xxxx xxxx xxxx"
              />
            </p>
            <p>
              <label htmlfor="nameOncard">
                <span>Name on card:</span>
                <strong>
                  <abbr title="required">*</abbr>
                </strong>
              </label>
              <input id="nameOncard" name="nameOncard" />
            </p>
            <div css={flexStyle}>
              <p>
                <label htmlfor="expiration">
                  <span>Expiry Date:</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <input
                  id="expiration"
                  required="true"
                  placeholder="MM/YY"
                  pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                />
              </p>
              <p>
                <label htmlfor="securityCode">
                  <span>Security Code</span>
                  <strong>
                    <abbr title="required">*</abbr>
                  </strong>
                </label>
                <input
                  id="securityCode"
                  required="true"
                  pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                  name="securityCode"
                  autocomplete="cc-csc"
                  inputmode="numeric"
                  maxlength="3"
                />
              </p>
            </div>
            <div css={flexStyle}>
              <Link href="/thankyou">
                <a>
                  <button>Complete payment</button>
                </a>
              </Link>
            </div>
          </section>
        </form>
      </section>
    </Layout>
  );
}
