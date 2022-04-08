import { AddRounded, ClearRounded, DeleteForeverRounded, SearchRounded } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useDialog } from '../../hooks/useDialog';
import { useUnit } from '../../hooks/useUnit';

const fabStyles = {
  position: {
    md: 'relative',
    xs: 'fixed',
  },
  bottom: {
    md: 0,
    xs: 16,
  },
  right: {
    md: 0,
    xs: 16,
  },
};

export function ApplicationBar() {
  const {unitCollection, searchInput, searchUnit} = useUnit();
  const {addUnitDialogToggle, deleteAllDialogToggle} = useDialog();

  /**
   * 
   * Handle Modal states
   * 
   */
  function handleAddDialogToggle() {
    addUnitDialogToggle();
  }

  function handleDeleteAllDialogToggle() {
    deleteAllDialogToggle();
  }

  return (
    <AppBar
      position='fixed'
      color='secondary'
      enableColorOnDark
      variant='outlined'
      sx={{
        alignItems: 'center',
      }}>
      <Toolbar
        sx={{ 
          pl: {
            md: 4,
            sm: 2,
            xs: 1,
          },
          pr: {
            md: 4,
            sm: 2,
            xs: 1,
          },
          width: '100%',
          maxWidth: 'xl',
          gap: 1,
        }}>
        <IconButton href='/brave_exvius_fragment_calculator'
          color='primary'>
          <SvgIcon>
            <path d='M 12 2 A 1.0001 1.0001 0 0 0 11.167969 2.4453125 L 9.4140625 5.0742188 L 9.7929688 6.2089844 L 10.832031 6.5546875 L 12 4.8027344 L 16.798828 12 L 14.908203 14.835938 L 15 14.882812 L 16.552734 14.105469 A 1.0001 1.0001 0 0 1 17.361328 14.068359 A 1.0001 1.0001 0 0 1 17.685547 14.275391 L 18.832031 12.554688 A 1.0001 1.0001 0 0 0 18.832031 11.445312 L 12.832031 2.4453125 A 1.0001 1.0001 0 0 0 12 2 z M 8.0019531 4 L 7.0019531 7 L 4.0019531 8 L 7.0019531 9 L 8.0019531 12 L 9.0019531 9 L 12.001953 8 L 9.0019531 7 L 8.0019531 4 z M 6.2304688 9.8515625 L 5.1679688 11.445312 A 1.0001 1.0001 0 0 0 5.1679688 12.554688 L 11.167969 21.554688 A 1.0001 1.0001 0 0 0 12.832031 21.554688 L 14.185547 19.525391 L 13.447266 19.894531 A 1.0001 1.0001 0 0 1 12.033203 19.148438 L 12 19.197266 L 7.8476562 12.96875 A 1.0001 1.0001 0 0 1 7.0527344 12.316406 L 6.2304688 9.8515625 z M 13 15 L 14 17 L 13 19 L 15 18 L 17 19 L 16 17 L 17 15 L 15 16 L 13 15 z '/>
          </SvgIcon>
        </IconButton>

        <Typography variant='h5'
          component='h1'
          noWrap
          sx={{
            display: {
              sm: 'block',
              xs: 'none',
            },
            flexGrow: 1,
          }}>
          {'FFBE Fragments'}
        </Typography>

        <OutlinedInput
          size='small'
          placeholder='Procurar unidade'
          value={searchInput}
          onChange={(e) => searchUnit(e.target.value)}
          startAdornment={(
            <InputAdornment position='start'>
              <SearchRounded />
            </InputAdornment>
          )}
          endAdornment={(
            <InputAdornment position='end'>
              <IconButton edge='end'
                disabled={searchInput.length === 0}
                sx={{opacity: searchInput.length !== 0 ? 0.9 : 0}}
                onClick={() => searchUnit('')}>
                <ClearRounded />
              </IconButton>
            </InputAdornment>
          )}
        />

        <Fab
          color='primary'
          onClick={handleAddDialogToggle}
          variant='extended'
          sx={fabStyles}>
          <AddRounded sx={{mr: 1}}/>
          {'Adicionar Unidade'}
        </Fab>

        <Tooltip title='Deletar tudo'
          arrow>
          <span>
            <IconButton
              disabled={unitCollection.length === 0}
              color='error'
              onClick={handleDeleteAllDialogToggle}>
              <DeleteForeverRounded/>
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}