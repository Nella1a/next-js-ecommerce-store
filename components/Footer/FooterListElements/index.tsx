import { css } from '@emotion/react';

const footerListElements = css`
  list-style: none;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  font-size: 0.9rem;
`;

type Props = {
  info: { [key: string]: string };
};

export default function FooterListElements(props: Props) {
  const { info } = props;
  return (
    <ul css={footerListElements}>
      <li>{info.infoOne}</li>
      <li>{info.infoTwo}</li>
      <li>{info.infoThree}</li>
    </ul>
  );
}
