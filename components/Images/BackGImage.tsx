import { css } from '@emotion/react';
import Image from 'next/image';
import { flexRowXYCenter } from '../elements';

export const bgImgContainer = css`
  z-index: 1;
  height: 20rem;
  position: relative;
  ${flexRowXYCenter}

  ::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    //background-color: rgba(52, 58, 64, 0.1); //grey 6
  }

  @media (max-width: 48rem) {
    height: 18rem;
  }

  @media (max-width: 40rem) {
    height: 16rem;
  }
`;

export const bgImgContainerContent = () => css`
  //border: 2px solid red;
  z-index: 1;

  width: auto;
  color: var(--main-bg-color);
  letter-spacing: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100%;

  /* background: linear-gradient(
    270deg,
    rgba(52, 58, 64, 0.1),
    rgba(52, 58, 64, 0.5),
    rgba(52, 58, 64, 0.1)
  ); */
  /* p {
    font-size: 2.25rem;
    font-weight: 600;
  } */

  a {
    display: flex;
    align-items: center;
    padding-left: 5rem;
    width: 16rem;
  }

  @media (max-width: 769px) {
    height: 10.25rem;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export default function BackGImage(props: any) {
  return (
    <div css={bgImgContainer}>
      {/* using fill, the parent element must have position: relative */}
      <Image
        src={props.bgImageHero}
        alt="desk full of plants"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
      <article css={bgImgContainerContent}>
        <p>{props.firstText}</p>
        <p>{props.secondText}</p>
        {/* {props.buttonInHeroImage} */}
      </article>
    </div>
  );
}
