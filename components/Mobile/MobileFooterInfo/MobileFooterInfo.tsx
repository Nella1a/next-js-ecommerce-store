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

        <li key={`header-${index}-${info.infoOne}`}>{info.infoOne}</li>

      </Link>
      <Link href="http://localhost:3000/">

        {' '}
        <li key={`header-${index}-${info.infoTwo}`}>{info.infoTwo}</li>

      </Link>
      <Link href="http://localhost:3000/">

        <li key={`header-${index}-${info.infoThree}`}>{info.infoThree}</li>

      </Link>
    </p>
  );
}
