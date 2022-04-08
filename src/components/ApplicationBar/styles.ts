import { styled } from '@mui/material/styles';
import Fab, { fabClasses } from '@mui/material/Fab';
import Toolbar, { toolbarClasses } from '@mui/material/Toolbar';
import OutlinedInput, { outlinedInputClasses } from '@mui/material/OutlinedInput';

export const StyledFab = styled(Fab)(({theme}) => ({
  [`&.${fabClasses.root}`]: {
    [theme.breakpoints.up('md')]: {
      minWidth: 230,
      position: 'relative',
      right: 0,
      bottom: 0,
      height: 40,
      borderRadius: 8,
      boxShadow: 'none',
    },
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      right: 16,
      bottom: 16,
      height: 56,
    },
  },
}));

export const StyledToolbar = styled(Toolbar)(({theme}) => ({
  [`&.${toolbarClasses.root}`]: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 4 * 16,
      paddingRight: 4 * 16,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 2 * 16,
      paddingRight: 2 * 16,
    },
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 1 * 16,
      paddingRight: 1 * 16,
    },
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    gap: 1 * 16,
  },
}));

export const StyledOutlinedInput = styled(OutlinedInput)(({theme}) => ({
  [`&.${outlinedInputClasses.root}`]: {
    minWidth: 128,
    width: 'auto',
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.075)',

    [theme.breakpoints.up('lg')]: {
      marginLeft: 6 * 16,
      marginRight: 6 * 16,
    },
  },
}));
