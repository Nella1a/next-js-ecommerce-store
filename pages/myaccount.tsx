import { GetServerSidePropsContext } from 'next';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import { underConstruction } from '../components/Placeholder';
import prisma from '../prisma';
import { firebaseAdmin } from '../util/firebase-admin-config';

type OrderHistory = {
  id: number;
  quantity: number;
  product_id: number;
  order_id: number;
  product: { title: string };
  order: {
    created_at: string;
    // total_price: number;
    order_status: { name: string };
    payment: { status: { name: string } };
  };
};

type Props = {
  userId: number;
  email: string;
  username: string;
  orders: OrderHistory[];
  orderCount: number;
};

export default function Account({
  userId,
  email,
  username,
  orders,
  orderCount,
}: Props) {
  return (
    <LayoutNoHeader>
      <section css={underConstruction}>
        <article>
          <h1>Page Under Construction!</h1>
          <p>Your email is: {email}</p>
          <p>Your username: {username}</p>
          <p>You've logged into your account successfully.</p>

          <p>Order History</p>
          <p> You have {orderCount} Order(s)</p>
          {orders.length > 0 ? (
            orders.map((item) => {
              return (
                <div style={{ display: 'flex', gap: '.5rem' }} key={item.id}>
                  <p> Product: {item.product.title}</p>
                  <p> Quantity: {item.quantity}</p>
                  <p> OrderId: {item.order_id}</p>
                  <p>Created: {item.order.created_at}</p>
                  <p> OrderStatus: {item.order.order_status.name}</p>
                  <p> PaymentStatus: {item.order.payment.status.name}</p>
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
      const orders = await prisma.orderItem.findMany({
        orderBy: [{ order_id: 'desc' }],
        where: {
          order: {
            user_id: user.id,
          },
        },
        include: {
          product: {
            select: {
              title: true,
            },
          },

          order: {
            select: {
              created_at: true,
              // total_price: true,
              order_status: {
                select: {
                  name: true,
                },
              },
              payment: {
                select: {
                  id: true,
                  status: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      console.log('orderHistory: ', orders);

      // Fetch the count of products
      const orderCount = await prisma.order.count({
        where: {
          user_id: user.id,
        },
      });

      console.log('------> user: ', user);
      //   console.log('----->PAYMENT: ', orders[0].order.payment);

      const ordersSerialized = orders.map((order) => ({
        ...order,
        ...(order.order.created_at = JSON.parse(
          JSON.stringify(order.order.created_at),
        )),
      }));

      return {
        props: {
          userId: user?.id,
          email: user?.email,
          username: user?.username,
          orders: ordersSerialized?.length > 0 ? ordersSerialized : [],
          orderCount: orderCount,
        },
      };
    }
  } catch (error) {
    console.log('----> error: ', error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
