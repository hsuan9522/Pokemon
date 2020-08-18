import "../style/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from 'react-redux';
import store from "../redux/index.js";

export default function MyApp({ Component, pageProps }) {
  
  return <Provider store={store}><Component {...pageProps} /></Provider>;
}
