<<<<<<< HEAD
import '../styles/globals.css'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { wrapper, store } from '../src/store.js'
import { Provider } from 'react-redux'
=======
import "/styles/globals.css";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { wrapper, store } from "../src/store.js";
import { Provider } from "react-redux";
>>>>>>> 36ff6192d5d29671533222889ef616aa5e0a28df

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);
