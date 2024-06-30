import Link from 'next/link';
import { Plant } from '../../../util/types';
import ProductImageSmall from '../../Images/ProductImageSmall';

export default function CartItem({ plant }: { plant: Plant }) {
  return (
    <Link href={`/product/${plant.slug}`} passHref>
      {plant.img_url && <ProductImageSmall src={plant.img_url[0].url} />}
    </Link>
  );
}
