import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import {
  btn,
  btnTextColorWhite,
  container,
  h2Section,
} from '../components/elements';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import prisma from '../prisma';
import { getUsersOrderHistory } from '../util/database';
import { firebaseAdmin } from '../util/firebase-admin-config';
import { Orders, SerializedOrders, UserAccount } from '../util/types';

const userAccount = css`
  ${container};
  margin-top: 8rem;

  article:first-of-type {
    padding-bottom: 1rem;

    h1 {
      ${h2Section}
      font-weight: 600;
    }

    div {
      p {
        margin-bottom: 0.5rem;
        font-size: var(--text-lg);
        span:first-of-type {
          font-weight: bold;
        }
      }

      a:link,
      a:visited,
      a:focus,
      a:active {
        display: inline-block;
        ${btn}
        ${btnTextColorWhite}
         background-color: var(--color-btn-primary-bg);
      }
      a:hover {
        background-color: var(--color-btn-hover);
      }
    }

    @media (max-width: 30rem) {
      h1 {
        font-size: var(--text-xxxl);
      }
      div {
        p {
          font-size: var(--text-lg);
        }

        a {
        }
      }
    }
  }

  article:nth-of-type(2) {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    h2 {
      text-align: center;
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      > div:first-of-type {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        border-top: 1px solid var(--color-grey-4);
        padding-top: 0.5rem;
      }
    }
    @media (max-width: 75rem) {
      > div {
        > div:first-of-type {
          gap: 0.8rem;
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }
    @media (max-width: 30rem) {
      margin-top: 2rem;
      gap: 2rem;

      > div {
        > div:first-of-type {
          gap: 0.8rem;
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }

  @media (max-width: 48rem) {
    padding: 0 1.5rem;
  }
`;

const formateDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE');
};

export default function Account({
  email,
  username,
  orderCount,
  orders,
  isLoggedIn,
}: UserAccount) {
  const { logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      logOut()
        .then(() => router.push('/login'))
        .catch();
    }
  }, [isLoggedIn]);

  return (
    <LayoutNoHeader>
      <section css={userAccount}>
        <article>
          <h1>
            Welcome Back, <span>{username}</span>
          </h1>
          <div>
            <p>
              <span>Total Orders: </span>
              <span>{orderCount}</span>
            </p>
            <Link href={'/plants'}>Shop Plants</Link>
          </div>
        </article>
        <article>
          <h2>Your Orders</h2>
          {orders && orders.length > 0 ? (
            orders.map((order) => {
              return (
                <div key={order.order_id}>
                  <h3>Order number: {order.order_id}</h3>
                  <div>
                    <div>
                      <h4>Order date</h4>
                      <p>{formateDate(order.created_at)}</p>
                    </div>
                    <div>
                      <h4>Total</h4>
                      <p>{order.total_price}€</p>
                    </div>
                    <div>
                      <h4>Payment status</h4>
                      <p>{order.payment.status.name}</p>
                    </div>

                    <div>
                      <h4>Order Status</h4>
                      <p>{order.order_status.name}</p>
                    </div>
                    <div>
                      <h4>Products</h4>
                      {order.products.map((product) => (
                        <p key={`${order.order_id}-${product.title}`}>
                          {product.title}
                        </p>
                      ))}
                    </div>
                    <div>
                      <h4>Quantity</h4>
                      {order.products.map((product) => (
                        <p
                          key={`${order.order_id}-${product.title}-${product.quantity}`}
                        >
                          {product.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>You haven't placed any orders yet </>
          )}
        </article>
      </section>
    </LayoutNoHeader>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // verify token
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    // get user
    const user = await prisma.user.findUnique({
      where: {
        user_id_external: decodedToken.uid,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    if (user) {
      const orders = await getUsersOrderHistory(user.id);
      // count orders
      const orderCount = await prisma.order.count({
        where: {
          user_id: user.id,
        },
      });

      // serialize date and price
      const ordersSerialized = orders.map((order) => ({
        ...order,
        ...(order.order.created_at = JSON.parse(
          JSON.stringify(order.order.created_at),
          ...(order.order.total_price = JSON.parse(
            JSON.stringify(order.order.total_price),
          )),
        )),
      }));

      const orderHistory = [] as Orders[];

      ordersSerialized.forEach((orderOrder: SerializedOrders) => {
        // group ordered items by order id
        const orderIndex = orderHistory.findIndex(
          (order) => order.order_id === orderOrder.order_id,
        );

        if (orderIndex === -1) {
          // create new order
          const productDetails = {
            product_id: orderOrder.product_id,
            title: orderOrder.product.title,
            quantity: orderOrder.quantity,
          };

          const orderDetails = {
            order_id: orderOrder.order_id,
            created_at: orderOrder.order.created_at,
            total_price: orderOrder.order.total_price,
            order_status: orderOrder.order.order_status,
            payment: orderOrder.order.payment,
            products: [productDetails],
          };
          orderHistory.push(orderDetails);
        } else {
          // update existing order
          const product = {
            title: orderOrder.product.title,
            product_id: orderOrder.product_id,
            quantity: orderOrder.quantity,
          };
          orderHistory[orderIndex].products.push(product);
        }
      });

      return {
        props: {
          isLoggedIn: true,
          email: user?.email,
          username: user?.username,
          orderCount: orderCount,
          orders: orderHistory,
        },
      };
    }
  } catch (error: any) {
    // user not logged in

    if (error.code === 'auth/id-token-expired') {
      return {
        props: {
          isLoggedIn: false,
        },
      };
    }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
