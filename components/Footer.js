import Link from 'next/link';
import { footerStyle } from './elements';

export default function Footer() {
  return (
    <footer css={footerStyle}>
      <Link href="http://localhost:3000/">
        <a>Search</a>
      </Link>
      <Link href="http://localhost:3000/">
        <a>Refund Policy</a>
      </Link>
      <Link href="http://localhost:3000/">
        <a>Terms of Service</a>
      </Link>
      <Link href="http://localhost:3000/">
        <a>Delivery and Schipping</a>
      </Link>
    </footer>
  );
}
