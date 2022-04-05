import { DeleteForeverRounded } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, Switch} from '@mui/material';
import { useState } from 'react';
import { useUnit } from '../../hooks/useUnit';
import { StyledDrialogTitle } from '../StyledDrialogTitle';

export function DeleteAllModal({modalState, modalStateHandler}: ModalProps) {

  const { deleteAllUnits } = useUnit();

  const [deleteKey, setDeleteKey] = useState(false);

  function handleDelete(){
    deleteAllUnits();

    modalStateHandler();
    setDeleteKey(false);
  }

  function handleCancel() {
    modalStateHandler();
    setDeleteKey(false);
  }

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={modalState}
      onClose={modalStateHandler}>
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