import { useState } from 'react';
import { MobileFooterStyle } from '../elements';
import MobileFooterInfo from './MobileFooterInfo';

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
            <article>
              <ul>
                <p
                  key={`infos-header-${index}`}
                  onClick={() => {
                    setDisplayMenu(!displayMenu);
                    setToggle(index);
                  }}
                >
                  <li key={`header-${index}-${info.header}`}>{info.header}</li>
                  <span key={`info-toggle-${index}`}>
                    {displayMenu && toggle === index ? '-' : '+'}
                  </span>
                </p>

                {displayMenu && toggle === index && (
                  <MobileFooterInfo index={index} info={info} />
                )}
              </ul>
            </article>
          );
        })}
        <article>
          <p>Join Us</p>
          <p>Subscribe to our newsletter</p>
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
