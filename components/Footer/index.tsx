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
          <article key={`desktop-footer-${index}`}>
            <h4>{info.header}</h4>
            <ul>
              <li>{info.infoOne}</li>
              <li>{info.infoTwo}</li>
              <li>{info.infoThree}</li>
            </ul>
          </article>
        ))}
        <FormNewsletter email={email} setEmail={setEmail} />
      </section>
    </footer>
  );
}
