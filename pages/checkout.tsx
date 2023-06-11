import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import OrderSummary from '../components/Cart/OrderSummary';
import Payment from '../components/CheckoutForm/Payment';
import Shipping from '../components/CheckoutForm/Shipping';
import { cartStyle, formStyle } from '../components/elements';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import { disableGrayLayer } from '../hooks';

export interface DefaultFormValues {
  shipping: {
    userEmail: string;
    firstName: string;
    lastName: string;
    street: string;
    country: string;
    postalCode: string;
    city: string;
    button: string;
  };
  payment: {
    cartType: string;
    cardNumber: number;
    nameOnCard: string;
    expiryDate: string;
    securityCode: number;
  };
}

const defaultValues = {};

export default function CheckOut({}) {
  const [toNextStep, setToNextStep] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const onSubmit = (data: DefaultFormValues): void => {
    console.log('----> Form Values: ', data);
  };

  const submitShippingInfosHandler = async (event: any) => {
    const noErrors = await trigger('shipping');
    if (noErrors) {
      setToNextStep(true);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      const { pathname } = Router;

      if (pathname == '/checkout') {
        Router.push('/thankyou');
      }
    }
  }, [isSubmitSuccessful]);

  const ButtonContinueToPayment = () => (
    <div>
      <button type="button" onClick={submitShippingInfosHandler}>
        Continue to Shipping
      </button>
    </div>
  );

  const ButtonSumitFormValues = () => (
    <div>
      <button type="submit">Submit</button>
    </div>
  );

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
            <form
              action="/api"
              css={formStyle}
              onSubmit={handleSubmit(onSubmit)}
            >
              {!toNextStep ? (
                <>
                  <Shipping
                    register={register}
                    errors={errors}
                    getFieldState={getFieldState}
                  />
                  <ButtonContinueToPayment />
                </>
              ) : (
                <section>
                  <Payment
                    register={register}
                    errors={errors}
                    getFieldState={getFieldState}
                  />
                  <ButtonSumitFormValues />
                </section>
              )}
            </form>
          </article>
          <OrderSummary />
        </div>
      </section>
    </LayoutNoHeader>
  );
}
