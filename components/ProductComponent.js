import { css, Global } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import image05 from '../public/image05.jpeg';
import image06 from '../public/image06.jpeg';
import image07 from '../public/image07.jpeg';
import image08 from '../public/image08.jpeg';

const styleSectionProducts = css`
  display: flex;
  gap: 48px;
  h2 {
    margin: 8px 0;
    font-size: 16px;
  }

  img {
    display: block;
    border: 5px solid grey;
  }
`;

const imgStyle = css`
  display: block;
  border: 5px solid grey;
`;

export default function ProductsComponent(props) {
  return (
    /*   <>
      {console.log('ProductComponent Cookie:', props.cartCookie)}
      {console.log('ProductComponent1 props.plants:', props.plants)}
    </> */
    <section css={styleSectionProducts}>
      {console.log('ProductComponent Cookie:', props.cartCookie)}
      {console.log('ProductComponent1 props.plants:', props.plants)}
      {console.log(typeof props.plants)}
      {props.plants.map((event) => {
        return (
          <div key={`guest-${event.id}`}>
            <Link href={`/Products/${event.id}`} passHref>
              <a data-test-id="ID">
                <Image
                  src={`/image0${event.id}.jpeg`}
                  width="393"
                  height="491,5"
                  alt="succulenten1"
                  css={imgStyle}
                />
              </a>
            </Link>

            <h2>{event.name}</h2>
            <p>{event.price}</p>
          </div>
        );
      })}
    </section>
  );
}

// export async function getServerSideProps(context) {
//   // const plantID = context.query.plantID;

//   const plants = await readPlants();

//   return {
//     props: {
//       plants: plants,
//     },
//   };
// }

// export async function getServerSideProps() {
//   // const plantID = context.query.plantID;

//   const plants = await readPlants();
//   return {
//     props: {
//       plants: plants,
//     },
//   };
// }
