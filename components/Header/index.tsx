import BackGImage from '../Images/BackGImage';

export function Header(props: any) {
  return (
    <BackGImage
      firstText="Delivering Plants,"
      secondText="Delivering Happiness!"
      bgImageHero={props.bgImageHero}
      buttonInHeroImage={props.buttonInHeroImage}
    />
  );
}
