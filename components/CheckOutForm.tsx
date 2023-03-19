import { Field } from 'react-final-form';
import { flexStyle, formStyle } from './elements';

export default function CheckOutForm(props: any) {
  console.log('# form', props.form);
  console.log('# values', props.values);

  const composeValidators =
    (...validators: any[]) =>
    (value: string) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined,
      );

  function isRequired(value: string): string | undefined {
    return value ? undefined : 'Required';
  }

  function isValidEmail(value: string): string | undefined {
    return /\S+@\S+\.\S+/.test(value) ? undefined : 'Invalid Email';
  }

  return (
    <form action="/thankyou" css={formStyle} onSubmit={props.handleSubmit}>
      <section>
        <h2>Delivery to: </h2>
        <p>
          <label htmlFor="email">
            <span>E-mail: </span>
          </label>
          <Field
            name="usermail"
            component="input"
            type="email"
            data-test-id="checkout-email"
            validate={composeValidators(isRequired, isValidEmail)}
          />
        </p>
        <div css={flexStyle}>
          <p>
            <label htmlFor="firstName">
              <span>First Name: </span>
            </label>
            <Field
              name="firstName"
              component="input"
              type="text"
              data-test-id="checkout-first-name"
              validate={isRequired}
            />
          </p>
          <p>
            <label htmlFor="lastName">
              <span>Last Name </span>
            </label>
            <Field
              name="lastName"
              component="input"
              type="text"
              data-test-id="checkout-last-name"
              validate={isRequired}
            />
          </p>
        </div>
        <div css={flexStyle}>
          <p>
            <label htmlFor="adress">
              <span>Adress: </span>
            </label>
            <Field
              name="adress"
              component="input"
              type="text"
              data-test-id="checkout-address"
              validate={isRequired}
            />
          </p>
          <p>
            <label htmlFor="city">
              <span>City: </span>
            </label>
            <Field
              name="city"
              component="input"
              type="text"
              data-test-id="checkout-city"
            />
          </p>
        </div>
        <div css={flexStyle}>
          <p>
            <label htmlFor="postalCode">
              <span>Postal Code: </span>
            </label>
            <Field
              name="postalCode"
              component="input"
              type="number"
              data-test-id="checkout-postal-code"
            />
          </p>
          <p>
            <label htmlFor="country">
              <span>Country: </span>
            </label>
            <Field
              name="coutry"
              component="input"
              type="text"
              data-test-id="checkout-country"
            />
          </p>
        </div>
        <input
          type="submit"
          data-test-id="checkout-confirm-order"
          value="Complete payment"
          onClick={props.handleSubmit}
        />{' '}
      </section>
    </form>
  );
}
