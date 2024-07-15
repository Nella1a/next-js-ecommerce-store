import { CldImage } from 'next-cloudinary';
import { Fragment } from 'react';
import { Plant } from '../../util/types';
import Products from '../Products';

type Props = {
  plants: Plant[];
};

// const bgImageSale = css`
//   background: url('indexSectionImage.jpeg') no-repeat left -200px bottom;
//   background-size: 1600px;
// `;

export default function SummerFavoritesSection(props: Props) {
  return (
    <Fragment>
      <div>
        <CldImage
          src={'plantStore/small/dmzoekskll2cvquz3ebq'}
          alt="plants on a table"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          crop={'fill'}
        />
      </div>
      <div>
        <Products plants={props.plants} />
      </div>
    </Fragment>
  );
}
