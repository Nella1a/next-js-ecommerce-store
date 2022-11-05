import Link from 'next/link';
import { footerStyle } from './elements';

export default function Footer() {
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
          <article>
            <p>Terms</p>
            <Link href="http://localhost:3000/">
              <a>Refund Policy</a>
            </Link>
            <Link href="http://localhost:3000/">
              <a>Terms of Service</a>
            </Link>
            <Link href="http://localhost:3000/">
              <a>Delivery and Schipping</a>
            </Link>
          </article>
      </div>
    </footer>
  );
}
