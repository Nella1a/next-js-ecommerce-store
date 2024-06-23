import { CldImage } from 'next-cloudinary';
import ImageNotFound from '../Icons/ImageNotFound';

type Plants = {
  id: number;
  title: string;
  price: number;
  slug?: string;
  img_url: { url: string | null }[];
};

type Props = {
  plant: Plants;
};

export default function ProductCard(props: Props) {
  const { id, slug, title, price, img_url } = props.plant;

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
