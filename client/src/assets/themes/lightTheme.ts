import { createTheme } from '@mui/material/styles';


const lightTheme = createTheme({
  typography: {
    fontFamily: 'Rubik, Roboto, sans-serif'
  },
  palette: {
    background: {
      default: '#FFFDFC', 
    },
    primary: {
      main: '#FCE6E0',
      light: '#f7398a'
    },
    secondary: {
      main: '#b13368', 
      dark: '#b5b5b5'
    },
    error: {
      main: '#b13368',
    },
    success: {
      main: '#FCF9C7'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#FCE6E0 #FFFDFC",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#FCE6E0",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#b13368",
            minHeight: 24,
            border: "4px solid #FCE6E0",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#F9C5BA",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#F9C5BA",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#F9C5BA",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#F9C5BA",
          },
        }
      }
    }
  }
});

export default lightTheme;