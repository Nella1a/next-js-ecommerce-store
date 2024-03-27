import { useState } from 'react';
import { MobileFooterStyle } from '../../elements';
import { FooterData, footerInfos } from '../../Footer';
import FooterListElements from '../../Footer/FooterListElements';
import FormNewsletter from '../../FormNewsletter';

export default function MobileFooter() {
  const [email, setEmail] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  const handleAccordionClick = (index: number) => {
    console.log('clicked index: ', index);
    console.log('last index: ', currentIndex);
    if (currentIndex !== index) {
      setIsActive(true);
      setCurrentIndex(index);
    } else {
      setIsActive(!isActive);
    }
  };

  return (
    <footer css={MobileFooterStyle}>
      <div>
        {footerInfos.map((info, index) => {
          return (
            <div key={`moble-footer-${index}`}>
              <p
                key={`header-${index}-${info.header}`}
                onClick={() => handleAccordionClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <span>{info.header}</span>
                <span key={`info-toggle-${index}`}>
                  {isActive && currentIndex === index ? '-' : '+'}
                </span>
              </p>

              {isActive && currentIndex === index && (
                <FooterListElements info={info} />
              )}
            </div>
          );
        })}
        <FormNewsletter email={email} setEmail={setEmail} />
      </div>
    </footer>
  );
}
