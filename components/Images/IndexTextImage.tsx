import { css } from '@emotion/react';
import Image from 'next/image';
import { Fragment } from 'react';
import indexSectionImage from '../../public/indexSectionImage.jpeg';
import Products from '../Products';

type Props = {
  plants: Plants[];
};

type Plants = {
  id: number;
  title: string;
  price: number;
};

const bgImageSale = css`
  background: url('indexSectionImage.jpeg') no-repeat left -200px bottom;
  background-size: 1600px;
`;

export default function IndexTextImage(props: Props) {
  return (
    <Fragment>
      <div>
        <Image
          src={indexSectionImage}
          alt="plants on a table"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div>
        <Products plants={props.plants} />
      </div>
    </Fragment>
  );
}
