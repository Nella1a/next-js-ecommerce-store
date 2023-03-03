import { css } from '@emotion/react';
import Image from 'next/image';
import { Fragment } from 'react';
import indexSectionImage from '../public/indexSectionImage.jpeg';
import BackGImage from './BackGImage';
import { indexTextImageComp } from './elements';
import ProductsComponent from './ProductComponent';

type Props = {
  plants: Plants[];

}

type Plants = {
  id: number;
  name: string;
  price: number;
};




const bgImageSale = css`
  background: url("indexSectionImage.jpeg") no-repeat left -200px bottom;
  background-size: 1600px;
`;




export default function IndexTextImage(props:Props){
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