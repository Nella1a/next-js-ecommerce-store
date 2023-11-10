import Link from 'next/link';
import { PlantsAndQuantity } from '../../../util/types';
import ProductImageSmall from '../../Images/ProductImageSmall';

type Props = {
  plant: PlantsAndQuantity;
};

export default function CartItem({ plant }: Props) {
  return (
    <Link href={`/product/${plant.slug}`} passHref>
      <ProductImageSmall src={`/image${plant.id}.jpeg`} />
    </Link>
  );
}
