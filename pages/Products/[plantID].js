import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import plantsDatabase from '../../util/PDatabase';

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

export default function SingleAnimal(props) {
  const [quanity, setQuantity] = useState(1);

  function changeQuantity(event) {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setQuantity(value);
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
          <p data-test-id="product-price">price = DatabaseElement</p>
          <p>
            DetailsLorem Ipsum Lorem Ipsum Lorem Ipsum <br />
            `single animal page (dynamic route), id: ${props.plantID}`;
          </p>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              data-test-id="product-quantity"
              type="number"
              min="1"
              max="10"
              value={quanity}
              onChange={changeQuantity}
            />
            <button data-test-id="product-add-to-cart">Add to cart</button>
          </div>
        </article>
      </section>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const plantID = context.query.plantID;
  const machtingplant = plantsDatabase.find((plant) => plantID.id === plant.id);

  console.log('plantID:', plantID);
  console.log('machingplant:', machtingplant);
  console.log(plantsDatabase);
  console.log('ID', plantsDatabase[0].id);
  console.log('MachingID', machtingplant);
  return {
    props: {
      plant: plantsDatabase,
      plantID: plantID,
    },
  };
}
