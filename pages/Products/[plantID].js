import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  singleProductPageStyle,
  singleProductPageStyleSecondArticle,
} from '../../components/elements';
import Layout from '../../components/Layout';
import { setParsedCookie } from '../../util/cookies';
import { getPlantById } from '../../util/database.js';
import { addAndUpdateQuantityInCookie } from '../../util/functions';

export default function SingleProduct(props) {
  const [quantity, setQuantity] = useState(1);
  const [cartCookie, setCartCookie] = useState(props.cartCookie);
  const [updateCQuantity,SetUpdateCQuantity] = useState()

    console.log("cartcookieSTART: ", cartCookie)
    console.log("props.cartcookie: ", props.cartCookies)
/*
   useEffect(() => {
      setCartCookie(props.cartCookies)

    })
 */

/*     useEffect(() => {
        const add = true
        const newCookie = addAndUpdateQuantityInCookie(
          props.plantID,
          quantity,
          props.cartCookie,
          add

        );
        // setCartCookie(newCookie);
        setParsedCookie('cart', newCookie);
    },[quantity]) */




    function updateCartQuantity() {
      const add = true
      console.log("type quqntity: ", typeof(quantity))
      const updateCookie = addAndUpdateQuantityInCookie(
        props.plantID,
        Number(quantity),
        cartCookie,
        add

      );
      console.log("newCookie: ", updateCookie)
      setCartCookie(updateCookie);
      setParsedCookie('cart', updateCookie);
      }


  // update state variable: quantity
  function changeQuantity(event) {
    const min = event.target.min
    const max = event.target.max
    let value = event.target.value
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setQuantity(Number(value));
  }




  return (
    <Layout>
      <Head>
        <title>Plant</title>
        <meta name="Plant with a smile" content="View all Plants" />
      </Head>
      <section css={singleProductPageStyle}>
        <div>
          <p>x</p>
          <p>x</p>
          <p>x</p>
        </div>
        <div>
          <Image
            src={`/image0${props.plantID}.jpeg`}
            width="393"
            height="491,5"
            data-test-id="product-image"
          />

          <article>
            <h1>{props.plant.name}</h1>
            <p data-test-id="product-price"> €{props.plant.price}</p>
            <p>{props.plant.description}</p>

            <label htmlFor="product-quantity">
              {' '}
              Select quantity
              <input
                name="selectQuantity"
                data-test-id="product-quantity"
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(event) => changeQuantity(event)}
              />
            </label>

           <button
              data-test-id="product-add-to-cart"
              onClick={updateCartQuantity}
            >
              Add to cart
            </button>

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
  console.log('plantID', plantID);
  console.log("typeof plantID", typeof(plantID))

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
