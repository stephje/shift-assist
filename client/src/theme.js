import { createTheme } from '@material-ui/core/styles';
import { red, teal } from '@material-ui/core/colors';


// A custom theme for this app
const theme = createTheme({
    palette: {
      primary: {
        main: teal[400],
      },
      secondary: {
        main: teal[400],
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
  });

export default theme;