import { createTheme, responsiveFontSizes } from "@mui/material";
import '@fontsource/roboto';


let theme = createTheme({
    palette: {
      primary: {
        main: '#FAFAFA',
      },
      secondary: {
        main: '#333333',
      },
    },
    typography: {
        fontFamily: "Roboto"
    }
  });

  theme = responsiveFontSizes(theme);

  export default theme;