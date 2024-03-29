import Link from 'next/link';
import styles from './ButtonCallToAction.module.css';

type ButtonText = {
  innerText: string;
};

export default function ButtonCallToAction({ innerText }: ButtonText) {
  return (
    <Link
      href={{
        pathname: '/plants',
      }}
      passHref
      data-test-id="button-view-all-plants"
      className={styles.btn}
    >
      {innerText}
    </Link>
  );
}
