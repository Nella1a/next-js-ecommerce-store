import Head from 'next/head';
import { FormProvider, useForm } from 'react-hook-form';
import CheckOutForm from '../components/CheckOutForm';
import { cartStyle, formStyle } from '../components/elements';
import LayoutNoHeader from '../components/LayoutNoHeader';
import OrderSummaryCart from '../components/OrderSummaryCart';
import { disableGrayLayer } from '../hooks';
import { PropsTypeGrayLayer } from './types';

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

export default function CheckOut({
  showGrayLayer,
  setShowGrayLayer,
}: PropsTypeGrayLayer) {
  disableGrayLayer(showGrayLayer, setShowGrayLayer);

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
    <LayoutNoHeader
      showGrayLayer={showGrayLayer}
      setShowGrayLayer={setShowGrayLayer}
    >
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

          <OrderSummaryCart totalPrice={60} />
        </div>
      </section>
    </LayoutNoHeader>
  );
}
