import { css } from '@emotion/react';
import {
  FieldErrors,
  UseFormGetFieldState,
  UseFormRegister,
} from 'react-hook-form';
import { DefaultFormValues } from '../../../pages/checkout';
import { flexStyle } from '../../elements';

export interface CheckoutFormChildProps {
  register: UseFormRegister<DefaultFormValues>;
  errors: FieldErrors<DefaultFormValues>;
  getFieldState: UseFormGetFieldState<DefaultFormValues>;
}

export const errorStyle = (error: boolean | string | undefined) => css`
  border: ${error === 'required' ? '2px solid red' : '1.1px solid #d9d9d9'};
`;

export default function Shipping({
  register,
  errors,
  getFieldState,
}: CheckoutFormChildProps) {
  const { invalid } = getFieldState('shipping.userEmail');

  return (
    <>
      <h2>Contact information </h2>
      <div>
        <label htmlFor="email" />
        <input
          {...register('shipping.userEmail', {
            required: 'Email is required.',
            pattern: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            validate: (value, pattern) => value === pattern.shipping.userEmail,
          })}
          aria-invalid={errors.shipping?.userEmail ? 'true' : 'false'}
          data-test-id="checkout-email"
          css={errorStyle(errors.shipping?.userEmail?.type)}
          placeholder="Email"
        />
        <p>
          <span>{errors.shipping?.userEmail?.message}</span>
          <span>
            {!errors?.shipping?.userEmail?.message && invalid && (
              <span>Please provide a valid email</span>
            )}
          </span>
        </p>
      </div>
      <h2>Shipping address </h2>

      <div css={flexStyle}>
        <p>
          <label htmlFor="firstName" />
          <input
            {...register('shipping.firstName', {
              required: 'First name is required.',
              pattern: {
                value: /[a-zA-Z]+/,
                message: 'only characters',
              },
              validate: (value, pattern) =>
                value === pattern.shipping.firstName,
            })}
            aria-invalid={errors.shipping?.firstName ? 'true' : 'false'}
            data-test-id="checkout-first-name"
            placeholder="First name"
            css={errorStyle(errors.shipping?.firstName?.type)}
          />
          <span>{errors.shipping?.firstName?.message}</span>
        </p>

        <p>
          <label htmlFor="lastName" />
          <input
            {...register('shipping.lastName', {
              required: 'Last name is required.',
              pattern: {
                value: /[a-zA-Z]+/,
                message: 'only characters',
              },
              validate: (value, pattern) => value === pattern.shipping.lastName,
            })}
            aria-invalid={errors.shipping?.lastName ? 'true' : 'false'}
            placeholder="Last name"
            data-test-id="checkout-last-name"
            css={errorStyle(errors.shipping?.lastName?.type)}
          />
          <span>{errors.shipping?.lastName?.message}</span>
        </p>
      </div>
      <div>
        <p>
          <label htmlFor="street"></label>
          <input
            {...register('shipping.street', {
              required: 'Address is required.',
              min: 1,
            })}
            aria-invalid={errors.shipping?.street ? 'true' : 'false'}
            data-test-id="checkout-street"
            placeholder="Address"
            css={errorStyle(errors.shipping?.street?.type)}
          />
          <span>{errors.shipping?.street?.message}</span>
        </p>
      </div>
      <div css={flexStyle}>
        <p>
          <label htmlFor="city" />
          <input
            {...register('shipping.city', {
              required: 'City is required.',
              pattern: /[a-zA-Z]+/,
              validate: (value, pattern) => value === pattern.shipping.city,
            })}
            aria-invalid={errors.shipping?.city ? 'true' : 'false'}
            data-test-id="checkout-city"
            placeholder="City"
            css={errorStyle(errors.shipping?.city?.type)}
          />
          <span>{errors.shipping?.city?.message}</span>
        </p>

        <p>
          <label htmlFor="postalCode" />
          <input
            {...register('shipping.postalCode', {
              required: 'Postal/ZIP code is required.',
              pattern: /^\d{4}$/,
              validate: (value, pattern) =>
                value === pattern.shipping.postalCode,

              setValueAs: (v) => parseInt(v),
            })}
            aria-invalid={errors.shipping?.postalCode ? 'true' : 'false'}
            data-test-id="checkout-postal-code"
            placeholder="Zip Code"
            css={errorStyle(errors.shipping?.postalCode?.type)}
          />
          <span>{errors.shipping?.postalCode?.message}</span>
        </p>

        <p>
          <label htmlFor="country" />

          <input
            {...register('shipping.country', {
              required: 'Country is required.',
              pattern: /^[a-zA-Z ]+/,
            })}
            aria-invalid={errors.shipping?.country ? 'true' : 'false'}
            data-test-id="checkout-country"
            placeholder="Country"
            css={errorStyle(errors.shipping?.country?.type)}
          />
          <span>{errors.shipping?.country?.message}</span>
        </p>
      </div>
    </>
  );
}
