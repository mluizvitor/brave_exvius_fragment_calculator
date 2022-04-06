import { DeleteForeverRounded, DeleteOutlineRounded } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useUnit } from '../../hooks/useUnit';
import { StyledDrialogTitle } from '../StyledDrialogTitle';

export function DeleteModal({modalState, modalStateHandler}: ModalProps) {

  const { deleteSingleUnit, unitToManipulate: currentUnit, clearUnitToManipulate } = useUnit();

  function handleDelete(){
    deleteSingleUnit(currentUnit.id, currentUnit.name);

    modalStateHandler();
    clearUnitToManipulate();
  }

  function handleCancel() {
    modalStateHandler();
    clearUnitToManipulate();
  }

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={modalState}
      onClose={modalStateHandler}>
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