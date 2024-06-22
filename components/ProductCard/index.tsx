import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { Plant } from '../../util/types';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        )}
      </div>
      <div>
        <span>{title}</span>
        <span>&euro; {price}</span>
      </div>
    </>
  );
}
