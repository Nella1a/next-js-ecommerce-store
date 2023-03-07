import BackGImage from './BackGImage';

export function Header(props) {
  return(<BackGImage
    firstText="Delivering Plants,"
    secondText="Delivering Happiness!"
    bgImageHero={props.bgImageHero}
    buttonInHeroImage={props.buttonInHeroImage}

  />)

}