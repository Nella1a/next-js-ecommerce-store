import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import BackGImage from '../components/BackGImage';
/* import ButtonCallToAction from '../components/ButtonCallToAction';
 */
import Delivery from '../components/DeliveryInfos';
import { bestSellerStyle, indexTextImageComp } from '../components/elements';
import Footer from '../components/Footer';
import IndexTextImage from '../components/IndexTextImage';
import Layout from '../components/Layout';
/* import PlantComp from '../components/PlantComp';
 */
import ProductsComponent from '../components/ProductComponent';
import { readPlants } from '../util/database.js';

const bgImageHero = css`
  background: no-repeat center url("indexHeroImg.jpeg");
  background-size: cover;
`;

/* const bgImageSale = css`
  background: url("placeholder_sale.jpg") no-repeat right -100px bottom;
  background-size: 1600px;
`;

const buttonCallToActionIndex = css`
  border-radius: 10rem;
` */


type Plants = {
  id: number;
  name: string;
  price: number;
};

type CartCookie = {
  plantId: number;
  name: string;
  price?: number;
};

type Props = {
  plants: Plants[];
  cartCookies: CartCookie[];
};

// get window width
/* const GetScreenSize = () => {

  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    function handleScreenResize(){
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleScreenResize);

    handleScreenResize()

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };

  }, [setScreenSize]);

 return screenSize
}
 */


export default function Home(props: Props) {


  console.log('Index_props.database typeopf:', typeof props.plants);
  console.log('Index_cartCookie: typeof', typeof props.cartCookies);



  return (
    <Layout>
      <Head>
        <title>Plant Love</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackGImage
        firstText="Delivering Plants,"
        secondText="Delivering Happiness!"
        bgImage={bgImageHero}
        />

      <section css={bestSellerStyle}>
        <h2>Best Sellers</h2>
        <div>
          <ProductsComponent plants={props.plants} />
          <ProductsComponent plants={props.plants} />
        </div>
      </section>
      <section>
        <h2>Summer Favorites</h2>
        <div css={indexTextImageComp}>
          <IndexTextImage plants={props.plants} />
        </div>
      </section>

      <Delivery />
      <Footer />







      {/*   <ButtonCallToAction styleButton={styleLargeButton} innerText="Shop Bestsellers" styleb={buttonCallToActionIndex}/> */}


{/*       <BackGImage bgImage={bgImageSale} />
 */}
    {/*   <section css={bestSellerStyle}>
        <h2>Sale</h2>
        <div>
          <ProductsComponent plants={props.plants} />
        </div>
        <ButtonCallToAction styleButton={styleLargeButton} innerText="Shop Sales Items" styleb={buttonCallToActionIndex}/>
      </section> */}
   {/*    <section>
        <Delivery />
      </section>


 */}

    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // read plants from database
  const plants = await readPlants();

  // if the cookie is undefined it is going to return an empty array
  // If it is defined it will return everything inside of it
  const cartCookies = context.req.cookies.cart || '[]';

  const allCartCookies = JSON.parse(cartCookies);
  // console.log('Index_ServerSide_Cookies:', allCartCookies);

  /* return plants via props to frontend */
  return {
    props: {
      plants: plants,
      cartCookies: allCartCookies || null,
    },
  };
};
