import { GetStaticProps } from 'next';
import { CldImage } from 'next-cloudinary';
import Head from 'next/head';
import ButtonCallToAction from '../components/Buttons/ButtonCallToAction';
import { bestSellerStyle, summerFavoritesStyle } from '../components/elements';
import SummerFavoritesSection from '../components/Images/SummerFavoritesSections';
import Layout from '../components/Layout';
import Products from '../components/Products';
import prisma from '../prisma';
import IndexHeroImage from '../public/indexHeroImg.jpg';
import { cleanedProducts } from '../util/database';
import { PropsTypePlantsCartCookieLayer } from '../util/types';

const CloudinaryImUrl = () => (
  <CldImage
    src={'eh3naqlztfpedjqd1ldk'}
    alt="HeroImage"
    quality={100}
    fill
    sizes="100vw"
    style={{
      objectFit: 'cover',
    }}
  />
);

export default function Home(props: PropsTypePlantsCartCookieLayer) {
  const buttonInHeroImage = <ButtonCallToAction innerText="View All Plants" />;

  return (
    <Layout
      imgUrl={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1719075598/ztapevp2qkipvlwx6fgf.jpg`}
      buttonInHeroImage={buttonInHeroImage}
    >
      <Head>
        <title>Plant Love</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={bestSellerStyle}>
        <h2>Bestsellers</h2>
        <div>
          <Products plants={props.plants} />
        </div>
      </section>

      <section css={bestSellerStyle}>
        <h2>New Releases</h2>
        <div>
          <Products plants={props.plants} />
        </div>
      </section>

      <section css={summerFavoritesStyle}>
        <h2>Summer Favorites</h2>
        <div>
          <SummerFavoritesSection plants={props.plants} />
        </div>
      </section>
      <section css={bestSellerStyle}>
        <h2>On Sale</h2>
        <div>
          <Products plants={props.plants} />
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await prisma.product.findMany({});
  const plantsSerializedPrice = cleanedProducts(products);

  return {
    props: {
      plants: plantsSerializedPrice,
    },
  };
};
