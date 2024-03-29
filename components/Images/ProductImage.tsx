import { css } from '@emotion/react';
import Image from 'next/legacy/image';

type Props = {
  src: string;
  title: string;
};
const img = css`
  max-inline-size: 100%;
`;

export default function ProductImage(props: Props) {
  return (
    <Image
      src={props.src}
      width="393"
      height="491.5"
      data-test-id="product-image"
      layout="responsive"
      alt={`plant-name-is-${props.title}`}
    />
  );
}
