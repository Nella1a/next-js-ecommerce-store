import { CldImage } from 'next-cloudinary';
import { Plant } from '../../util/types';
import ImageNotFound from '../Icons/ImageNotFound';

export default function ProductCard(props: { plant: Plant }) {
  const { title, price, img_url } = props.plant;

  return (
    <>
      <div>
        {/* {id === 1 && <span>Easy Care</span>}
        {id === 4 && <span>Pet-Friendly</span>}{' '} */}
        {img_url[0]?.url ? (
          <CldImage
            src={img_url[0].url}
            alt="HeroImage"
            width={440}
            height={550}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        ) : (
          <ImageNotFound />
        )}
      </div>
      <div>
        <span>{title}</span>
        <span>&euro; {price}</span>
      </div>
    </>
  );
}
