import { css } from '@emotion/react';
import { useState } from 'react';
import { container, marginTop } from '../elements';
import FormNewsletter from '../FormNewsletter';
import FooterListElements from './FooterListElements';

export const footerStyle = css`
  background-color: var(--main-bg-color);
  width: 100%;
  margin: 3rem 0rem auto;

  nav {
    ${container};
    ${marginTop};
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    > div {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      line-height: 2rem;
      font-size: 0.9rem;

      p {
        font-weight: bold;
      }
    }
  }

  @media (max-width: 75rem) {
    section {
      padding: 0 1.5rem;
    }
  }

  @media (max-width: 48rem) {
    display: none;
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
    header: 'Social',
    infoOne: 'Instagram',
    infoTwo: 'Pinterest',
    infoThree: 'Youtube',
  },
  {
    header: 'Terms',
    infoOne: 'Refund Policy',
    infoTwo: 'Terms of Service',
    infoThree: 'Delivery and Schipping',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer css={footerStyle}>
      <nav>
        <div>
          {footerInfos.map((info, index: number) => (
            <div key={`desktop-footer-${index}`}>
              <p>{info.header}</p>
              <FooterListElements info={info} />
            </div>
          ))}
        </div>
        <FormNewsletter email={email} setEmail={setEmail} />
      </nav>
    </footer>
  );
}
