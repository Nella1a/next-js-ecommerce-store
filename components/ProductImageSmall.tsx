import Image from 'next/image';

type Props = {
  src: string;
};

export default function ProductImageSmall(props: Props) {
  return (
    <Image
      src={props.src}
      width="131"
      height="163,4"
      data-test-id="product-image"
    />
  );
}
