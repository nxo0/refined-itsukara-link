import '../style.css';
import 'dayjs/locale/ja';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  const router = useRouter();

  useEffect(() => {
    dayjs.extend(localizedFormat);
    dayjs.extend(relativeTime);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      gtag('config', process.env.GA_MEASUREMENT_ID as string);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default App;
