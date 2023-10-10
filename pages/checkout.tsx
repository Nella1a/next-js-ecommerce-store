import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/Cart/OrderSummary';
import Payment from '../components/CheckoutForm/Payment';
import Shipping from '../components/CheckoutForm/Shipping';
import CheckoutProductCard from '../components/CheckoutProductCard';
import { checkoutPageStyle, formStyle } from '../components/elements';
import ProductImageSmall from '../components/Images/ProductImageSmall';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import { disableGrayLayer } from '../hooks';
import { CartContext } from '../util/context/cartContext';
import { CartCookieContext } from '../util/context/cookieContext';
import { getPlantsById } from '../util/database';
import { Cookie, PlantsAndQuantity } from './types';

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

type Props = {
  plants: PlantsAndQuantity[];
};

export default function CheckOut(props: Props) {
  const [toNextStep, setToNextStep] = useState(false);

  const { cartItems } = useContext(CartContext);
  const { deleteCookie } = useContext(CartCookieContext);

  useEffect(() => {
    cartItems(props.plants);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const onSubmit = (data: DefaultFormValues): void => {
    deleteCookie('cart');
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
        <h1 css={{ marginTop: '4.5rem' }}>Your Details</h1>{' '}
        <div css={checkoutPageStyle}>
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
          <article>
            <div>
              {props.plants.map((plant) => (
                <CheckoutProductCard plant={plant} />
              ))}
            </div>

            <OrderSummary />
          </article>
        </div>
      </section>
    </LayoutNoHeader>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ plants: PlantsAndQuantity[] }>> {
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

  const plants = await getPlantsById(plantIds);
  // combine db-product info with cookie info:
  console.log('PLANTS: ', plants);

  const plantsAndQuantity = plants.map((plant) => {
    return {
      ...plant,
      quantity:
        cartCookie.find((productObject) => plant.id === productObject.id)
          ?.quantity || 0,
    };
  });

  console.log('plantsAndQuantity', plantsAndQuantity);

  // todo: plants return is: [[{}],[{}]]

  return {
    props: {
      plants: plantsAndQuantity,
    },
  };
}
