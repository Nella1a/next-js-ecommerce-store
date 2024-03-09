import { useState } from 'react';
import { MobileFooterStyle } from '../../elements';
import FormNewsletter from '../../FormNewsletter';
import MobileFooterInfo from '../MobileFooterInfo/MobileFooterInfo';

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

export default function MobileFooter() {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [toggle, setToggle] = useState<number>();
  const [email, setEmail] = useState('');

  return (
    <footer css={MobileFooterStyle}>
      <div>
        {footerInfos.map((info, index) => {
          return (
            <article key={`moble-footer-${index}`}>
              <ul>
                <li
                  key={`header-${index}-${info.header}`}
                  onClick={() => {
                    setDisplayMenu(!displayMenu);
                    setToggle(index);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <span>{info.header}</span>
                  <span key={`info-toggle-${index}`}>
                    {displayMenu && toggle === index ? '-' : '+'}
                  </span>
                </li>
                <li>
                  {displayMenu && toggle === index && (
                    <MobileFooterInfo index={index} info={info} />
                  )}
                </li>
              </ul>
            </article>
          );
        })}
        <FormNewsletter email={email} setEmail={setEmail} />
      </div>
    </footer>
  );
}
