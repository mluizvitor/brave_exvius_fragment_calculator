import { AddCircleRounded, CloseRounded, EditRounded, RefreshRounded, RemoveCircleRounded, SaveRounded } from '@mui/icons-material';
import {
  Box, Button, Dialog,
  DialogActions, DialogContent, FormControl,
  FormControlLabel, Grid, IconButton,
  InputAdornment, InputLabel, MenuItem,
  OutlinedInput, Switch, TextField, Tooltip
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useUnit } from '../../hooks/useUnit';
import { StyledDrialogTitle } from '../StyledDrialogTitle';

export function EditUnitModal({modalState, modalStateHandler}: ModalProps) {
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

    const newData: Unit = {
      ...unitToManipulate,
      name: inputUnitName,
      ex_level: inputExLevel,
      fragments: inputFragments,
      extra_units: inputExtraUnits,
      nva: inputNVAble,
    };

    editUnit(newData);

    modalStateHandler();
  }

  /**
   * 
   * Cancel edit, close Dialog and cleat unitToManipulateState
   * 
   */

  function handleCancel() {
    modalStateHandler();
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

  function handleAddFiveFrags() {
    setInputFragments(inputFragments + 5);
  }

  function handleRemoveFiveFrags() {
    if (inputFragments < 5 ) {
      setInputFragments(0);
      return;
    }
    setInputFragments(inputFragments - 5);
  }

  function handleAddOneUnit() {
    setInputExtraUnits(inputExtraUnits + 1);
  }

  function handleRemoveOneUnit() {
    if (inputExtraUnits < 0 ) {
      return;
    }
    setInputExtraUnits(inputExtraUnits - 1);
  }

  /**
   * 
   * Sync Input with unitToManipulate
   * 
   */
  useEffect(()=>{
    resetInputToOriginalData();
  }, [unitToManipulate]);

  useEffect(()=>{
    !inputFragments && setInputFragments(0);
    !inputExtraUnits && setInputExtraUnits(0);

  }, [inputFragments, inputExtraUnits]);

  return (
    <Dialog
      open={modalState}
      onClose={handleCancel}
      maxWidth='sm'
      fullWidth>
      <form onSubmit={handleSubmit}>

        <StyledDrialogTitle
          icon={<EditRounded/>}
          title='Editar Unidade'
        />

        <DialogContent dividers>
          <Grid container
            columns={{xs: 2}}
            spacing={1}>
            <Grid item
              xs={2}>
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

            <Grid item
              xs={1}>
              <FormControl variant='outlined'>
                <InputLabel htmlFor='fragment-input-edit-adornment'>{'Fragmentos'}</InputLabel>
                <OutlinedInput id='fragment-input-edit-adornment'
                  label='Fragmentos'
                  type='number'
                  inputProps={{ min: 0 }}
                  value={inputFragments}
                  onChange={(e) => setInputFragments(parseInt(e.target.value))}
                  onFocus={(e) => e.target.select()}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton edge='end'
                        disabled={inputFragments <= 0 || !inputFragments}
                        onClick={handleRemoveFiveFrags}>
                        <RemoveCircleRounded />
                      </IconButton>
                      <IconButton edge='end'
                        onClick={handleAddFiveFrags}>
                        <AddCircleRounded />
                      </IconButton>
                    </InputAdornment>
                  }/>
              </FormControl>
            </Grid>

            <Grid item
              xs={1}>
              <FormControl variant='outlined'>
                <InputLabel htmlFor='extra-unit-input-edit-adornment'>{'Unidades Extra'}</InputLabel>
                <OutlinedInput id='extra-unit-input-edit-adornment'
                  label='Unidades Extra'
                  type='number'
                  inputProps={{ min: 0 }}
                  value={inputExtraUnits}
                  onChange={(e) => setInputExtraUnits(parseInt(e.target.value))}
                  onFocus={(e) => e.target.select()}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton edge='end'
                        disabled={inputExtraUnits <= 0 || !inputExtraUnits}
                        onClick={handleRemoveOneUnit}>
                        <RemoveCircleRounded />
                      </IconButton>
                      <IconButton edge='end'
                        onClick={handleAddOneUnit}>
                        <AddCircleRounded />
                      </IconButton>
                    </InputAdornment>
                  }/>
              </FormControl>
            </Grid>

            <Grid item
              xs={1}>
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
                <MenuItem value={3}>
                  {'Ex+3'}
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item
              xs={1}>
              <FormControlLabel control={(
                <Switch
                  checked={inputNVAble}
                  onChange={() => setInputNVAble(!inputNVAble)}
                />
              )}
              label='NVA' />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Box sx={{
            flexGrow: 1,
          }}>
            <Tooltip title='Reiniciar campos para os valores originais'
              arrow>
              <IconButton type='reset'
                onClick={resetInputToOriginalData}>
                <RefreshRounded/>
              </IconButton>
            </Tooltip>
          </Box>
          
          <Button
            variant='outlined'
            type='button'
            onClick={handleCancel}
            startIcon={(<CloseRounded/>)}>
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