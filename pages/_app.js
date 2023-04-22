import '@/styles/globals.css'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { wrapper, store } from '../src/store.js'
import { Provider } from 'react-redux'

function App({ Component, pageProps }) {
  return (
  <>
    <Provider store={store}>
      <UserProvider>
      <Component {...pageProps} /></UserProvider>
    </Provider>
  </>
  );
}

export default wrapper.withRedux(App);
