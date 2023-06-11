import Link from 'next/link';

type Props = {
  index: number;
  info: { [key: string]: string };
};

export default function MobileFooterInfo(props: Props) {
  const { index, info } = props;
  return (
    <p key={`infos-body-${index}`}>
      <Link href="http://localhost:3000/">
        <a>
          <li key={`header-${index}-${info.infoOne}`}>{info.infoOne}</li>
        </a>
      </Link>
      <Link href="http://localhost:3000/">
        <a>
          {' '}
          <li key={`header-${index}-${info.infoTwo}`}>{info.infoTwo}</li>
        </a>
      </Link>
      <Link href="http://localhost:3000/">
        <a>
          <li key={`header-${index}-${info.infoThree}`}>{info.infoThree}</li>
        </a>
      </Link>
    </p>
  );
}
