import { useState } from 'react';
import { footerStyle } from '../elements';
import FormNewsletter from '../FormNewsletter';
import FooterListElements from './FooterListElements';

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
      <section>
        {footerInfos.map((info, index: number) => (
          <>
            <div key={`desktop-footer-${index}`}>
              <p>{info.header}</p>
              <FooterListElements info={info} />
            </div>
          </>
        ))}
        <FormNewsletter email={email} setEmail={setEmail} />
      </section>
    </footer>
  );
}
