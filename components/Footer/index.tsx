import Link from 'next/link';
import { useState } from 'react';
import { footerStyle } from '../elements';
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
        <article>
          <h4>
            Join us!
            <span> Subscribe to our newsletter.</span>
          </h4>

          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              setEmail('');
            }}
          >
            <p>
              <input
                id="email"
                type="email"
                name="usermail"
                placeholder="Your Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </article>
      </section>
    </footer>
  );
}
