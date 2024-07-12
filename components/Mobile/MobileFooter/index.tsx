import { css } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';
import { btn, container } from '../../elements';
import { footerInfos } from '../../Footer';
import FooterListElements from '../../Footer/FooterListElements';
import FormNewsletter from '../../FormNewsletter';
import SocialMediaIcons from '../../SocialMediaIcons';

export const MobileFooterStyle = css`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    padding: 4rem 1.5rem;

    > nav {
      margin: 0 auto;
      gap: 1rem;
      display: flex;
      flex-direction: column;
      padding: 0rem;

      > div {
        display: flex;
        flex-direction: column;
        gap: 0.063rem;

        > button {
          ${btn};
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: transparent;
          border-bottom: 1px solid var(--color-grey-3);

          span {
            font-family: var(--font-primary);
            font-size: 0.9rem;
            display: inline-block;
            font-weight: bold;
            color: var(--color-primary-green);
          }

          span:last-of-type {
            font-size: 1.1rem;
          }
        }

        > ul {
          li {
            padding-left: 0.8rem;
          }
        }

        line-height: 2.5rem;
      }
      > div:first-of-type {
        justify-content: center;
        align-items: center;
      }
    }
    nav ~ div {
      margin-top: 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--color-primary-green);
      div {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
        span {
          display: inline-block;
          width: 1.5rem;
          height: 2rem;
        }
      }
    }
  }
`;

export default function MobileFooter() {
  const [email, setEmail] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  const handleAccordionClick = (index: number) => {
    if (currentIndex !== index) {
      setIsActive(true);
      setCurrentIndex(index);
    } else {
      setIsActive(!isActive);
    }
  };

  return (
    <footer css={MobileFooterStyle}>
      <nav>
        <div>
          <Image
            src={'/logo_shelovesplants_green.png'}
            alt={'logo she loves plants'}
            width={'193'}
            height={'28'}
          />
        </div>
        <FormNewsletter email={email} setEmail={setEmail} />
        {footerInfos.map((info, index) => {
          return (
            <div key={`mobile-footer-${index}`}>
              <button
                key={`header-${index}-${info.header}`}
                onClick={() => handleAccordionClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <span>{info.header}</span>
                <span key={`info-toggle-${index}`}>
                  {isActive && currentIndex === index ? '-' : '+'}
                </span>
              </button>

              {isActive && currentIndex === index && (
                <FooterListElements info={info} />
              )}
            </div>
          );
        })}
      </nav>
      <div>
        <SocialMediaIcons />
        <p>2024 She Loves Plants. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
