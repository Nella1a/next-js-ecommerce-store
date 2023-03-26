import Link from 'next/link';

export default function NavMenu() {
  return (
    <>
      <li>
        <Link href="/products">
          <a data-test-id="products-link">Plants</a>
        </Link>
      </li>
      <li>
        {' '}
        <Link href="/inspiration">
          <a>Inspiration</a>
        </Link>
      </li>
      <li>
        <Link href="/sale">
          <a>Sale</a>
        </Link>
      </li>
      <li>
        {' '}
        <Link href="/underconstruction">
          <a>Contact</a>
        </Link>
      </li>
    </>
  );
}
