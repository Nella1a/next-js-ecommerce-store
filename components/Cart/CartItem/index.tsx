import Link from 'next/link';
import { PlantsAndQuantity } from '../../../pages/types';
import ProductImageSmall from '../../Images/ProductImageSmall';

type Props = {
  plant: PlantsAndQuantity;
};

export default function CartItem({ plant }: Props) {
  const slugName = plant.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      <Link href={`/product/${slugName}`} passHref>
        <ProductImageSmall src={`/image0${plant.id}.jpeg`} />
      </Link>
    </div>
  );
}
