import Link from 'next/link';
import { underConstruction } from '../elements';

export default function UnderConstruction() {
  return (
    <section css={underConstruction}>
      <h1>Under Construction</h1>
      <Link href="/products" passHref legacyBehavior>
        <button>Continue Shopping</button>
      </Link>
    </section>
  );
}
