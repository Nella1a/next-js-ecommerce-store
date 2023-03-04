import { css } from '@emotion/react';
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
         <p css={buttonCallToActionIndex}>{props.buttonInHeroImage}</p>
      </div>
    </div>
  );
}
