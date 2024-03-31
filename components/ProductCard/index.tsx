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
        {/* {id === 1 && <span>Easy Care</span>}
        {id === 4 && <span>Pet-Friendly</span>}{' '} */}
        <Image
          src={`/image${id}.jpg`}
          alt={`plantName-${title}`}
          //fill
          //sizes="90vw"
          // style={{ objectFit: 'cover' }}

          style={{
            width: '100%',
            height: 'auto',
          }}
          width={440}
          height={550}
        />
      </div>
      <div>
        <span>{title}</span>
        <span>&euro; {price}</span>
      </div>
    </>
  );
}
