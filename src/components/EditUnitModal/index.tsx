import { CloseRounded, RefreshRounded, SaveRounded } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, MenuItem, Switch, TextField, Tooltip } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useUnit } from '../../hooks/useUnit';

interface EditUnitModalProps {
  isOpen: boolean;
  openCloseFunction: () => void;
}

export function EditUnitModal({isOpen, openCloseFunction}: EditUnitModalProps) {
  const { editUnit, unitToManipulate, clearUnitToManipulate } = useUnit();

  /**
   * 
   * Handle Input
   * 
   */

  const [inputUnitName, setInputUnitName] = useState(unitToManipulate.name);
  const [inputExLevel, setInputExLevel] = useState(unitToManipulate.ex_level);
  const [inputFragments, setInputFragments] = useState(unitToManipulate.fragments);
  const [inputExtraUnits, setInputExtraUnits] = useState(unitToManipulate.extra_units);
  const [inputNVAble, setInputNVAble] = useState(unitToManipulate.nva);
 
  /**
   * 
   * Send new Unit data to replace previous
   * 
   */

  function handleSubmit(event: FormEvent)  {
    event.preventDefault();

    editUnit({
      name: inputUnitName,
      ex_level: inputExLevel,
      fragments: inputFragments,
      extra_units: inputExtraUnits,
      nva: inputNVAble,
    });

    openCloseFunction();
  }

  /**
   * 
   * Cancel edit, close Dialog and cleat unitToManipulateState
   * 
   */

  function handleCancel() {
    openCloseFunction();
    clearUnitToManipulate();
  }

  /**
   * 
   * Reset Input fields to original Unit data
   * 
   */

  function resetInputToOriginalData() {
    setInputUnitName(unitToManipulate.name);
    setInputExLevel(unitToManipulate.ex_level);
    setInputFragments(unitToManipulate.fragments);
    setInputExtraUnits(unitToManipulate.extra_units);
    setInputNVAble(unitToManipulate.nva);
  }

  /**
   * 
   * Sync Input with unitToManipulate
   * 
   */
  useEffect(()=>{
    resetInputToOriginalData();
  }, [unitToManipulate]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      maxWidth='sm'
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {'Editar Unidade'}
        </DialogTitle>

        <DialogContent>
          <Grid container columns={{xs: 2, sm: 3}} spacing={1} sx={{marginTop:0}}>
            <Grid item xs={2} order={0}>
              <TextField
                label='Nome da unidade'
                fullWidth
                value={inputUnitName}
                onChange={(e) => setInputUnitName(e.target.value)}
                required
                autoFocus={true}
                autoComplete=''
                id='EditUnitNameInput'
              />
            </Grid>

            <Grid item xs={1} order={{xs: 1, sm: 3}}>
              <TextField
                label='Fragmentos'
                type='number'
                inputProps={{ min: 0 }}
                value={inputFragments}
                onChange={(e) => setInputFragments(parseInt(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
            </Grid>

            <Grid item xs={1} order={{xs: 2, sm: 4}}>
              <TextField
                label='Unidades Extra'
                type='number'
                inputProps={{ min: 0 }}
                value={inputExtraUnits}
                onChange={(e) => setInputExtraUnits(parseInt(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
            </Grid>

            <Grid item xs={1} order={{xs: 3, sm: 2}}>
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

            <Grid item xs={1} order={{xs: 4, sm: 1}}>
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
          <Box sx={{flexGrow: 1}}>
            <Tooltip title='Reiniciar campos para os valores originais' arrow>
              <IconButton type='reset' onClick={resetInputToOriginalData}>
                <RefreshRounded/>
              </IconButton>
            </Tooltip>
          </Box>
          
          <Button
            variant='outlined'
            type='button'
            onClick={handleCancel}
            startIcon={(<CloseRounded/>)}
          >
            {'Cancelar'}
          </Button>

          <Button
            variant='contained'
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