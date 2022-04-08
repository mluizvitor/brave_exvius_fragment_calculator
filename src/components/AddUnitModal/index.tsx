import { CloseRounded, PersonAddAltRounded, RefreshRounded, SaveRounded } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, IconButton, MenuItem, Switch, TextField, Tooltip } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useDialog } from '../../hooks/useDialog';
import { useUnit } from '../../hooks/useUnit';
import { StyledDrialogTitle } from '../StyledDrialogTitle';

export function AddUnitModal() {
  const { addUnit, unitToManipulate, clearUnitToManipulate } = useUnit();
  const { addUnitDialogToggle, addUnitDialogState } = useDialog();

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
    * Sync Input with unitToManipulate
    * 
    */
  useEffect(()=>{
    setInputUnitName(unitToManipulate.name);
    setInputExLevel(unitToManipulate.ex_level);
    setInputFragments(unitToManipulate.fragments);
    setInputExtraUnits(unitToManipulate.extra_units);
    setInputNVAble(unitToManipulate.nva);
  }, [unitToManipulate]);

  /**
   * 
   * Handle Submit
   * 
   */

  function handleSubmit(event: FormEvent)  {
    event.preventDefault();

    addUnit({
      name: inputUnitName,
      ex_level: inputExLevel,
      fragments: inputFragments,
      extra_units: inputExtraUnits,
      nva: inputNVAble,
    });
    
    addUnitDialogToggle();
  }

  /**
   * 
   * Handle Cancel
   * 
   */

  function handleCancel() {
    addUnitDialogToggle();
    clearUnitToManipulate();
  }

  return (
    <Dialog
      open={addUnitDialogState}
      onClose={handleCancel}
      maxWidth='sm'
      fullWidth>
      <form onSubmit={handleSubmit}>

        <StyledDrialogTitle
          icon={<PersonAddAltRounded />}
          title='Adicionar Nova Unidade'
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
                id='AddUnitNameInput'
              />
            </Grid>

            <Grid item
              xs={1}>
              <TextField
                label='Fragmentos'
                type='number'
                inputProps={{ min: 0 }}
                value={inputFragments}
                onChange={(e) => setInputFragments(parseInt(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
            </Grid>

            <Grid item
              xs={1}>
              <TextField
                label='Unidades Extra'
                type='number'
                inputProps={{ min: 0 }}
                value={inputExtraUnits}
                onChange={(e) => setInputExtraUnits(parseInt(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
            </Grid>

            <Grid item
              xs={1}>
              <TextField
                label='Ex Level'
                value={inputExLevel}
                onChange={(e) => setInputExLevel(parseInt(e.target.value))}
                select
                fullWidth>
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
                  onChange={() => setInputNVAble(!inputNVAble)}/>
              )}
              label='NVA' />
            </Grid>
          </Grid>

        </DialogContent>

        <DialogActions>
          <Box sx={{flexGrow: 1}}>
            <Tooltip title='Reiniciar campos'
              arrow>
              <IconButton type='reset'
                onClick={clearUnitToManipulate}>
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
            startIcon={(<SaveRounded/>)}>
            {'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}