import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Container, { containerClasses } from '@mui/material/Container';
import Paper, { paperClasses } from '@mui/material/Paper';
import TableContainer, { tableContainerClasses } from '@mui/material/TableContainer';

export const StyledContainer = styled(Container)(({theme}) => ({
  [`&.${containerClasses.root}`]: {
    [theme.breakpoints.up('xs')]: {
      paddingTop: 4.5 * 16,
      paddingBottom: 2 * 16,
      paddingLeft: 1 * 16,
      paddingRight: 1 * 16,
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: 5.5 * 16,
      paddingLeft: 2 * 16,
      paddingRight: 2 * 16,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 5.5 * 16,
      paddingLeft: 4 * 16,
      paddingRight: 4 * 16,
    },
  },
}));

export const StyledPaper = styled(Paper)(() => ({
  [`&.${paperClasses.root}`]: {
    borderRadius: '16px 16px 8px 8px',
    overflow: 'hidden',
    boxShadow: 'none',
  },
}));

export const StyledTableContainer = styled(TableContainer)(({theme}) => ({
  [`&.${tableContainerClasses.root}`]: {
    [theme.breakpoints.up('xs')]: {
      maxHeight: 'calc(100vh - 72px - 88px - 52px - 2px)', // 100vh - top padding - bottom padding - TablePagination - correction
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 'calc(100vh - 88px - 88px - 52px - 2px)', // 100vh - top padding - bottom padding - TablePagination - correction
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 88px - 32px - 52px - 2px)', // 100vh - top padding - bottom padding - TablePagination - correction
    },
    minHeight: 180,
    width: '100%',
  },
}));

export const StyledTableHeaderCell = styled(TableCell)((props) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: props.theme.palette.secondary.main,
    color: props.theme.palette.secondary.contrastText,
    fontWeight: 600,
    paddingTop: 1 * 16,
  },
}));