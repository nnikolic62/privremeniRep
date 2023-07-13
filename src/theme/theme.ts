import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: '25px',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    }
  },
  
  components: {
    MuiTextField: {
        defaultProps: {
            
        },
    },
    // MuiButton: {
    //     defaultProps: {
    //         variant: 'contained',
    //     }
    // }
  }
});

export default theme;
