import { GetServerSidePropsContext } from 'next';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import { underConstruction } from '../components/Placeholder';
import prisma from '../prisma';
import { firebaseAdmin } from '../util/firebase-admin-config';

type SerializedOrders = {
  quantity: number;
  product_id: number;
  order_id: number;
  product: { [key: string]: string | number };
  order: Orders;
};

type Orders = {
  order_id: number;
  created_at: string;
  total_price: string;
  order_status: { name: string };
  payment: { status: { name: string } };
  products: { [key: string]: string | number }[];
};

type UserAccount = {
  userId: number;
  email: string;
  username: string;
  orderCount?: number;
  orders?: Orders[];
};

const formateDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE');
};

export default function Account({
  userId,
  email,
  username,
  orderCount,
  orders,
}: UserAccount) {
  return (
    <LayoutNoHeader>
      <section css={underConstruction}>
        <article>
          <h1>Page Under Construction!</h1>
          <p>Your email is: {email}</p>
          <p>Your username: {username}</p>
          <p>Order History</p>
          <p> You have {orderCount} Order(s)</p>
          {orders && orders.length > 0 ? (
            orders.map((order) => {
              return (
                <div
                  style={{ display: 'flex', gap: '.5rem' }}
                  key={order.order_id}
                >
                  <p>Order number: {order.order_id}</p>
                  <p>Order date: {formateDate(order.created_at)}</p>
                  <p>Total: {order.total_price}</p>
                  <p> Order status: {order.order_status.name}</p>
                  <p> Payment status: {order.payment.status.name}</p>
                  <hr></hr>
                  <div>
                    <h4>Products</h4>
                    {order.products.map((product) => (
                      <>
                        <p>{product.title}</p>
                        <p>{product.id}</p>
                      </>
                    ))}
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
              id: true,
              created_at: true,
              total_price: true,
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
          const orderDetails = {
            order_id: orderOrder.order_id,
            created_at: orderOrder.order.created_at,
            total_price: orderOrder.order.total_price,
            order_status: orderOrder.order.order_status,
            payment: orderOrder.order.payment,
            products: [orderOrder.product],
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
          userId: user?.id,
          email: user?.email,
          username: user?.username,
          orderCount: orderCount,
          orders: orderHistory,
        },
      };
    }
  } catch (error) {
    // user not logged in
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
