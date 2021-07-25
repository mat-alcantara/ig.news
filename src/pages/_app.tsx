import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Provider } from "next-auth/client";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
