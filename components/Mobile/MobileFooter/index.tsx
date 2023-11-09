import { useState } from 'react';
import { MobileFooterStyle } from '../../elements';
import MobileFooterInfo from '../MobileFooterInfo/MobileFooterInfo';

export default function MobileFooter() {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [toggle, setToggle] = useState<number>();

  const footerInfos = [
    {
      header: 'About',
      infoOne: 'Plant Care',
      infoTwo: 'FAQ',
      infoThree: 'Contact',
    },
    {
      header: 'Explor',
      infoOne: 'Career',
      infoTwo: 'Locations',
      infoThree: 'Blog',
    },
    {
      header: 'She Loves Plants',
      infoOne: 'Your Account',
      infoTwo: 'Rewards Programm',
      infoThree: 'Track Your Order',
    },
    {
      header: 'Terms',
      infoOne: 'Refund Policy',
      infoTwo: 'Terms of Service',
      infoThree: 'Delivery and Schipping',
    },
  ];

  return (
    <footer css={MobileFooterStyle}>
      <div>
        {footerInfos.map((info, index) => {
          return (
            <article key={index}>
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
        <article>
          <p>
            <span>Join us!</span>
          </p>
          <p>Subscribe to our newsletter.</p>
          <form>
            <p>
              <input
                id="email"
                type="email"
                name="usermail"
                placeholder="Your Email"
              />
            </p>
            <button>Sign Up</button>
          </form>
        </article>
      </div>
    </footer>
  );
}
