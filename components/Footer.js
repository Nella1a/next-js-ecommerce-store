import Link from 'next/link';
import { footerStyle } from './elements';

export default function Footer() {
  return (
    <footer css={footerStyle}>
      <div>
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
