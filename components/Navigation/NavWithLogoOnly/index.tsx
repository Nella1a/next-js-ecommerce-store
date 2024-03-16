import Link from 'next/link';
import { Fragment } from 'react';
import { navWithLogoOnlyStyle } from '../../elements';

export default function NavWithLogoOnly() {
  return (
    <Fragment>
      <nav css={navWithLogoOnlyStyle}>
        <div>
          <div>
            <Link href="/" passHref>
              <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
            </Link>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
