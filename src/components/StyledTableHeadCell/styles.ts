import { TableCell, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableHeaderCell = styled(TableCell)((props) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: props.theme.palette.secondary.main,
    color: props.theme.palette.secondary.contrastText,
    fontWeight: 600
  },
}));