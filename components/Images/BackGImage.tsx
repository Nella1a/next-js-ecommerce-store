import { css } from '@emotion/react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';

export const bgImgContainer = css`
  height: 29rem;
  position: relative;
  border: 2px solid white;
  background-color: #50a458;
  display: grid;
  grid-template-columns: 2fr 1fr;

  gap: 1rem;
  max-width: 1350px;
  margin: 0 auto;

  div {
    position: relative;
    border: 3px solid black;
    min-width: 300px;
    max-width: 1200px;
    img {
      overflow: visible;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: 32rem;

    div {
      max-width: 700px;
      margin-bottom: 152px;
      width: 500px;
    }
  }

  @media (max-width: 505px) {
    div {
      width: 100%;
      margin-bottom: 130px;
    }
  }

  @media (max-width: 403px) {
    div {
      width: 100%;
      margin-bottom: 90px;
    }
  }
`;

export const bgImgContainerContent = () => css`
  justify-self: center;
  align-self: center;
  padding-left: 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
  border: 2px solid red;
  color: var(--color-white);

  z-index: 1;
  width: 100%;

  h1 {
    font-size: 50px;
    border: 1px solid blue;
    width: 100%;
    span {
      display: block;
    }
  }

  p {
    font-size: 21px;
    font-family: sans-serif;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    width: 8rem;
    border-radius: 5px;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 40px;
    }
  }

  @media (max-width: 767px) {
    margin-top: 3rem;
  }

  @media (max-width: 610px) {
    h1 {
      font-size: 28px;
      width: 100%;
      span {
        display: inline-block;
      }
    }
  }

  @media (max-width: 546px) {
    div {
      min-height: 39%;
    }
  }

  @media (max-width: 450px) {
    //  margin-top: 3rem;

    padding-left: 1.5rem;
    h1 {
      font-size: 28px;
    }

    p:nth-of-type(2) {
      font-size: 16px;
      // width: 60%;
    }

    a {
      padding: unset;
    }
  }

  @media (max-width: 375px) {
  }
`;

export default function BackGImage(props: any) {
  const url = getCldImageUrl(
    {
      src: props.imgUrl,
    },
    { cloud: { cloudName: "'mix571zo0'" } },
  );

  return (
    <div css={bgImgContainer}>
      {/* using fill, the parent element must have position: relative */}

      <article css={bgImgContainerContent}>
        <h1>
          {props.firstText} <span>{props.secondText}</span>
        </h1>

        <p>{props.thirdText}</p>
        {props.buttonInHeroImage}
      </article>
      <div>
        <CldImage
          src={url}
          alt="HeroImage"
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
