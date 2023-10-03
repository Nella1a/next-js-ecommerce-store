import Link from 'next/link';

export default function ButtonCallToAction(props) {
  return (
    <Link href="/products" passHref legacyBehavior>
      <button data-test-id="button-view-all-plants" css={props.styleb}>
        {props.innerText}
      </button>
    </Link>
  );
}
