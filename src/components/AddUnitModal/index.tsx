import { CloseRounded, RefreshRounded, SaveRounded } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, MenuItem, Switch, TextField, Tooltip } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useUnit } from '../../hooks/useUnit';

interface AddUnitModalProps {
  isOpen: boolean;
  openCloseFunction: () => void;
}

export function AddUnitModal({isOpen, openCloseFunction}: AddUnitModalProps) {
  const { addUnit, unitToManipulate, clearUnitToManipulate } = useUnit();

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
    
    openCloseFunction();
  }

  /**
   * 
   * Handle Cancel
   * 
   */

  function handleCancel() {
    openCloseFunction();
    clearUnitToManipulate();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      maxWidth='sm'
      fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {'Adicionar Nova Unidade'}
        </DialogTitle>

        <DialogContent>
          <Grid container
            columns={{xs: 2}}
            spacing={1}
            sx={{pt: 0.5}}>
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
            startIcon={(<CloseRounded/>)}
            aria-label='Cancelar'
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