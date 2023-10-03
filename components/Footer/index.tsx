import Link from 'next/link';
import { useState } from 'react';
import { footerStyle } from '../elements';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer css={footerStyle}>
      <div>
        <article>
          <p>About</p>
          <p>Plant Care</p>
          <p>FAQ</p>
          <p>Contact</p>
        </article>
        <article>
          <p>Explore</p>
          <p>Careers</p>
          <p>Locations</p>
          <p>Blog</p>
        </article>
        <article>
          <p>Explore</p>
          <p>Careers</p>
          <p>Locations</p>
          <p>Blog</p>
        </article>
        <article>
          <p>Terms</p>
          <Link href="http://localhost:3000/">
            Refund Policy
          </Link>
          <Link href="http://localhost:3000/">
            Terms of Service
          </Link>
          <Link href="http://localhost:3000/">
            Delivery and Schipping
          </Link>
        </article>

        <article>
          <p>Join Us</p>
          <p>Subscribe to our newsletter</p>

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
            <button>Sign Up</button>
          </form>
        </article>
      </div>
    </footer>
  );
}
