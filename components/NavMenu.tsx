import Link from 'next/link';

export default function NavMenu() {
  return (
    <>
      <Link href="/products">
        <a data-test-id="products-link">Plants</a>
      </Link>
      <Link href="/inspiration">
        <a>Inspiration</a>
      </Link>
      <Link href="/sale">
        <a>Sale</a>
      </Link>
      <Link href="/underconstruction">
        <a>Contact</a>
      </Link>
    </>
  );
}
