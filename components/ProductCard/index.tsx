import Image from 'next/image';

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
        <Image
          src={`/image${id}.jpeg`}
          alt={`plantName-${title}`}
          fill
          sizes="90vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div>
        <h3>{title}</h3>
        <p>&euro; {price}</p>
      </div>
    </>
  );
}
