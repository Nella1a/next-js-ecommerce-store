import Link from 'next/link';

export default function NavMenu() {
  return (
    <>
      <li>
        <Link href="/products" data-test-id="products-link">
          Plants
        </Link>
      </li>
      <li>
        <Link href="/sale">Sale</Link>
      </li>
      <li>
        {' '}
        <Link href="/contact">Contact</Link>
      </li>
    </>
  );
}
