import { css } from '@emotion/react';
import ButtonCallToAction from './ButtonCallToAction';
import { bgImgContainer, bgImgInnerContainer } from './elements';

const buttonCallToActionIndex = css`
  border-radius: 20px;

`
export default function BackGImage(props) {
  return (
    <div css={[bgImgContainer, props.bgImage]} >
     <div css={bgImgInnerContainer}>
        <p>{props.firstText}</p>
        <p>{props.secondText}</p>
         {/* <ButtonCallToAction innerText="View All Plants" styleb={buttonCallToActionIndex}/> */}
         <p css={buttonCallToActionIndex}>{props.buttonInHeroImage}</p>
      </div>
    </div>
  );
}
