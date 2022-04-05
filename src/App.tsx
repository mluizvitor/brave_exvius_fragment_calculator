import { AddRounded, CheckBoxOutlineBlankRounded, CheckBoxRounded, DeleteForeverRounded, DeleteOutlineRounded, EditRounded, WarningAmberRounded } from '@mui/icons-material';
import { AppBar, Container, Fab, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import { Suspense, useState } from 'react';
import { AddUnitModal } from './components/AddUnitModal';
import { EditUnitModal } from './components/EditUnitModal';
import { StyledTableHeaderCell } from './components/StyledTableHeadCell/styles';
import { useUnit } from './hooks/useUnit';


interface TableHeadTitleProps {
  id: string;
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
    },
    {
      id: 'ex_level',
      title: 'EX Level',
      width: 6.5 * 16,
    },
    {
      id: 'fragments',
      title: 'Fragmentos',
      width: 6.5 * 16,
    },
    {
      id: 'extra_units',
      title: 'Unidades Extra',
      width: 6.5 * 16,
    },
    {
      id: 'nva',
      title: 'NVA',
      width: 6.5 * 16,
    },
    {
      id: 'fragment_needed',
      title: 'Fragmentos necessários',
      width: 6.5 * 16,
    },
    {
      id: 'can_awaken',
      title: 'Pode ser despertado',
      width: 6.5 * 16,
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

  /**
   * 
   * Set pagination config
   * 
   */
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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
      <AppBar
        position='fixed'
        color='default'
        sx={{
          alignItems: 'center'
        }}
      >
        <Toolbar
          sx={{ 
            pl: {
              xs: 1
            },
            pr: {
              xs: 1
            },
            width: '100%',
            maxWidth: 'xl'
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
                sm: 0,
                xs: '50%',
              },
              width: {
                xs: 240
              },
              mr:{
                sm: 1,
                xs: (15 / 2) * -1,
              }
            }}
          >
            <AddRounded sx={{mr: 1}}/>
            {'Adicionar Unidade'}
          </Fab>

          <Tooltip title='Deletar tudo' arrow>
            <IconButton
              color='warning'
              onDoubleClick={deleteAllUnits}
            >
              <DeleteForeverRounded/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth='xl' sx={{
        pt: {
          sm: 5.5,
          xs: 4.5,
        },
        pb: {
          sm: 2,
          xs: 5
        },
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

        <Suspense fallback={(
          'Carregando'
        )}>

          <Paper
            sx={{
              borderRadius: 2,
              overflow: 'hidden'
            }} 
            variant='outlined'
          >
            <TableContainer
              sx={{
                maxHeight: {
                  sm: 'calc(100vh - 88px - 32px - 52px - 2px)',
                  xs: 'calc(100vh - 72px - 80px - 52px - 2px)'
                },
                width: '100%'
              }}
            >
              <Table
                stickyHeader
                size='small'
              >
                <TableHead>
                  <TableRow>
                    {tableHeadTitles.map((headTitle) => (
                      <StyledTableHeaderCell key={headTitle.title}
                        align={headTitle.align}
                        style={{
                          width: (headTitle.width ? Math.ceil(headTitle.width * 1.5) : 'auto'),
                          maxWidth: (headTitle.width ? Math.ceil(headTitle.width * 1.5) : 'auto'),
                          minWidth: (headTitle.width || 192)
                        }}
                      >
                        {headTitle.title}
                      </StyledTableHeaderCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {unitCollection.length === 0
                    ? (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <WarningAmberRounded sx={{height: 32, width: 32, mr: 1, verticalAlign: 'middle'}} color='warning'/>
                          <Typography variant='subtitle2' component='strong' sx={{verticalAlign: 'middle'}}>
                            {'Nada por aqui'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                    : unitCollection
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((unit) => (
                        <TableRow key={unit.id} hover>
                          <TableCell>
                            {unit.name}
                          </TableCell>

                          <TableCell>
                            {`EX+${unit.ex_level} -> ${unit.ex_level+1}`}
                          </TableCell>

                          <TableCell>
                            {unit.fragments}
                          </TableCell>

                          <TableCell>
                            {unit.extra_units}
                            {unit.extra_units !== 0 && (
                              <Typography variant='caption' component='small'>
                                {' ('}
                                {((unit.nva ? 25 : 50) * unit?.extra_units)}
                                {' frags)'}
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell>
                            {unit.nva ? (
                              <CheckBoxRounded color='primary'/>
                            ):(
                              <CheckBoxOutlineBlankRounded sx={{opacity: 0.6}}/>
                            )}
                          </TableCell>

                          <TableCell>
                            {unit.fragment_needed >= 0  ?
                              unit.fragment_needed :
                              (Math.abs(unit.fragment_needed) + ' a mais')
                            }
                          </TableCell>

                          <TableCell>
                            {unit.can_awaken ? (
                              <CheckBoxRounded color='success'/>
                            ):(
                              <CheckBoxOutlineBlankRounded sx={{opacity: 0.6}}/>
                            )}
                          </TableCell>

                          <TableCell>
                            <Tooltip title={`Editar ${unit.name}`} arrow>
                              <IconButton onClick={() => handleEditUnit(unit)}>
                                <EditRounded/>
                              </IconButton>
                            </Tooltip>

                            <Tooltip title={`Deletar ${unit.name}`} arrow>
                              <IconButton onDoubleClick={() => deleteSingleUnit(unit.id, unit.name)}>
                                <DeleteOutlineRounded color='error'/>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component='div'
              count={unitCollection.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Paper>

        </Suspense>

      </Container>
    </>
  );
}
