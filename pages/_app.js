import '@/styles/globals.css'
import { wrapper, store } from '../src/store.js'
import { Provider } from 'react-redux'

function App({ Component, pageProps }) {
  return (
  <>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
  );
}

export default wrapper.withRedux(App);
