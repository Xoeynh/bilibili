import store from '@/store/index';
import { Provider } from 'react-redux';
import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '@/styles/globals.css';
import '@/styles/not-found.scss';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
