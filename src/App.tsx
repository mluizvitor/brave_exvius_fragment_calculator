import { AddRounded, CheckCircleOutlineRounded, ClearRounded, DeleteForeverRounded, DeleteOutlineRounded, EditRounded, RadioButtonUncheckedRounded, SearchRounded, StarRounded, WarningAmberRounded } from '@mui/icons-material';
import { AppBar, Checkbox, Container, Fab, IconButton, InputAdornment, OutlinedInput, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import { Suspense, useState } from 'react';
import { AddUnitModal } from './components/AddUnitModal';
import { DeleteAllModal } from './components/DeleteAllModal';
import { DeleteModal } from './components/DeleteModal';
import { EditUnitModal } from './components/EditUnitModal';
import { StyledTableHeaderCell } from './components/StyledTableHeadCell/styles';
import { useUnit } from './hooks/useUnit';

interface TableHeadTitleProps {
  id: string;
  title: string,
  align?: 'center' | 'left' | 'right';
  width?: number | string;
}

export default function App() {
  const tableHeadTitles: TableHeadTitleProps[] = [
    {
      id: 'selected',
      title: 'Treinando',
    },
    {
      id: 'name',
      title: 'Nome da Unidade',
      align: 'left',
      width: '100%',
    },
    {
      id: 'ex_level',
      title: 'EX Level',
      width: 8.5 * 16,
    },
    {
      id: 'fragments',
      title: 'Fragmentos',
      width: 8.5 * 16,
    },
    {
      id: 'extra_units',
      title: 'Unidades Extra',
      width: 8.5 * 16,
    },
    {
      id: 'nva',
      title: 'NVA',
      width: 8.5 * 16,
    },
    {
      id: 'fragment_needed',
      title: 'Fragmentos necessários',
      width: 8.5 * 16,
    },
    {
      id: 'can_awaken',
      title: 'Pode ser despertado',
      width: 8.5 * 16,
    },
    {
      id: 'actions',
      title: 'Ações',
      width: 9.5 * 16,
    }    
  ];

  const { unitCollection, selectUnit, awakenUnit, handleUnitToManipulate } = useUnit();

  const [searchInput, setSearchInput] = useState('');

  const [openAddUnitModal, setOpenAddUnitModal] = useState(false);
  const [openEditUnitModal, setOpenEditUnitModal] = useState(false);
  const [openDeleteUnitModal, setOpenDeleteUnitModal] = useState(false);
  const [openDeleteAllModal, setOpenDeleteAllModal] = useState(false);

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

  function handleDeleteUnitModalState() {
    setOpenDeleteUnitModal(!openDeleteUnitModal);
  }

  function handleDeleteAllModalState() {
    setOpenDeleteAllModal(!openDeleteAllModal);
  }

  function handleEditUnit(unitData: Unit){
    handleEditUnitModalState();
    handleUnitToManipulate(unitData);
  }

  function handleAwakenUnit(unitData: Unit) {
    handleUnitToManipulate(unitData);
    awakenUnit(unitData);
  }

  function handleDeleteUnit(unitData: Unit) {
    handleUnitToManipulate(unitData);
    handleDeleteUnitModalState();
  }

  function handleDeleteAllUnits() {
    handleDeleteAllModalState();
  }

  function handleUnitSelect(unitId: string) {
    selectUnit(unitId);
  }

  const containerStyles = {
    pt: {
      sm: 5.5,
      xs: 4.5,
    },
    pb: {
      md: 2,
      xs: 5,
    },
    pl: {
      md: 4,
      sm: 2,
      xs: 1,
    },
    pr: {
      md: 4,
      sm: 2,
      xs: 1,
    },
  };

  const fabStyles = {
    position: {
      md: 'static',
      xs: 'fixed',
    },
    bottom: {
      md: 0,
      xs: 16,
    },
    right: {
      md: 0,
      xs: 16,
    },
  };

  return (
    <>
      <AppBar
        position='fixed'
        color='default'
        sx={{
          alignItems: 'center',
        }}>
        <Toolbar
          sx={{ 
            pl: {
              md: 4,
              sm: 2,
              xs: 1,
            },
            pr: {
              md: 4,
              sm: 2,
              xs: 1,
            },
            width: '100%',
            maxWidth: 'xl',
            gap: 1,
          }}>
          <IconButton href='/brave_exvius_fragment_calculator'
            color='primary'>
            <SvgIcon>
              <path d='M 12 2 A 1.0001 1.0001 0 0 0 11.167969 2.4453125 L 9.4140625 5.0742188 L 9.7929688 6.2089844 L 10.832031 6.5546875 L 12 4.8027344 L 16.798828 12 L 14.908203 14.835938 L 15 14.882812 L 16.552734 14.105469 A 1.0001 1.0001 0 0 1 17.361328 14.068359 A 1.0001 1.0001 0 0 1 17.685547 14.275391 L 18.832031 12.554688 A 1.0001 1.0001 0 0 0 18.832031 11.445312 L 12.832031 2.4453125 A 1.0001 1.0001 0 0 0 12 2 z M 8.0019531 4 L 7.0019531 7 L 4.0019531 8 L 7.0019531 9 L 8.0019531 12 L 9.0019531 9 L 12.001953 8 L 9.0019531 7 L 8.0019531 4 z M 6.2304688 9.8515625 L 5.1679688 11.445312 A 1.0001 1.0001 0 0 0 5.1679688 12.554688 L 11.167969 21.554688 A 1.0001 1.0001 0 0 0 12.832031 21.554688 L 14.185547 19.525391 L 13.447266 19.894531 A 1.0001 1.0001 0 0 1 12.033203 19.148438 L 12 19.197266 L 7.8476562 12.96875 A 1.0001 1.0001 0 0 1 7.0527344 12.316406 L 6.2304688 9.8515625 z M 13 15 L 14 17 L 13 19 L 15 18 L 17 19 L 16 17 L 17 15 L 15 16 L 13 15 z '/>
            </SvgIcon>
          </IconButton>

          <Typography variant='h5'
            component='h1'
            noWrap
            sx={{
              display: {
                sm: 'block',
                xs: 'none',
              },
              flexGrow: 1,
            }}>
            {'FFBE Fragments'}
          </Typography>

          <OutlinedInput
            size='small'
            placeholder='Procurar unidade'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            startAdornment={(
              <InputAdornment position='start'>
                <SearchRounded />
              </InputAdornment>
            )}
            endAdornment={ (
              <InputAdornment position='end'>
                <IconButton edge='end'
                  disabled={searchInput.length === 0}
                  sx={{opacity: searchInput.length !== 0 ? 0.9 : 0}}
                  onClick={() => setSearchInput('')}>
                  <ClearRounded />
                </IconButton>
              </InputAdornment>
            )}
          />

          <Fab
            color='primary'
            onClick={handleAddUnitModalState}
            variant='extended'
            sx={fabStyles}>
            <AddRounded sx={{mr: 1}}/>
            {'Adicionar Unidade'}
          </Fab>

          <Tooltip title='Deletar tudo'
            arrow>
            <span>
              <IconButton
                disabled={unitCollection.length === 0}
                color='error'
                onClick={handleDeleteAllUnits}>
                <DeleteForeverRounded/>
              </IconButton>
            </span>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth='xl'
        sx={containerStyles}>

        <Suspense fallback='Carregando'>
          <Paper
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
            }} 
            variant='outlined'>
            <TableContainer
              sx={{
                maxHeight: {
                  md: 'calc(100vh - 88px - 32px - 52px - 2px)', // 100vh - top padding - bottom padding - TablePagination - correction
                  sm: 'calc(100vh - 88px - 80px - 52px - 2px)', // 100vh - top padding - bottom padding - TablePagination - correction
                  xs: 'calc(100vh - 72px - 80px - 52px - 2px)', // 100vh - top padding - bottom padding - TablePagination - correction
                },
                width: '100%',
              }}>
              <Table
                stickyHeader
                size='small'>
                <TableHead>
                  <TableRow>
                    {tableHeadTitles.map((headTitle) => (
                      <StyledTableHeaderCell key={headTitle.title}
                        align={headTitle.align}
                        style={{
                          width: (headTitle.width || 'auto'),
                          maxWidth: (headTitle.width || 'auto'),
                          minWidth: headTitle.width === '100%' ? 160 : headTitle.width,
                        }}>
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
                          <WarningAmberRounded sx={{height: 32, width: 32, mr: 1, verticalAlign: 'middle'}}
                            color='warning'/>
                          <Typography variant='subtitle2'
                            component='strong'
                            sx={{verticalAlign: 'middle'}}>
                            {'Nada por aqui'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                    : unitCollection
                      .filter((unit) => unit.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((unit) => {
                        return (
                          <TableRow key={unit.id}
                            hover>
                            <TableCell align='center'>
                              <Checkbox checked={unit.selected}
                                onClick={() => handleUnitSelect(unit.id)} />
                            </TableCell>
                            <TableCell>
                              {unit.name}
                            </TableCell>

                            <TableCell>
                              {unit.ex_level < 3 ?
                                `EX+${unit.ex_level} -> ${unit.ex_level + 1}` :
                                'Ex+3'}
                            </TableCell>

                            <TableCell>
                              {unit.fragments}
                            </TableCell>

                            <TableCell>
                              {unit.extra_units}
                              {unit.extra_units !== 0 && (
                                <Typography variant='caption'
                                  component='small'>
                                  {' ('}
                                  {((unit.nva ? 25 : 50) * unit?.extra_units)}
                                  {' frags)'}
                                </Typography>
                              )}
                            </TableCell>

                            <TableCell>
                              {unit.nva ? (
                                <CheckCircleOutlineRounded color='info' />
                              ) : (
                                <RadioButtonUncheckedRounded sx={{ opacity: 0.4 }} />
                              )}
                            </TableCell>

                            <TableCell>
                              {unit.fragment_needed === 9999 ?
                                '' :
                                unit.fragment_needed >= 0 ?
                                  unit.fragment_needed :
                                  (Math.abs(unit.fragment_needed) + ' a mais')}
                            </TableCell>

                            <TableCell>
                              {unit.can_awaken ? (
                                <CheckCircleOutlineRounded color='success' />
                              ) : (
                                <RadioButtonUncheckedRounded sx={{ opacity: 0.4 }} />
                              )}
                            </TableCell>

                            <TableCell sx={{ width: 'min-content' }}>
                              <Tooltip title={`Despertar ${unit.name}`}
                                arrow>
                                <span>
                                  <IconButton
                                    color='warning'
                                    onClick={() => handleAwakenUnit(unit)}
                                    disabled={unit.ex_level >= 3 || unit.fragment_needed > 0}>
                                    <StarRounded />
                                  </IconButton>
                                </span>
                              </Tooltip>

                              <Tooltip title={`Editar ${unit.name}`}
                                arrow>
                                <IconButton onClick={() => handleEditUnit(unit)}>
                                  <EditRounded />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title={`Deletar ${unit.name}`}
                                arrow>
                                <IconButton color='error'
                                  onClick={() => handleDeleteUnit(unit)}>
                                  <DeleteOutlineRounded />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component='div'
              count={unitCollection.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}/>
          </Paper>

        </Suspense>

      </Container>

      <AddUnitModal
        modalState={openAddUnitModal}
        modalStateHandler={handleAddUnitModalState}/>
      <EditUnitModal
        modalState={openEditUnitModal}
        modalStateHandler={handleEditUnitModalState}/>
      <DeleteModal
        modalState={openDeleteUnitModal}
        modalStateHandler={handleDeleteUnitModalState}/>
      <DeleteAllModal
        modalState={openDeleteAllModal}
        modalStateHandler={handleDeleteAllModalState}/>
    </>
  );
}
