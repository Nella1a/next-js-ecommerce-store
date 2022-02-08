import { css, Global } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import image00 from '../public/image00.jpg';
import image02 from '../public/image01.jpg';
import image03 from '../public/image02.jpg';
import image04 from '../public/image04.jpg';
import plantsDatabase from '../util/PDatabase';

const styleSectionProducts = css`
  display: flex;
  gap: 48px;

  h2 {
    margin: 16px 0;
  }
`;

const plants = [
  {
    id: '00',
    name: 'Plant Name',
    type: 'Lorem',
    price: 6000,
    img: 'image00',
  },
  {
    id: '01',
    name: 'Plant Name',
    type: 'Lorem',
    price: 5000,
    img: 'image01',
  },
  {
    id: '02',
    name: 'Plant Name',
    type: 'Lorem',
    img: 'image02',
    price: 3000,
  },
  {
    id: '03',
    name: 'Plant Name',
    type: 'Lorem',
    img: 'image04',
    price: 2000,
  },
];

export default function ProductsComponent(props) {
  return (
    <section css={styleSectionProducts}>
      {plants.map((plant) => {
        return (
          <div key={`guest-${plant.id}`}>
            <Link href={`/Products/${plant.id}`}>
              <a data-test-id="ID">
                <Image src={image03} alt="succulenten1" />
              </a>
            </Link>
            <h2>Text</h2>
            <p>Price: {plant.price}</p>
          </div>
        );
      })}
    </section>
  );
}

// export default function ProductsComponent(props) {
//   console.log(JSON.stringify(props));
//   return (
//     <section css={styleSectionProducts}>
//       <div>
//         {/* creating a dynanmic Link  */}
//         <Link href="/Products">
//           <a data-test-id="ID">
//             <Image src={image00} alt="succulenten1" />
//           </a>
//         </Link>
//         <h2>Text</h2>
//         <p>Price: Price</p>
//       </div>
//       <div>
//         <Link href="/Products">
//           <a data-test-id="ID">
//             <Image src={image03} alt="succulenten1" />
//           </a>
//         </Link>
//         <h2>Text</h2>
//         <p>Price: Price</p>
//       </div>
//       <div>
//         <Link href="/Products">
//           <a data-test-id="ID">
//             <Image src={image02} alt="succulenten1" />
//           </a>
//         </Link>
//         <h2>Text</h2>
//         <p>Price: Price</p>
//       </div>
//       <div>
//         <Link href="/Products">
//           <a data-test-id="ID">
//             <Image src={image04} alt="succulenten1" />
//           </a>
//         </Link>
//         <h2>Text</h2>
//         <p>Price: Price</p>
//       </div>
//     </section>
//   );
// }

export function getServerSideProps() {
  console.log('PlantsDatabaseProducts:', plantsDatabase);

  return {
    props: {
      plant: plantsDatabase,
    },
  };
}
