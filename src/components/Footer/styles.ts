import Container, { containerClasses } from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)(({theme}) => ({
  [`&.${containerClasses.root}`]: {
    [theme.breakpoints.up('xs')]: {
      paddingBottom: 5.5 * 16,
      paddingLeft: 1 * 16,
      paddingRight: 1 * 16,
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 2 * 16,
      paddingRight: 2 * 16,
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: 2 * 16,
      paddingLeft: 4 * 16,
      paddingRight: 4 * 16,
    },
  },
}));