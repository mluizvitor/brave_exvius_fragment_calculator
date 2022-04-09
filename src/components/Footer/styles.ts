import Box from '@mui/material/Box';
import Card, { cardClasses } from '@mui/material/Card';
import CardMedia, { cardMediaClasses } from '@mui/material/CardMedia';
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

export const StyledCard = styled(Card)(({theme}) => ({
  [`&.${cardClasses.root}`]: {
    boxShadow: 'none',
    height: '100%',
    borderRadius: 16,
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      flexDirection: 'column',  
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}));

export const StyledCardMedia = styled(CardMedia)(({theme}) => ({
  [`&.${cardMediaClasses.img}`]: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      height: 192,
    },
    [theme.breakpoints.up('md')]: {
      width: 144,
      minWidth: 144,
      height: '100%',
    },

  },
})) as typeof CardMedia;

export const StyledCardBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));