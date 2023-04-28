import "/styles/globals.css";
import React, { useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { wrapper } from "../src/store.js";
import { Provider } from "react-redux";
// import Typography from "@mui/material/Typography";

const themeContext = createContext(null);

export function useThemeContext() {
  return useContext(themeContext);
}

function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && theme !== "") {
      setTheme(theme);
    } else {
      setTheme("remiTheme");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div className="w-full h-full bg-base-100 z-[-50] fixed" data-theme={theme || "remiTheme"}>
      <themeContext.Provider value={{ theme, setTheme }}>
        <Provider store={store}>
          <UserProvider>
            {/* <ThemeProvider theme={theme || "cupcake"}> */}
            <Component {...pageProps} />
            {/* </ThemeProvider> */}
          </UserProvider>
        </Provider>
      </themeContext.Provider>
    </div>
  );
}

export default App;
