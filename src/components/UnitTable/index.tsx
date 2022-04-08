import { CheckCircleOutlineRounded, DeleteOutlineRounded, EditRounded, RadioButtonUncheckedRounded, StarRounded, WarningAmberRounded } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import { useDialog } from '../../hooks/useDialog';
import { useUnit } from '../../hooks/useUnit';
import { StyledContainer, StyledPaper, StyledTableContainer, StyledTableHeaderCell } from './styles';

interface TableHeadTitleProps {
  id: string;
  title: string,
  align?: 'center' | 'left' | 'right';
  width?: number | string;
}

const tableHeadTitles: TableHeadTitleProps[] = [
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

export function UnitTable() {
  const { unitCollection, selectUnit, awakenUnit, handleUnitToManipulate, searchInput } = useUnit();
  const { editUnitDialogToggle, deleteUnitDialogToggle } = useDialog();

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

  function handleEditUnit(unitData: Unit){
    editUnitDialogToggle();
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

  return (
    <StyledContainer maxWidth='xl'>

      <Suspense fallback='Carregando'>
        <StyledPaper
          elevation={2}>
          <StyledTableContainer>
            <Table
              stickyHeader
              size='small'>
              <TableHead>
                <TableRow>
                  <StyledTableHeaderCell align='center'>
                    <Tooltip title='Unidades em Treinamento'
                      arrow>
                      <SvgIcon sx={{width: 40}}>
                        <path d='M6.92,5H5L14,14L15,13.06M19.96,19.12L19.12,19.96C18.73,20.35 18.1,20.35 17.71,19.96L14.59,16.84L11.91,19.5L10.5,18.09L11.92,16.67L3,7.75V3H7.75L16.67,11.92L18.09,10.5L19.5,11.91L16.83,14.58L19.95,17.7C20.35,18.1 20.35,18.73 19.96,19.12Z' />
                      </SvgIcon>
                    </Tooltip>
                  </StyledTableHeaderCell>
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
          </StyledTableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={unitCollection.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}/>
        </StyledPaper>

      </Suspense>

    </StyledContainer>
  );
}