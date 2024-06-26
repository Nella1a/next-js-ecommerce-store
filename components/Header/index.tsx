import { css } from '@emotion/react';
import BackGImage from '../Images/BackGImage';
import Navigation from '../Navigation';

const header = () => css`
  background-color: green;
  width: 100vw;

  nav ~ div {
    margin-top: 4rem;
  }
`;

export function Header(props: any) {
  return (
    <header css={header}>
      <Navigation />
      <BackGImage
        firstText=""
        secondText=""
        bgImageHero={props.bgImageHero}
        buttonInHeroImage={props.buttonInHeroImage}
      />
    </header>
  );
}
