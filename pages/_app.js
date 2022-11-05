import { Global, ThemeProvider } from '@emotion/react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyleBody(theme)} />
        <Component {...pageProps} />
      </ThemeProvider>
      ;
    </>
  );
}

export default MyApp;
