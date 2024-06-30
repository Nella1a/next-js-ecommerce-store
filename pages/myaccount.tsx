import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import { btn, container, h2Section } from '../components/elements';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import prisma from '../prisma';
import { getUsersOrderHistory } from '../util/database';
import { firebaseAdmin } from '../util/firebase-admin-config';
import { Orders, SerializedOrders, UserAccount } from '../util/types';

const userAccount = css`
  ${container};
  margin-top: 8rem;

  button {
    ${btn}
    background-color: var(--color-btn-primary-bg);
    color: var(--text-color);
  }
  article:first-of-type {
    display: flex;
    border-bottom: 1px solid var(--color-grey-6);
    justify-content: space-between;
    padding-bottom: 1rem;

    h1 {
      width: 20rem;
      ${h2Section}
      font-weight: 600;
    }

    div {
      span {
        display: block;
        text-align: right;
      }
      > span:nth-of-type(2) {
        font-size: 2rem;
      }
    }
  }

  article:nth-of-type(2) {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      > div:first-of-type {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
      }
    }
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

  console.log('is logged in: ', isLoggedIn);

  return (
    <LayoutNoHeader>
      <section css={userAccount}>
        <article>
          <h1>
            Welcome Back, <span>{username}</span>
          </h1>
          <div>
            <span>Orders Placed</span>
            <span>{orderCount}</span>
            <button>
              <Link href={'/plants'}>Shop Plants</Link>
            </button>
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
                          {product.title} {product.id}
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
    console.log('\n ERORR: ', error);

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
