import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import plantsDatabase from '../../util/PDatabase';
import ShoppingCart from '../Shoppingcart';

const styleSingleProductSection = css`
  display: flex;
  gap: 96px;
  width: 100%;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 16px 0;
  }

  article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 600px;
    p {
      margin-bottom: 48px;
    }
  }
`;

function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

function setParsedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export default function SingleAnimal(props) {
  const [quanity, setQuantity] = useState();
  const [plantPrice, setPlantPrice] = useState();
  const [plantId, setPlantId] = useState();
  const [cartCookie, setCartCookie] = useState(props.cartCookies);

  function cartItems(plantID, quantitiy, price) {
    console.log('plantID:', plantID, 'quantitiy:', quantitiy, 'price', price);

    const value = {
      plantID: plantID,
      price: price,
      quanity: quanity,
    };

    // get value of the cookie:
    const cartCookieValue = getParsedCookie(props.cartCookies) || [];
    console.log('cartCookie', cartCookie);

    // ***update the cookie:
    let newCookie;
    if (cartCookieValue !== undefined) {
      newCookie = [...cartCookieValue, ...cartCookie, value];
      console.log('newCookie:', newCookie);
    } else {
      newCookie = value;
    }
    // 3. set the new value of the cookie

    setCartCookie(newCookie);
    setParsedCookie('cart', newCookie);
  }

  console.log('Price:', props.price);
  function changeQuantity(event) {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setQuantity(value);
    console.log('quantitiy:', quanity);
  }

  return (
    <Layout>
      {console.log(props)}
      <Head>
        <title>Plant {props.plant.name}</title>
        <meta name="Plant with a smile" content="View all Plants" />
      </Head>
      <section css={styleSingleProductSection}>
        <Image
          src={`/image${props.plantID}.jpg`}
          width="600"
          height="600"
          data-test-id="product-image"
        />

        <article>
          <h1>Plant Name</h1>
          <p data-test-id="product-price">price: {props.price}</p>
          <p>
            DetailsLorem Ipsum Lorem Ipsum Lorem Ipsum <br />
            `single animal page (dynamic route), id: ${props.plantID}`;
          </p>
          <div>
            <label htmlFor="quantity">Quantity</label>
            {/* // input field for quantitiy: */}
            <input
              data-test-id="product-quantity"
              type="number"
              min="1"
              max="10"
              value={quanity}
              onChange={changeQuantity}
            />
            {/* Button add to cart: */}
            <button
              data-test-id="product-add-to-cart"
              onClick={() => cartItems(props.plantID, quanity, props.price)}
            >
              Add to cart
            </button>
          </div>
        </article>
      </section>
      {/* <ShoppingCart
        quanity={quanity}
        setQuantity={setQuantity}
        plantPrice={plantPrice}
        setPlantPrice={setPlantPrice}
        plantId={plantId}
        setPlantId={setPlantId}
        cartCookie={cartCookie}
        setCartCookie={setCartCookie}
      /> */}
    </Layout>
  );
}

export function getServerSideProps(context) {
  const plantID = context.query.plantID;
  const machtingplantprice = plantsDatabase.find((plant) =>
    plantID === plant.id ? plant.price : false,
  );

  const cookies = context.req.cookies;
  console.log('cookies:', cookies);

  // if the cookie is undefined it is going to return an empty array
  // If it is defined it will return everything inside of it
  const cart = context.req.cookies.cart || '[]';
  console.log('Cookies Shopping Cart:', cart);
  const cartCookies = JSON.parse(cart);

  console.log('plantID:', plantID);
  console.log('machingplantPrice:', machtingplantprice.price);
  console.log('PlantsDatabase:', plantsDatabase);
  // console.log('ID', plantsDatabase[0].id);
  // console.log('MachingID', machtingplant);
  return {
    props: {
      plant: plantsDatabase,
      plantID: plantID,
      price: machtingplantprice.price,
      cartCookies: cartCookies,
    },
  };
}
