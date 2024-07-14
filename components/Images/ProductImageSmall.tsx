import { CldImage } from 'next-cloudinary';
import ImageNotFound from '../Icons/ImageNotFound';

// todo: alt text
export default function ProductImageSmall({ src }: { src: string | null }) {
  return (
    <>
      {src ? (
        <CldImage
          src={src}
          width={98.25}
          height={113.875}
          data-test-id="product-image"
          alt="image of a plant"
          crop={'fit'}
        />
      ) : (
        <ImageNotFound />
      )}
    </>
  );
}
