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
    primary: {
      main: '#8CD0BA',
    },
    secondary: {
      main: '#142F55',
    },
    success: {
      main: '#0df287',
    },
    warning: {
      main: '#FEBD34',
    },
    error: {
      main: '#fe8779',
    },
    background: {
      default: '#191A1C',
      paper: '#1A2027',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @media (max-width: 600px) {
          html { 
            font-size: 87.5%
          }
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: 8,
          borderWidth: 2,
          ':hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        extended: {
          paddingRight: 24,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides:{
        root: {
          width: 24,
          height: 24,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderWidth: 2,
        },
        notchedOutline: {
          borderWidth: 2,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.85rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        track: {
          borderRadius: 22 / 2,
          opacity: 0.2,
        },
        thumb: {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
      },
    },
  },
});