import { css } from '@emotion/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { flexStyle, formStyle } from './elements';
import OrderSummaryCart from './OrderSummaryCart';

const errorStyle = (error: any) => css`
  border: ${error === 'required' ? '2px solid red' : '1px solid lightgray'};
`;

export default function CheckOutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setError,
    getFieldState,
  } = useFormContext();

  const errorArray = Object.entries(errors);
  const { invalid } = getFieldState('email');

  console.log('REGISTER: ', register('email'));
  console.log('FieldState Email: ', getFieldState('email'));
  return (
    <>
      <h2>Contact information </h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: 'Email is required.',
            pattern: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            validate: (value, pattern) => value !== pattern,
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          data-test-id="checkout-email"
          css={errorStyle(errors.email?.type)}
        />
        <p>
          <span>{errors.email?.message}</span>
          <span>
            {!errors.email?.message && invalid && (
              <span>Please provide a valid email</span>
            )}
          </span>
        </p>
      </div>
      <h2>Shipping address </h2>

      <div css={flexStyle}>
        <p>
          <label htmlFor="firstName">
            <span>First name </span>
          </label>
          <input
            {...register('firstName', {
              required: 'First name is required.',
            })}
            aria-invalid={errors.firstName ? 'true' : 'false'}
            data-test-id="checkout-first-name"
            css={errorStyle(errors.firstName?.type)}
          />
          <span>{errors.firstName?.message}</span>
        </p>

        <p>
          <label htmlFor="lastName">
            <span>Last name</span>
          </label>
          <input
            {...register('lastName', {
              required: 'Last name is required.',
            })}
            aria-invalid={errors.lastName ? 'true' : 'false'}
            data-test-id="checkout-last-name"
            css={errorStyle(errors.lastName?.type)}
          />
          <span>{errors.lastName?.message}</span>
        </p>
      </div>
      <div css={flexStyle}>
        <p>
          <label htmlFor="street">
            <span>Street</span>
          </label>
          <input
            {...register('street', {
              required: 'Street is required.',
              min: 1,
            })}
            aria-invalid={errors.street ? 'true' : 'false'}
            data-test-id="checkout-street"
            css={errorStyle(errors.street?.type)}
          />
          <span>{errors.street?.message}</span>
        </p>

        <p>
          <label htmlFor="city">
            <span>City</span>
          </label>
          <input
            {...register('city', {
              required: 'City is required.',
              pattern: /^[a-zA-Z ]+$/,
            })}
            aria-invalid={errors.city ? 'true' : 'false'}
            data-test-id="checkout-city"
            css={errorStyle(errors.city?.type)}
          />
          <span>{errors.city?.message}</span>
        </p>
      </div>
      <div css={flexStyle}>
        <p>
          <label htmlFor="postalCode">
            <span>Postal/ZIP code</span>
          </label>
          <input
            {...register('postalCode', {
              required: 'Postal/ZIP code is required.',
              pattern: /^\d{4}$/,
              setValueAs: (v) => parseInt(v),
            })}
            aria-invalid={errors.postCode ? 'true' : 'false'}
            data-test-id="checkout-postal-code"
            css={errorStyle(errors.postalCode?.type)}
          />
          <span>{errors.postalCode?.message}</span>
        </p>

        <p>
          <label htmlFor="country">
            <span>Country </span>
          </label>
          <input
            {...register('country', {
              required: 'Country is required.',
              pattern: /^[a-zA-Z ]+$/,
            })}
            aria-invalid={errors.country ? 'true' : 'false'}
            data-test-id="checkout-country"
            css={errorStyle(errors.country?.type)}
          />
          <span>{errors.country?.message}</span>
        </p>
      </div>
    </>
  );
}
