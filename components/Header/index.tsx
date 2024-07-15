import { css } from '@emotion/react';
import BackGImage from '../Images/BackGImage';
import Navigation from '../Navigation';

const header = () => css`
  width: 100vw;
  position: relative;
  background-color: #50a458;
  overflow: hidden;

  > div:first-of-type {
    height: 4rem;
  }
`;

export function Header(props: any) {
  return (
    <header css={header}>
      <Navigation />
      <div />
      <BackGImage
        firstText={props.firstText}
        secondText={props.secondText}
        thirdText={props.thirdText}
        imgUrl={props.imgUrl}
        buttonInHeroImage={props.buttonInHeroImage}
      />
    </header>
  );
}
