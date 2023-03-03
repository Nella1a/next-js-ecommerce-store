import Link from 'next/link';

export default function NavMenu(){
  return(
    <>
    <Link href="/Products">
      <a data-test-id="products-link">Plants</a>
    </Link>
    <Link href="/Underconstruction">
      <a>Inspiration</a>
    </Link>
    <Link href="/Underconstruction">
      <a>Sale</a>
    </Link>
    <Link href="/Underconstruction">
      <a>Contact</a>
    </Link>
  </>
  );
}