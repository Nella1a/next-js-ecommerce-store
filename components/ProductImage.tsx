import Image from 'next/image';

type Props = {
  src: string;
};

export default function ProductImage(props: Props) {
  return (
    <Image
      src={props.src}
      width="393"
      height="491,5"
      data-test-id="product-image"
    />
  );
}
