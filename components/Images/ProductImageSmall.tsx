import Image from 'next/image';

type Props = {
  src: string;
};

// todo: alt text
export default function ProductImageSmall(props: Props) {
  return (
    <Image
      src={props.src}
      width={19.65}
      height={24.575}
      data-test-id="product-image"
      // layout="responsive"
      alt="image of a plant"
    />
  );
}
