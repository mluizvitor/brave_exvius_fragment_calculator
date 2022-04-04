import { AddRounded, DeleteForeverRounded, DeleteRounded, EditRounded, WarningAmberRounded } from '@mui/icons-material';
import { AppBar, Checkbox, Container, Fab, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { Suspense, useState } from 'react';
import { AddUnitModal } from './components/AddUnitModal';
import { EditUnitModal } from './components/EditUnitModal';
import { useUnit } from './hooks/useUnit';

interface Unit {
  id: string;
  name: string;
  ex_level: number;
  fragments: number;
  extra_units: number;
  nva: boolean;
  fragment_needed: number;
  can_awaken: boolean;
}

interface TableHeadTitleProps {
  id: 'name' | 'ex_level' | 'fragments' | 'extra_units' | 'nva' | 'fragment_needed' | 'can_awaken' | 'actions';
  title: string,
  align?: 'center' | 'left' | 'right';
  width?: number;
}

export default function App() {
  const tableHeadTitles: TableHeadTitleProps[] = [
    {
      id: 'name',
      title: 'Nome da Unidade',
      align: 'left',
      width: 12 * 16
    },
    {
      id: 'ex_level',
      title: 'EX Level',
      align: 'center',
      width: 9 * 16,
    },
    {
      id: 'fragments',
      title: 'Fragmentos',
      width: 9 * 16,
    },
    {
      id: 'extra_units',
      title: 'Unidades Extra',
      width: 9 * 16,
    },
    {
      id: 'nva',
      title: 'NVA',
      align: 'center',
      width: 9 * 16,
    },
    {
      id: 'fragment_needed',
      title: 'Fragmentos necessários',
      width: 9 * 16,
    },
    {
      id: 'can_awaken',
      title: 'Pode ser despertado',
      align: 'center',
      width: 9 * 16,
    },
    {
      id: 'actions',
      title: 'Ações',
      width: 7 *16
    }    
  ];

  const { unitCollection, deleteSingleUnit, deleteAllUnits, handleUnitToManipulate } = useUnit();

  const [openAddUnitModal, setOpenAddUnitModal] = useState(false);
  const [openEditUnitModal, setOpenEditUnitModal] = useState(false);

  function handleAddUnitModalState() {
    setOpenAddUnitModal(!openAddUnitModal);
  }

  function handleEditUnitModalState() {
    setOpenEditUnitModal(!openEditUnitModal);
  }

  function handleEditUnit(unitData: Unit){
    handleEditUnitModalState();
    handleUnitToManipulate(unitData);
  }

  return (
    <>
      <Container maxWidth='xl' sx={{
        mt: 6,
        mb: 6,
        pl: {
          xs: 1
        },
        pr: {
          xs: 1
        }
      }}
      >
        <AddUnitModal isOpen={openAddUnitModal} openCloseFunction={handleAddUnitModalState}/>
        <EditUnitModal isOpen={openEditUnitModal} openCloseFunction={handleEditUnitModalState}/>

        <AppBar
          position="fixed"
          color='default'
        >
          <Toolbar
            sx={{ 
              pl: {
                xs: 1
              },
              pr: {
                xs: 1
              }
            }}
          >
            <Typography variant='h5' component='h1' sx={{flexGrow: 1}}>
              {'FFBE Fragments'}
            </Typography>

            {/* <Stack spacing={1} direction='row' > */}
            <Fab
              color='primary'
              onClick={handleAddUnitModalState}
              variant='extended'
              sx={{
                position: {
                  sm: 'inherit',
                  xs: 'fixed'
                },
                bottom: {
                  sm: 0,
                  xs: 16
                },
                right: {
                  xs: 16,
                },
              }}
            >
              <AddRounded sx={{mr: 1}}/>
              {'Adicionar Unidade'}
            </Fab>

            <IconButton
              color='warning'
              onDoubleClick={deleteAllUnits}
            >
              <DeleteForeverRounded/>
            </IconButton>
            {/* </Stack> */}
          </Toolbar>
        </AppBar>

      
        <Suspense fallback={(
          'Carregando'
        )}>

          <Paper sx={{borderRadius: 2, overflow: 'hidden'}} variant='outlined'>
            <TableContainer sx={{maxHeight: 'calc(100vh - 192px - 2px)'}}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {tableHeadTitles.map((headTitle) => (
                      <TableCell key={headTitle.title}
                        align={headTitle.align}
                        style={{width: (headTitle.width ? headTitle.width * 1.15 : 'auto'), minWidth: headTitle.width}}
                      >
                        {headTitle.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {unitCollection.length === 0
                    ? (
                      <TableRow>
                        <TableCell colSpan={8} >
                          <WarningAmberRounded sx={{height: 32, width: 32, mr: 1, verticalAlign: 'middle'}} color='warning'/>
                          <Typography variant='subtitle2' component='strong' sx={{verticalAlign: 'middle'}}>
                            {'Nada por aqui'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                    : unitCollection.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>
                          {unit.name}
                        </TableCell>

                        <TableCell
                          align='center'
                        >
                          {`EX+${unit.ex_level} -> ${unit.ex_level+1}`}
                        </TableCell>

                        <TableCell>
                          {unit.fragments}
                        </TableCell>

                        <TableCell>
                          {unit.extra_units}
                          {unit.extra_units !== 0 && (
                            <Typography variant="caption" component="small">
                              {' ('}
                              {((unit.nva ? 25 : 50) * unit?.extra_units)}
                              {' frags)'}
                            </Typography>
                          )}
                        </TableCell>

                        <TableCell
                          align='center'
                        >
                          {unit.nva ? (
                            <Checkbox readOnly checked={true} tabIndex={-1} disableRipple/>
                          ):(
                            <Checkbox readOnly checked={false} tabIndex={-1} disableRipple/>
                          )}
                        </TableCell>

                        <TableCell>
                          {unit.fragment_needed >= 0  ?
                            unit.fragment_needed :
                            (Math.abs(unit.fragment_needed) + ' a mais')
                          }
                        </TableCell>

                        <TableCell
                          align='center'
                        >
                          {unit.can_awaken ? (
                            <Checkbox readOnly color="success" checked={true} tabIndex={-1} disableRipple/>
                          ):(
                            <Checkbox readOnly checked={false} tabIndex={-1} disableRipple/>
                          )}
                        </TableCell>

                        <TableCell>
                          <IconButton onClick={() => handleEditUnit(unit)}>
                            <EditRounded/>
                          </IconButton>

                          <IconButton onDoubleClick={() => deleteSingleUnit(unit.id, unit.name)}>
                            <DeleteRounded/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

        </Suspense>

      </Container>
    </>
  );
}
