import Link from 'next/link';

type Plants = {
  id: number;
  name: string;
  price: number;
  slugName?: string;
};

type Props = {
  plant: Plants;
};

export default function ProductCard(props: Props) {
  const { id, slugName, name, price } = props.plant;

  return <>
    <div>
      {id === 1 && <span>Easy Care</span>}
      {id === 4 && <span>Pet-Friendly</span>}{' '}
      <Link href="/product/[slug]" as={`/product/${slugName}`}>

        <img src={`/image0${id}.jpeg`} alt={`plantName-${name}`} />

      </Link>
    </div>
    <div>
      <h3>{name}</h3>
      <p>€{price}</p>
    </div>
  </>;
}
