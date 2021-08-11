import { createTheme } from '@material-ui/core/styles';
import { red, teal } from '@material-ui/core/colors';


// A custom theme for this app
const theme = createTheme({
    palette: {
      primary: {
        main: teal[400],
      },
      secondary: {
        main: red[300],
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
    typography: {
      formHeader1: {
        fontSize: 12,
      },
    },
  });

export default theme;