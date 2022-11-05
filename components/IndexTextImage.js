import { css } from '@emotion/react';
import Image from 'next/image';
import { Fragment } from 'react';
import BackGImage from '../components/BackGImage';
import ProductsComponent from '../components/ProductComponent';
import indexSectionImage from '../public/indexSectionImage.jpeg';
import { indexTextImageComp } from './elements';

const bgImageSale = css`
  background: url("indexSectionImage.jpeg") no-repeat left -200px bottom;
  background-size: 1600px;
`;

export default function IndexTextImage(props){
  return(
  <Fragment>
    <div css={bgImageSale}>
{/*      <Image src={indexSectionImage} alt="Vercel" />
 */}    </div>
    <div>
      <ProductsComponent plants={props.plants} />
    </div>

</Fragment>)
}