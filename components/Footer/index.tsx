import Link from 'next/link';
import { useState } from 'react';
import { footerStyle } from '../elements';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer css={footerStyle}>
      <section>
        <article>
          <h4>About</h4>
          <ul>
            <li>Plant Care</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </article>
        <article>
          <h4>Explore</h4>
          <ul>
            <li>Careers</li>
            <li>Locations</li>
            <li>Blog</li>
          </ul>
        </article>
        <article>
          <h4>Social</h4>
          <ul>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>YouTube</li>
          </ul>
        </article>
        <article>
          <h4>Terms</h4>
          <ul>
            <li>
              <Link href="http://localhost:3000/">Refund Policy</Link>
            </li>
            <li>
              <Link href="http://localhost:3000/">Terms of Service</Link>
            </li>
            <li>
              <Link href="http://localhost:3000/">Delivery and Schipping</Link>
            </li>
          </ul>
        </article>

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
