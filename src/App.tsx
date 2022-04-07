import { CheckCircleOutlineRounded, DeleteOutlineRounded, EditRounded, RadioButtonUncheckedRounded, StarRounded, WarningAmberRounded } from '@mui/icons-material';
import { Checkbox, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import { Suspense, useState } from 'react';
import { AddUnitModal } from './components/AddUnitModal';
import { ApplicationBar } from './components/ApplicationBar';
import { DeleteAllModal } from './components/DeleteAllModal';
import { DeleteModal } from './components/DeleteModal';
import { EditUnitModal } from './components/EditUnitModal';
import { StyledTableHeaderCell } from './components/StyledTableHeadCell/styles';
import { useDialog } from './hooks/useDialog';
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

  const { unitCollection, selectUnit, awakenUnit, handleUnitToManipulate, searchInput } = useUnit();

  const { deleteUnitDialogToggle } = useDialog();

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

  function handleEditUnitModalState() {
    setOpenEditUnitModal(!openEditUnitModal);
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
    deleteUnitDialogToggle();
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

  return (
    <>
      <ApplicationBar />
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

      <AddUnitModal />

      <EditUnitModal
        modalState={openEditUnitModal}
        modalStateHandler={handleEditUnitModalState}/>

      <DeleteModal />

      <DeleteAllModal />
    </>
  );
}
