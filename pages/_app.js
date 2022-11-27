import { css, Global, ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';

const bodyGreyLayer = (showRespMenue) => css`

width: 100%;
height: 100%;
background-color: rgba(105,105,105,.6);
position: absolute;
z-index: 900;
display: ${showRespMenue ? "block" : "none"};
top: 0;

`;


function MyApp({ Component, pageProps }) {
  const [showRespMenue, setShowRespMenue] = useState(false)

  return (
      <>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyleBody(theme)} />
          <div
            css={bodyGreyLayer(showRespMenue)}
          />
          <Component
            {...pageProps}
            showRespMenue={showRespMenue}
            setShowRespMenue={setShowRespMenue}
            />

        </ThemeProvider>
      ;
      </>
  );
}

export default MyApp;
