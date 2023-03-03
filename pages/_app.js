import { css, Global, ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';

const bodyGreyLayer = (showGrayLayer) => css`
width: 100%;
height: 100%;
background-color: rgba(105,105,105,.6);
position: absolute;
z-index: 999;
display: ${showGrayLayer ? "block" : "none"};
top: 0;
`;


function MyApp({ Component, pageProps }) {
  const [showGrayLayer, setShowGrayLayer] = useState(false);

  return (
      <>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyleBody(theme)} />
          <div
            css={bodyGreyLayer(showGrayLayer)}
          />
          <Component
            {...pageProps}
            showGrayLayer={showGrayLayer}
            setShowGrayLayer={setShowGrayLayer}
            />

        </ThemeProvider>
      ;
      </>
  );
}

export default MyApp;
