import BackGImage from '../Images/BackGImage';
import Navigation from '../Navigation';

export function Header(props: any) {
  return (
    <header>
      <Navigation />
      <BackGImage
        firstText="Delivering Plants,"
        secondText="Delivering Happiness!"
        bgImageHero={props.bgImageHero}
        buttonInHeroImage={props.buttonInHeroImage}
      />
    </header>
  );
}
