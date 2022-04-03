import { CloseRounded, SaveRounded } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useUnit } from '../../hooks/useUnit';

interface AddUnitModalProps {
  isOpen: boolean;
  openCloseFunction: () => void;
}

export function AddUnitModal({isOpen, openCloseFunction}: AddUnitModalProps) {
  const { addUnit } = useUnit();

  const [inputUnitName, setInputUnitName] = useState('');
  const [inputExLevel, setInputExLevel] = useState(0);
  const [inputFragments, setInputFragments] = useState(0);
  const [inputExtraUnits, setInputExtraUnits] = useState(0);
  const [inputNVAble, setInputNVAble] = useState(false);
 
  /**
   * 
   *  Resets fields
   * 
   */

  function resetFields() {
    setInputUnitName('');
    setInputExLevel(0);
    setInputFragments(0);
    setInputExtraUnits(0);
    setInputNVAble(false);
  }

  /**
   * 
   * Handle Submit
   * 
   */

  function handleSubmit(event: FormEvent)  {
    event.preventDefault();

    if(inputUnitName) {
      addUnit({
        name: inputUnitName,
        ex_level: inputExLevel,
        fragments: inputFragments,
        extra_units: inputExtraUnits,
        nva: inputNVAble,
      });
    
      openCloseFunction();
      resetFields();
    } else {
      const unitNameInput = document.getElementById('AddUnitNameInput');
      unitNameInput?.toggleAttribute('error');
      return;
    } 
  }

  /**
   * 
   * Handle Cancel
   * 
   */

  function handleCancel() {
    openCloseFunction();
    resetFields();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {openCloseFunction(); resetFields();}}
      maxWidth="xs"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {'Adicionar nova Unidade'}
        </DialogTitle>

        <DialogContent>
          <Grid container columns={2} spacing={1} sx={{marginTop:0}}>
            <Grid item xs={2}>
              <TextField
                label="Nome da unidade"
                fullWidth
                value={inputUnitName}
                onChange={(e) => setInputUnitName(e.target.value)}
                required
                id="AddUnitNameInput"
              />
            </Grid>

            <Grid item xs={1}>
              <TextField
                label="Fragmentos"
                type='number'
                inputProps={{ min: 0 }}
                value={inputFragments}
                onChange={(e) => setInputFragments(parseInt(e.target.value))}
              />
            </Grid>

            <Grid item xs={1}>
              <TextField
                label="Unidades Extra"
                type='number'
                inputProps={{ min: 0 }}
                value={inputExtraUnits}
                onChange={(e) => setInputExtraUnits(parseInt(e.target.value))}
              />
            </Grid>

            <Grid item xs={1}>
              <TextField
                label='Ex Level'
                value={inputExLevel}
                onChange={(e) => setInputExLevel(parseInt(e.target.value))}
                select
                fullWidth
              >
                <MenuItem value={0}>
                  {'Ex+0'}
                </MenuItem>
                <MenuItem value={1}>
                  {'Ex+1'}
                </MenuItem>
                <MenuItem value={2}>
                  {'Ex+2'}
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={1}>
              <FormControlLabel control={(
                <Switch
                  checked={inputNVAble}
                  onChange={() => setInputNVAble(!inputNVAble)}
                />
              )}
              label='NVA' />
            </Grid>
          </Grid>

          <Grid item xs={1}>

          </Grid>

        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            type='button'
            onClick={handleCancel}
            startIcon={(<CloseRounded/>)}
          >
            {'Cancelar'}
          </Button>

          <Button
            variant="contained"
            type='submit'
            disableElevation
            startIcon={(<SaveRounded/>)}
          >
            {'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}