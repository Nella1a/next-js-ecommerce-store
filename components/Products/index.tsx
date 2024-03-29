import { Fragment } from 'react';
import { productCardStyle } from '../elements';
import ProductCard from '../ProductCard';

type Plants = {
  id: number;
  title: string;
  price: number;
  slugName?: string;
};

type Props = {
  plants: Plants[];
};

export default function Products(props: Props) {
  // slug-name
  props.plants.map((plant) => {
    plant.slugName = plant.title.toLowerCase().replace(/\s+/g, '-');
  });

  return (
    <>
      {props.plants.map((plant: Plants) => (
        <article key={`guest-${plant.id}`} css={productCardStyle}>
          <ProductCard plant={plant} />
        </article>
      ))}
    </>
  );
}
