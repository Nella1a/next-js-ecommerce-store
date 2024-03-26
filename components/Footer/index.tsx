import { useState } from 'react';
import { footerStyle } from '../elements';
import FormNewsletter from '../FormNewsletter';
import { footerInfos } from '../Mobile/MobileFooter';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer css={footerStyle}>
      <section>
        {footerInfos.map((info, index) => (
          <div key={`desktop-footer-${index}`}>
            <p>{info.header}</p>
            <ul>
              <li>{info.infoOne}</li>
              <li>{info.infoTwo}</li>
              <li>{info.infoThree}</li>
            </ul>
          </div>
        ))}
        <FormNewsletter email={email} setEmail={setEmail} />
      </section>
    </footer>
  );
}
