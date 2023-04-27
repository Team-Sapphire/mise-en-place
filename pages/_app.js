import "/styles/globals.css";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { wrapper } from "../src/store.js";
import { Provider } from "react-redux";
// import Typography from "@mui/material/Typography";

function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <div data-theme="cupcake">
      <Provider store={store}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserProvider>
      </Provider>
    </div>
  );
}

export default App;
