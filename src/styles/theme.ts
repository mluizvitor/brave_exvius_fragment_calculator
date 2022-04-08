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
      main: '#77d1ff',
      contrastText: '#003549',
    },
    secondary: {
      main: '#364955',
      contrastText: '#d1e5f3',
    },
    success: {
      main: '#09e290',
      contrastText: '#00391f',
    },
    info: {
      main: '#b3c5ff',
      contrastText: '#00287d',
    },
    warning: {
      main: '#c4ce5b',
      contrastText: '#2e3300',
    },
    error: {
      main: '#ffb4a9',
      contrastText: '#680003',
    },
    background: {
      default: '#191c1e',
      paper: '#1c2326',
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