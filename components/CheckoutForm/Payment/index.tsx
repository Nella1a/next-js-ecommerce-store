import { flexStyle } from '../../elements';
import { CheckoutFormChildProps, errorStyle } from '../Shipping';

export default function Payment({
  register,
  errors,
  getFieldState,
}: CheckoutFormChildProps) {
  const dateMonthYearRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-2])$/;

  return (
    <>
      <h2>Payment information</h2>
      <div>
        <label htmlFor="card">Card type</label>
        <select
          {...register('payment.cartType', {
            required: true,
          })}
          css={errorStyle(errors.payment?.cartType?.type)}
          data-test-id="checkout-credit-card"
        >
          {' '}
          <option value="">select...</option>
          <option value="visa">Visa</option>
          <option value="mc">Mastercard</option>
          <option value="amex">American Express</option>
        </select>
      </div>
      <div css={flexStyle}>
        <p>
          <label htmlFor="cardNumber">Cardnumber</label>
          <input
            {...register('payment.cardNumber', {
              required: 'Please enter a valid card number',
              setValueAs: (cnumber) => parseInt(cnumber),
            })}
            aria-invalid={errors.payment?.cardNumber ? 'true' : 'false'}
            placeholder="xxxx xxxx xxxx xxxx"
            data-test-id="checkout-credit-card"
            css={errorStyle(errors.payment?.cardNumber?.type)}
          />
          <span>{errors.payment?.cardNumber?.message}</span>
        </p>

        <p>
          <label htmlFor="nameOncard">Name on Card</label>
          <input
            {...register('payment.nameOnCard', {
              required: 'Name on card is required',
            })}
            aria-invalid={errors.payment?.nameOnCard ? 'true' : 'false'}
            data-test-id="name-on-card"
            css={errorStyle(errors.payment?.nameOnCard?.type)}
          />
          <span>{errors.payment?.nameOnCard?.message}</span>
        </p>
      </div>

      <div css={flexStyle}>
        <p style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="expiration">Expiry Date</label>
          <input
            style={{ width: '100%' }}
            {...register('payment.expiryDate', {
              required: true,
              pattern: {
                value: dateMonthYearRegex,
                message: 'Please enter a valid date in the MM/YY format',
              },
              validate: (value, pattern) =>
                value === pattern.payment.expiryDate,
            })}
            css={errorStyle(errors.payment?.expiryDate?.type)}
            placeholder="MM/YY"
            data-test-id="checkout-expiration-date"
          />
          <span>{errors.payment?.expiryDate?.message}</span>
        </p>
        <p style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="securityCode">Security Code</label>
          <input
            style={{ width: '100%' }}
            {...register('payment.securityCode', {
              required: true,
              maxLength: {
                value: 3,
                message: 'Security code should not exceed 3 characters.',
              },
              pattern: {
                value: /\d+/,
                message: 'Security code should only include digits.',
              },
              validate: (value, pattern) =>
                value === pattern.payment.securityCode,
            })}
            aria-invalid={errors.payment?.securityCode ? 'true' : 'false'}
            css={errorStyle(errors.payment?.securityCode?.type)}
            data-test-id="checkout-security-code"
          />
          <span>{errors.payment?.securityCode?.message}</span>
        </p>
      </div>
    </>
  );
}
