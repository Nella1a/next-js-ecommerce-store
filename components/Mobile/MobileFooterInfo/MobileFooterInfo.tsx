import Link from 'next/link';

type Props = {
  index: number;
  info: { [key: string]: string };
};

export default function MobileFooterInfo(props: Props) {
  const { index, info } = props;
  return (
    <ul key={`infos-body-${index}`}>
      <li key={`header-${index}-${info.infoOne}`}>
        <Link href="http://localhost:3000/">{info.infoOne}</Link>
      </li>
      <li key={`header-${index}-${info.infoTwo}`}>
        <Link href="http://localhost:3000/">{info.infoTwo}</Link>
      </li>
      <li key={`header-${index}-${info.infoThree}`}>
        <Link href="http://localhost:3000/">{info.infoThree}</Link>
      </li>
    </ul>
  );
}
