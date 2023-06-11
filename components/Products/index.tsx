import { Fragment } from 'react';
import { styleSectionProducts } from '../elements';
import ProductCard from '../ProductCard';

type Plants = {
  id: number;
  name: string;
  price: number;
  slugName?: string;
};

type Props = {
  plants: Plants[];
};

export default function Products(props: Props) {
  // slug-name
  props.plants.map((plant) => {
    plant.slugName = plant.name.toLowerCase().replace(/\s+/g, '-');
  });

  return (
    <Fragment>
      {props.plants.map((plant: Plants) => (
        <article key={`guest-${plant.id}`} css={styleSectionProducts}>
          <ProductCard plant={plant} />
        </article>
      ))}
    </Fragment>
  );
}
