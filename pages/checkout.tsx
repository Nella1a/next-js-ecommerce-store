import Head from 'next/head';
import { FormProvider, useForm } from 'react-hook-form';
import OrderSummary from '../components/Cart/OrderSummary';
import CheckOutForm from '../components/CheckoutForm';
import { cartStyle, formStyle } from '../components/elements';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import { disableGrayLayer } from '../hooks';

interface DefaultFormValues {
  shipping: {
    userMail: string;
    firstName: string;
    lastName: string;
    street: string;
    country: string;
    postalCode: string;
    city: string;
    button: boolean;
  };
  payment: {};
}

const defaultValues = {
  shipping: {
    mail: '',
    firstName: '',
    lastName: '',
    street: '',
    country: '',
    postalCode: '',
    city: '',
    button: false,
  },
  payment: {},
};

export default function CheckOut({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setError,
    getFieldState,
  } = useForm<DefaultFormValues>({ defaultValues });

  const onSubmit = (data: DefaultFormValues): void => {
    console.log(data);
  };

  return (
    <LayoutNoHeader>
      <Head>
        <title>Checkout</title>
        <meta name="checkout" content="shipping and payment details" />
      </Head>

      <section>
        <h1>Your Details</h1>{' '}
        <div css={cartStyle}>
          <article>
            <FormProvider
              {...{
                register,
                handleSubmit,
                formState: { errors },
                reset,
                setFocus,
                setError,
                getFieldState,
              }}
            >
              <form
                action="/thankyou"
                css={formStyle}
                onSubmit={handleSubmit(onSubmit)}
              >
                <CheckOutForm />
                {!errors.shipping ? (
                  <div>
                    <input
                      {...register('shipping.button')}
                      type="button"
                      value="Continue to Shipping"
                    />{' '}
                  </div>
                ) : (
                  <div>
                    <input type="submit" value="Submit" />{' '}
                  </div>
                )}
              </form>
            </FormProvider>
          </article>

          <OrderSummary />
        </div>
      </section>
    </LayoutNoHeader>
  );
}
