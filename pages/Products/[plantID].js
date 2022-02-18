import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  singleProductPageStyle,
  singleProductPageStyleSecondArticle,
} from '../../components/elements';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import { getPlantById } from '../../util/database.js';

export default function SingleAnimal(props) {
  const [quantity, setQuantity] = useState(1);
  const [cartCookie, setCartCookie] = useState(props.cartCookies);

  console.log('Sprops.cartCookie', props.cartCookie);

  function cartItems(id, quant) {
    console.log('id & quantitit:', id, quant);
    /* new quantity and id of item to set in cart cookie  */
    const value = {
      plantID: id,
      quantity: quant,
    };

    let newCookie;
    // check if a cookie is set
    if (props.cartCookie !== '[]') {
      // check if plant is aready in cart
      const checkifPlantIsAlreadyInCart = props.cartCookie.some(
        (element) => element.plantId === id,
      );

      // if plant is aready in cart update quantity of plant; else: add new plant to cookie
      if (checkifPlantIsAlreadyInCart) {
        const newCartCookie = props.cartCookie.map((element) => {
          if (element.plantId === id) {
            element.quantity = element.quantity + quant;
          }
          return element;
        });

        newCookie = [...newCartCookie];
      } else {
        newCookie = [...props.cartCookie, { plantId: id, quantity: quant }];
      }
    } else {
      newCookie = value;
    }
    // set the new value of the cookie
    setCartCookie(newCookie);
    setParsedCookie('cart', newCookie);
  }

  function changeQuantity(event) {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setQuantity(value);
  }
  return (
    <Layout>
      <Head>
        <title>Plant</title>
        <meta name="Plant with a smile" content="View all Plants" />
      </Head>
      <section css={singleProductPageStyle}>
        <div>
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
            {/* <div> */}
            <label htmlFor="product-quantity">
              {' '}
              Select quantity
              {/* // input field for quantitiy: */}
              <input
                data-test-id="product-quantity"
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(event) => changeQuantity(event)}
                YX
              />
            </label>
            {/* Button add to cart: */}
            <button
              data-test-id="product-add-to-cart"
              onClick={() => cartItems(props.plant.id, quantity)}
            >
              Add to cart
            </button>
            {/* </div> */}
          </article>
        </div>
        <article css={singleProductPageStyleSecondArticle}>
          <Link href="/Products">
            <a>
              <button>Back To All Prouducts</button>
            </a>
          </Link>
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
