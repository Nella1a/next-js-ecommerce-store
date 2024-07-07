import { css } from '@emotion/react';
import BackGImage from '../Images/BackGImage';
import Navigation from '../Navigation';

const header = () => css`
  width: 100vw;
  border: 2px solid black;
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
        firstText="Delivering plants, "
        secondText="delivering happiness!"
        thirdText="Get your favorite plants right to your doorstep"
        imgUrl={props.imgUrl}
        buttonInHeroImage={props.buttonInHeroImage}
      />
    </header>
  );
}
