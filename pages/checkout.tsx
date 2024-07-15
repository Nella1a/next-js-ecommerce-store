import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthProvider';
import OrderTotal from '../components/Cart/OrderTotal';
import Payment from '../components/CheckoutForm/Payment';
import Shipping from '../components/CheckoutForm/Shipping';
import CheckoutProductCard from '../components/CheckoutProductCard';
import { checkoutFormStyle, checkoutPageStyle } from '../components/elements';
import LayoutNoHeaderAndFooter from '../components/Layout/LayoutNoHeaderFooter';
import { CartCookieContext } from '../util/context/cookieContext';
import { getPlantsById } from '../util/database';
import { Cookie, Plant } from '../util/types';

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
    cardType: string;
    cardNumber: number;
    nameOnCard: string;
    expiryDate: string;
    securityCode: number;
  };
}

const defaultValues = {};

export default function CheckOut(props: { plants: Plant[] }) {
  const [toNextStep, setToNextStep] = useState(false);
  const { user } = useAuth();
  const { removeCookie, clearCartCount } = useContext(CartCookieContext);
  const { pathname } = Router;

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
    getValues,
  } = useForm<DefaultFormValues>({ defaultValues });

  const onSubmit = async (data: DefaultFormValues): Promise<void> => {
    // check if user is logged in

    data.payment.cardNumber = 0;
    data.payment.securityCode = 0;
    if (user) {
      try {
        const response = await fetch('api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form: data,
          }),
        });

        const result = await response.json();

        if (pathname == '/checkout') {
          removeCookie('cart');
          clearCartCount();
          Router.push('/thankyou');
        }
      } catch (error) {
        alert('Oops, something went wrong.');
      }
    }
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
        removeCookie('cart');
        clearCartCount();
        Router.push('/thankyou');
      }
    }
  }, [isSubmitSuccessful]);

  const ButtonContinueToPayment = () => (
    <div>
      <button type="button" onClick={submitShippingInfosHandler}>
        Continue to payment
      </button>
    </div>
  );

  const ButtonSubmitFormValues = () => (
    <div>
      <button type="submit">Place order</button>
    </div>
  );

  return (
    <LayoutNoHeaderAndFooter>
      <Head>
        <title>Checkout</title>
        <meta name="checkout" content="shipping and payment details" />
      </Head>

      <section css={checkoutPageStyle}>
        <article>
          <form css={checkoutFormStyle} onSubmit={handleSubmit(onSubmit)}>
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
              <>
                <Payment
                  register={register}
                  errors={errors}
                  getFieldState={getFieldState}
                />
                <ButtonSubmitFormValues />
              </>
            )}
          </form>
        </article>
        <article>
          <div>
            {props.plants?.map((plant) => (
              <CheckoutProductCard
                key={`${plant.id}-${plant.price}`}
                plant={plant}
              />
            ))}
          </div>

          <OrderTotal />
        </article>
      </section>
    </LayoutNoHeaderAndFooter>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ plants: Plant[] }>> {
  const cartCookie: Cookie[] = JSON.parse(context.req.cookies.cart || '[]');

  // typescript narrowing
  if (typeof cartCookie === 'undefined') {
    return {
      props: {
        plants: [],
      },
    };
  }

  // get current products in cookie from db by ids
  const plantIds = cartCookie.map((event) => event.id);

  // query db
  const plants = await getPlantsById(plantIds);

  // combine db-product info with cookie info:
  const plantsAndQuantity = plants.map((plant) => {
    return {
      ...plant,
      quantity:
        cartCookie.find((productObject) => plant.id === productObject.id)
          ?.quantity || 0,
    };
  });

  return {
    props: {
      plants: plantsAndQuantity,
    },
  };
}
