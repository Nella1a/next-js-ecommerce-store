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
        <Link href="#">{info.infoOne}</Link>
      </li>
      <li key={`header-${index}-${info.infoTwo}`}>
        <Link href="#">{info.infoTwo}</Link>
      </li>
      <li key={`header-${index}-${info.infoThree}`}>
        <Link href="#">{info.infoThree}</Link>
      </li>
    </ul>
  );
}
