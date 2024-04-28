import { flexStyle } from '../../elements';
import { CheckoutFormChildProps, errorStyle } from '../Shipping';

export default function Payment({
  register,
  errors,
  getFieldState,
}: CheckoutFormChildProps) {
  const dateMonthYearRegex = /^(0[1-9]|1[0-2])\/(2[4-9])$/;

  return (
    <>
      <h2>Payment information</h2>
      <div>
        <label htmlFor="cardType">Card type</label>
        <select
          {...register('payment.cardType', {
            required: 'Payment card is missing.',
          })}
          css={errorStyle(errors.payment?.cardType?.type)}
          data-test-id="checkout-card-type"
          id="cartType"
        >
          {' '}
          <option value="">Select card type</option>
          <option value="visa">Visa</option>
          <option value="mc">Mastercard</option>
          <option value="amex">American Express</option>
        </select>
      </div>
      <div>
        <label htmlFor="cardNumber">Credit card number</label>
        <input
          {...register('payment.cardNumber', {
            required: 'Please enter a valid card number',
            setValueAs: (cnumber) => parseInt(cnumber),
          })}
          aria-invalid={errors.payment?.cardNumber ? 'true' : 'false'}
          placeholder="1234 1234 1234 1234"
          data-test-id="checkout-credit-card"
          id="cardNumber"
          css={errorStyle(errors.payment?.cardNumber?.type)}
        />
        <span>{errors.payment?.cardNumber?.message}</span>
      </div>

      <div>
        <label htmlFor="nameOncard">Name on card</label>
        <input
          {...register('payment.nameOnCard', {
            required: 'Name on card is required',
          })}
          aria-invalid={errors.payment?.nameOnCard ? 'true' : 'false'}
          data-test-id="name-on-card"
          placeholder="Name on card"
          id="nameOnCard"
          css={errorStyle(errors.payment?.nameOnCard?.type)}
        />
        <span>{errors.payment?.nameOnCard?.message}</span>
      </div>

      <div css={flexStyle}>
        <p>
          <label htmlFor="expiration">Expiration</label>
          <input
            // style={{ width: '100%' }}
            {...register('payment.expiryDate', {
              required: 'Please enter a valid date in the MM/YY format.',
              pattern: {
                value: dateMonthYearRegex,
                message: 'Please enter a valid date in the MM/YY format',
              },
              validate: (value, pattern) =>
                value === pattern.payment.expiryDate,
            })}
            css={errorStyle(errors.payment?.expiryDate?.type)}
            placeholder="Expiry Date (MM/YY)"
            data-test-id="checkout-expiration-date"
            id="expiration"
          />
          <span>{errors.payment?.expiryDate?.message}</span>
        </p>
        <p>
          <label htmlFor="securityCode">CVC</label>
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
            placeholder="Security Code (CVC)"
            data-test-id="checkout-security-code"
            id="securityCode"
          />
          <span>{errors.payment?.securityCode?.message}</span>
        </p>
      </div>
    </>
  );
}
