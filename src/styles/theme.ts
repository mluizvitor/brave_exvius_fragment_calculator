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
      main: 'hsl(170, 70%, 60%)',
    },
    secondary: {
      main: 'hsl(210, 50%, 22%)',
    },
    success: {
      main: 'hsl(150, 60%, 70%)',
    },
    info: {
      main: 'hsl(200, 80%, 70%)',
    },
    warning: {
      main: 'hsl(41, 90%, 65%)',
    },
    error: {
      main: 'hsl(8, 100%, 78%)',
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
          borderRadius: 6,
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
          borderRadius: 12,
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
          borderRadius: 6,
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
          fontSize: '100%',
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