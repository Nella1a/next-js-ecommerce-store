import Link from 'next/link';
import { btnLinkStyle } from '../../elements';

export default function ButtonCallToAction(props) {
  return (
    <Link
      href={{
        pathname: '/plants',
      }}
      passHref
      data-test-id="button-view-all-plants"
      css={btnLinkStyle}
    >
      {props.innerText}
    </Link>
  );
}
