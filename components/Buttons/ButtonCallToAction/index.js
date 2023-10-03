import Link from 'next/link';

export default function ButtonCallToAction(props) {
  return (
    <div css={[props.styleButton, props.styleb]}>
         <p>
            <Link href="/Products" passHref legacyBehavior>
              <button data-test-id="button-view-all-plants" css={props.styleb}>
                {props.innerText}
              </button>
            </Link>
          </p>
      </div>
  );
}