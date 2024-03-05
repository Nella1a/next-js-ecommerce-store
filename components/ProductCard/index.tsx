import Link from 'next/link';

type Plants = {
  id: number;
  title: string;
  price: number;
  slugName?: string;
};

type Props = {
  plant: Plants;
};

export default function ProductCard(props: Props) {
  const { id, slugName, title, price } = props.plant;

  return (
    <>
      <div>
        {id === 1 && <span>Easy Care</span>}
        {id === 4 && <span>Pet-Friendly</span>}{' '}
        {/*    <Link href="/product/[slug]" as={`/product/${slugName}`}>
          <img src={`/image${id}.jpeg`} alt={`plantName-${title}`} />
        </Link> */}
        <img src={`/image${id}.jpeg`} alt={`plantName-${title}`} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>€{price}</p>
      </div>
    </>
  );
}
