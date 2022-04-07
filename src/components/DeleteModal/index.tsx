import { DeleteOutlineRounded } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useDialog } from '../../hooks/useDialog';
import { useUnit } from '../../hooks/useUnit';
import { StyledDrialogTitle } from '../StyledDrialogTitle';

export function DeleteModal() {
  const { deleteSingleUnit, unitToManipulate: currentUnit, clearUnitToManipulate } = useUnit();

  const { deleteUnitDialogToggle, deleteUnitDialogState } = useDialog();

  function handleDelete(){
    deleteSingleUnit(currentUnit.id, currentUnit.name);

    deleteUnitDialogToggle();
    clearUnitToManipulate();
  }

  function handleCancel() {
    deleteUnitDialogToggle();
    clearUnitToManipulate();
  }

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={deleteUnitDialogState}
      onClose={deleteUnitDialogToggle}>
      <StyledDrialogTitle
        icon={<DeleteOutlineRounded />}
        title={`Deletar ${currentUnit.name}`}/>

      <DialogContent dividers>
        {'Tem certeza que deseja excluir '}
        <strong>{currentUnit.name}</strong>
        {' com raridade '}
        <strong>{`EX+${currentUnit.ex_level}?`}</strong>
      </DialogContent>

      <DialogActions>
        <Button
          fullWidth
          onClick={handleCancel}
          variant='outlined'>
          {'Não deletar'}
        </Button>

        <Button
          fullWidth
          onClick={handleDelete}
          disableElevation
          color='error'
          variant='contained'>
          {'Deletar'}
        </Button>
      </DialogActions>

    </Dialog>
  );
}