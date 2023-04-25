import "/styles/globals.css";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { wrapper, store } from "../src/store.js";
import { Provider } from "react-redux";
import Typography from "@mui/material/Typography";

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserProvider>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);
