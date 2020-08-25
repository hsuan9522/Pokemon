import "../style/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import withReduxStore from 'with-redux-store';

// import { Provider } from 'react-redux';
// import store from "../redux/index.js";

// function MyApp({ Component, pageProps }) {
  
//   return <Provider store={store}><Component {...pageProps} /></Provider>;
// }


// export default withReduxStore(MyApp)

import App from 'next/app'
import React from 'react'
import withReduxStore from '../redux'
import { Provider } from 'react-redux'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
