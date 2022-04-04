import { createTheme } from '@mui/material';

export const theme = createTheme({
  spacing: 16,
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: {
      fontWeight: 600,
    },
    
  },
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16
        },
        extended: {
          paddingRight: 24
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides:{
        root: {
          width: 24,
          height: 24
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderWidth: 2,
        }
      }
    },
  }
});