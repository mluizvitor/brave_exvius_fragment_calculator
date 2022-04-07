import { DeleteForeverRounded } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, Switch} from '@mui/material';
import { useState } from 'react';
import { useDialog } from '../../hooks/useDialog';
import { useUnit } from '../../hooks/useUnit';
import { StyledDrialogTitle } from '../StyledDrialogTitle';

export function DeleteAllModal() {

  const { deleteAllUnits } = useUnit();
  const { deleteAllDialogToggle, deleteAllDialogState } = useDialog();

  const [deleteKey, setDeleteKey] = useState(false);

  function handleDelete(){
    deleteAllUnits();

    deleteAllDialogToggle();
    setDeleteKey(false);
  }

  function handleCancel() {
    deleteAllDialogToggle();
    setDeleteKey(false);
  }

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={deleteAllDialogState}
      onClose={deleteAllDialogToggle}>
      <StyledDrialogTitle
        icon={<DeleteForeverRounded />}
        title='Deletar Tudo'/>

      <DialogContent dividers>
        {'Tem certeza que deseja deletar todas as unidades? Essa operação não poderá ser desfeita.'}

        <FormControlLabel
          control={
            <Switch
              checked={deleteKey}
              onChange={() => setDeleteKey(!deleteKey)}/>
          }
          label='Ative esta chave para liberar a exclusão'
          sx={{mt: 1}}/>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleCancel}
          disableElevation
          fullWidth
          variant='outlined'>
          {'Não deletar'}
        </Button>

        <Button
          disabled={!deleteKey}
          onClick={handleDelete}
          disableElevation
          fullWidth
          variant='contained'
          color='error'>
          {'Deletar Tudo'}
        </Button>
      </DialogActions>

    </Dialog>
  );
}