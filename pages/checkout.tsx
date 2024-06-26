import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import OrderTotal from '../components/Cart/OrderTotal';
import Payment from '../components/CheckoutForm/Payment';
import Shipping from '../components/CheckoutForm/Shipping';
import CheckoutProductCard from '../components/CheckoutProductCard';
import { checkoutFormStyle, checkoutPageStyle } from '../components/elements';
import LayoutNoHeaderAndFooter from '../components/Layout/LayoutNoHeaderFooter';
import prisma from '../prisma';
import { CartCookieContext } from '../util/context/cookieContext';
import { cleanedProducts } from '../util/database';
import { Cookie, PlantsAndQuantity } from '../util/types';

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

type Props = {
  plants: PlantsAndQuantity[];
};

export default function CheckOut(props: Props) {
  const [toNextStep, setToNextStep] = useState(false);

  const { removeCookie, clearCartCount } = useContext(CartCookieContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const onSubmit = (data: DefaultFormValues): void => {};

  const submitShippingInfosHandler = async (event: any) => {
    const noErrors = await trigger('shipping');
    if (noErrors) {
      setToNextStep(true);
    }
    //  setToNextStep(true);
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

  const ButtonSumitFormValues = () => (
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
          <form
            action="/api"
            css={checkoutFormStyle}
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
              <>
                <Payment
                  register={register}
                  errors={errors}
                  getFieldState={getFieldState}
                />
                <ButtonSumitFormValues />
              </>
            )}
          </form>
        </article>
        <article>
          <div>
            {props.plants?.map((plant) => (
              <CheckoutProductCard plant={plant} />
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

  // query db
  const plants = await prisma.product.findMany({
    where: {
      id: {
        in: plantIds,
      },
    },
  });

  // serialize price
  const plantsSerializedPrice = cleanedProducts(plants);

  // combine db-product info with cookie info:
  const plantsAndQuantity = plantsSerializedPrice.map((plant) => {
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
