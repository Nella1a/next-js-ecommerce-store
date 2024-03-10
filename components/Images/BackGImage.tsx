import Image from 'next/image';
import indexHeroImg from '../../public/indexHeroImg.jpeg';
import { bgImgContainer, heroImageContentContainer } from '../elements';

export default function BackGImage(props: any) {
  return (
    <div css={bgImgContainer}>
      <Image
        src={indexHeroImg}
        alt="desk full of plants"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        priority
      />

      <article css={heroImageContentContainer}>
        <p>{props.firstText}</p>
        <p>{props.secondText}</p>
        {props.buttonInHeroImage}
      </article>
    </div>
  );
}
