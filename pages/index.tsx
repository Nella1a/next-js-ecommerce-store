import { GetStaticProps } from 'next';
import Head from 'next/head';
import ButtonCallToAction from '../components/Buttons/ButtonCallToAction';
import { bestSellerStyle, summerFavoritesStyle } from '../components/elements';
import SummerFavoritesSection from '../components/Images/SummerFavoritesSections';
import Layout from '../components/Layout';
import Products from '../components/Products';
import { getAllProducts } from '../util/database';
import { PropsTypePlantsCartCookieLayer } from '../util/types';

export default function Home(props: PropsTypePlantsCartCookieLayer) {
  const buttonInHeroImage = <ButtonCallToAction innerText="View All Plants" />;

  return (
    <Layout
      imgUrl={`plantStore/v81giaflb1ywkppfbj4v`}
      buttonInHeroImage={buttonInHeroImage}
      firstText="Delivering plants,"
      secondText="delivering happiness!"
      thirdText="Shop your favorite plants"
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
  const products = await getAllProducts();

  return {
    props: {
      plants: products,
    },
  };
};
