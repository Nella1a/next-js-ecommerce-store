import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { singleProductPageStyle } from '../../components/elements';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import { getPlantById } from '../../util/database.js';

export default function SingleAnimal(props) {
  const [quantity, setQuantity] = useState();
  // const [cartCookie, setCartCookie] = useState();
  const [cartCookie, setCartCookie] = useState(props.cartCookies);

  console.log('SingleAnimalCartCookie', props.cartCookie);

  function cartItems(plantID, quant) {
    /* new quantity and id of item to set in cart cookie  */
    const value = {
      plantID: plantID,
      quantity: quant,
    };

    // read cookie
    const cartCookieValue = getParsedCookie(props.cartCookie) || [];
    console.log('cartCookie', props.cartCookie);

    // update cookie
    let newCookie;
    if (cartCookieValue !== undefined) {
      newCookie = [...cartCookieValue, ...props.cartCookie, value];
      console.log('newCookie:', newCookie);
    } else {
      newCookie = value;
    }
    // 3. set the new value of the cookie
    setCartCookie(newCookie);
    setParsedCookie('cart', newCookie);
  }

  function changeQuantity(event) {
    console.log('event.target:', event.target);
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setQuantity(value);
    console.log('quantitiy:', quantity);
  }
  return (
    <Layout>
      <Head>
        <title>Plant</title>
        <meta name="Plant with a smile" content="View all Plants" />
      </Head>
      <section css={singleProductPageStyle}>
        <Image
          src={`/image0${props.plantID}.jpeg`}
          width="393"
          height="491,5"
          data-test-id="product-image"
        />

        <article>
          <h1>{props.plant.name}</h1>
          <p data-test-id="product-price">{props.plant.price}</p>
          <p>
            {props.plant.description}
            <br />
            {/*     `single animal page (dynamic route), id: ${props.plant.id}`; */}
          </p>
          <div>
            <label htmlFor="product-quantity">
              {/* // input field for quantitiy: */}
              <input
                data-test-id="product-quantity"
                type="number"
                min="1"
                max="10"
                placeholder="select quantity"
                value={quantity}
                onChange={(event) => changeQuantity(event)}
              />
            </label>
            {/* Button add to cart: */}
            <button
              data-test-id="product-add-to-cart"
              onClick={() => cartItems(props.plant.id, quantity)}
            >
              Add to cart
            </button>
          </div>
        </article>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  /* get current plant id from ../product/id */
  const plantID = context.query.plantID;

  /* get the plantID from database */
  const plant = await getPlantById(plantID);

  /* read current cookie; if no cookie return [] */
  const cart = context.req.cookies.cart || '[]';
  const cartCookie = JSON.parse(cart);

  /*  return singlePlant and plantID via props to frontend */
  console.log('Single-Plant_propsplantID:', plant);
  console.log('Single-Plant_ID_FromBrowser:', plantID);
  return {
    props: {
      plant: plant,
      plantID: plantID,
      cartCookie: cartCookie,
    },
  };
}

/*
Ich hole mir hier nur den Article aus der Datenbank den ich brauche.
Dieser wird innerhalb von ServerSideProps geholt und mittels props übergeben.
im Frontend kann ich dan mittels props.name/id/.. auf den Article zugreifen

*/
