import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    allVariants: {
      color: "orange",
    },
  },
});

// Examples
// import {theme} from '../src/theme'
// import {ThemeProvider} from '@mui/material/styles'
// {
//   /* <ThemeProvider theme={theme}><button color='primary'>Test Div</button></ThemeProvider> */
// }

// https://mui.com/material-ui/customization/theme-components/ Global Defaults
