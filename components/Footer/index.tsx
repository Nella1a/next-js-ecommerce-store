import { css } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';
import { container, marginTop } from '../elements';
import FormNewsletter from '../FormNewsletter';
import SocialMediaIcons from '../SocialMediaIcons';
import FooterListElements from './FooterListElements';

export const footerStyle = css`
  background-color: var(--main-bg-color);
  width: 100%;
  margin: 3rem 0rem auto;

  nav {
    ${container};
    ${marginTop};
    display: grid;
    grid-template-columns: minmax(100px, 250px) repeat(3, 0.5fr) 1fr;
    gap: 1rem;

    p {
      font-weight: 600;
      color: var(--color-primary-green);
      font-size: var(--text-xl);
      margin-bottom: 0.5rem;
    }
  }

  nav ~ div {
    ${container}
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
    color: var(--color-primary-green);
    div {
      display: flex;
      gap: 0.5rem;

      span {
        display: inline-block;
        width: 1.5rem;
        height: 2rem;
      }
    }
  }

  @media (max-width: 1024px) {
    nav {
      grid-template-columns: minmax(100px, 250px) repeat(2, 0.5fr);
      grid-template-rows: 2;
      row-gap: 3rem;
      justify-items: center;
      > div:first-of-type {
        grid-column: 1/-1;
        justify-self: center;
      }

      > div:last-of-type {
        label {
          text-align: center;
        }
        grid-column: 1/-1;
        justify-self: stretch;
      }
    }
  }
`;

export type FooterData = {
  footerInfos: {
    header: string;
    infoOne: string;
    infoTwo: string;
    infoThree: string;
  }[];
};

export const footerInfos = [
  {
    header: 'About',
    infoOne: 'Plant Care',
    infoTwo: 'FAQ',
    infoThree: 'Contact',
  },
  {
    header: 'Explore',
    infoOne: 'Career',
    infoTwo: 'Locations',
    infoThree: 'Blog',
  },
  {
    header: 'Terms',
    infoOne: 'Refund Policy',
    infoTwo: 'Terms of Service',
    infoThree: 'Delivery & Schipping',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer css={footerStyle}>
      <nav>
        <div>
          <Image
            src={'/logo_shelovesplants_green.png'}
            alt={'logo she loves plants'}
            width={'193'}
            height={'28'}
          />
        </div>

        {footerInfos.map((info, index: number) => (
          <div key={`desktop-footer-${index}`}>
            <p>{info.header}</p>
            <FooterListElements info={info} />
          </div>
        ))}

        <div>
          <FormNewsletter email={email} setEmail={setEmail} />
        </div>
      </nav>
      <div>
        <p>2024 She Loves Plants. All Rights Reserved.</p>
        <SocialMediaIcons />
      </div>
    </footer>
  );
}
