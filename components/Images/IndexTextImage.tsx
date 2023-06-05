import { css } from '@emotion/react';
import { Fragment } from 'react';
import Products from '../Products';

type Props = {
  plants: Plants[];
};

type Plants = {
  id: number;
  name: string;
  price: number;
};

const bgImageSale = css`
  background: url('indexSectionImage.jpeg') no-repeat left -200px bottom;
  background-size: 1600px;
`;

export default function IndexTextImage(props: Props) {
  return (
    <Fragment>
      <div css={bgImageSale}>
        {/*      <Image src={indexSectionImage} alt="Vercel" />
         */}{' '}
      </div>
      <div>
        <Products plants={props.plants} />
      </div>
    </Fragment>
  );
}
