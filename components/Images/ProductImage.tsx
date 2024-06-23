import { css } from '@emotion/react';
import { CldImage } from 'next-cloudinary';
import ImageNotFound from '../Icons/ImageNotFound';

type Props = {
  src: string | null;
  title: string;
};
const img = css`
  max-inline-size: 100%;
`;

export default function ProductImage(props: Props) {
  return (
    <>
      {props.src ? (
        <CldImage
          src={props.src}
          width={393}
          height={491.5}
          data-test-id="product-image"
          alt={`plant-name-is-${props.title}`}
        />
      ) : (
        <ImageNotFound />
      )}
    </>
  );
}
