import { css } from '@emotion/react';
import { useState } from 'react';
import { flexStyle, formStyle } from './elements';

export default function CheckOutForm({
  register,
  handleSubmit,
  errors,
  setFocus,
}: any) {
  const errorArray: [string, { [key: string]: string }][] =
    Object.entries(errors);

  console.log('---A: ', errors.email);

  return (
    <section>
      <h2>Delivery to: </h2>
      <p>
        <label htmlFor="email">
          <span>Email </span>
        </label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          data-test-id="checkout-email"
          css={errors.email?.type === 'required' && { border: '1px solid red' }}
        />
      </p>
      <div css={flexStyle}>
        <p>
          <label htmlFor="firstName">
            <span>First Name: </span>
          </label>
          <input
            {...register('firstName', {
              required: 'first name is required',
            })}
            aria-invalid={errors.firstName ? 'true' : 'false'}
            data-test-id="checkout-first-name"
            css={
              errors.firstName?.type === 'required' && {
                border: '1px solid red',
              }
            }
          />
        </p>

        <p>
          <label htmlFor="lastName">
            <span>Last Name </span>
          </label>
          <input
            {...register('lastName', {
              required: 'Last name is required',
            })}
            aria-invalid={errors.lastName ? 'true' : 'false'}
            data-test-id="checkout-last-name"
            css={
              errors.lastName?.type === 'required' && {
                border: '1px solid red',
              }
            }
          />
        </p>
      </div>
      <div css={flexStyle}>
        <p>
          <label htmlFor="street">
            <span>Street: </span>
          </label>
          <input
            {...register('street', {
              required: 'Street name is required.',
              min: 1,
            })}
            aria-invalid={errors.street ? 'true' : 'false'}
            data-test-id="checkout-street"
            css={
              errors.street?.type === 'required' && { border: '1px solid red' }
            }
          />
        </p>

        <p>
          <label htmlFor="city">
            <span>City: </span>
          </label>
          <input
            {...register('city', {
              required: 'City is required.',
              pattern: /^[a-zA-Z ]+$/,
            })}
            aria-invalid={errors.city ? 'true' : 'false'}
            data-test-id="checkout-city"
            css={
              errors.city?.type === 'required' && { border: '1px solid red' }
            }
          />
        </p>
      </div>
      <div css={flexStyle}>
        <p>
          <label htmlFor="postalCode">
            <span>Postal Code: </span>
          </label>
          <input
            {...register('postalCode', {
              required: 'Postal/ZIP code is required.',
              pattern: /^\d{4}$/,
            })}
            aria-invalid={errors.postCode ? 'true' : 'false'}
            data-test-id="checkout-postal-code"
            css={
              errors.postalCode?.type === 'required' && {
                border: '1px solid red',
              }
            }
          />
        </p>

        <p>
          <label htmlFor="country">
            <span>Country: </span>
          </label>
          <input
            {...register('country', {
              required: 'Country name is required.',
              pattern: /^[a-zA-Z ]+$/,
            })}
            aria-invalid={errors.country ? 'true' : 'false'}
            data-test-id="checkout-country"
            css={
              errors.country?.type === 'required' && { border: '1px solid red' }
            }
          />
        </p>
      </div>
      <div>
        {errorArray.length > 0 && (
          <ul>
            {errorArray.map(([name, { message }]) => (
              <li key={name} css={{ color: 'red' }}>
                {message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
