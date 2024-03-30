import { css } from '@emotion/react';
import { useState } from 'react';
import { btn } from '../../elements';
import { footerInfos } from '../../Footer';
import FooterListElements from '../../Footer/FooterListElements';
import FormNewsletter from '../../FormNewsletter';

export const MobileFooterStyle = css`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    padding: 4rem 1.5rem;

    > nav {
      margin: 0 auto;
      gap: 4.25rem;
      display: flex;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;
        gap: 0.063rem;

        > button {
          ${btn};
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            font-family: var(--font-primary);
            font-size: 0.9rem;
            display: inline-block;
            font-weight: bold;
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

      @media screen and (max-width: 1051px) {
        gap: 1.5rem;
      }

      @media (max-width: 768px) {
        flex-direction: column-reverse;
        padding: 0rem;
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
        {footerInfos.map((info, index) => {
          return (
            <div key={`moble-footer-${index}`}>
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
        <FormNewsletter email={email} setEmail={setEmail} />
      </nav>
    </footer>
  );
}
