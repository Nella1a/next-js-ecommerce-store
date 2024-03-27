type Props = {
  info: { [key: string]: string };
};

export default function FooterListElements(props: Props) {
  const { info } = props;
  return (
    <ul>
      <li>{info.infoOne}</li>
      <li>{info.infoTwo}</li>
      <li>{info.infoThree}</li>
    </ul>
  );
}
