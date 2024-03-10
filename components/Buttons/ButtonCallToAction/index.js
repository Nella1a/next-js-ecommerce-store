import Link from 'next/link';

export default function ButtonCallToAction(props) {
  return (
    <Link
      // href={{
      //   pathname: '/plants',
      // }}
      href="#"
      passHref
    >
      <button data-test-id="button-view-all-plants" css={props.styleb}>
        {props.innerText}
      </button>
    </Link>
  );
}
