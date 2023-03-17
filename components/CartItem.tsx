import Link from 'next/link';
import { PlantsAndQuantity } from '../pages/types';
import ProductImageSmall from './ProductImageSmall';

type Props = {
  plant: PlantsAndQuantity;
};

export default function CartItem({ plant }: Props) {
  const slugName = plant.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      <Link href={`/product/${slugName}`} passHref>
        <a>
          <ProductImageSmall src={`/image0${plant.id}.jpeg`} />
        </a>
      </Link>
    </div>
  );
}
