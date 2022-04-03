import { AddRounded, DeleteForeverRounded } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { MdDelete, MdInfo } from 'react-icons/md';
import { AddUnitModal } from './components/AddUnitModal';
import { Button2 } from './components/Form/styles';
import { Table, TableCanvas, TableEmpty } from './components/Table/styles';
import { useUnit } from './hooks/useUnit';


export default function App() {
  const tableHeadTitles = [
    'Nome da Unidade',
    'EX Level',
    'Fragmentos',
    'Unidades Extra',
    'NVA',
    'Fragmentos necessários',
    'Pode ser despertado',
    'Ações'
  ];

  const { unitCollection, deleteSingleUnit } = useUnit();

  const [openAddUnitModal, setOpenAddUnitModal] = useState(false);

  function handleOpenClose() {
    setOpenAddUnitModal(!openAddUnitModal);
  }

  return (
    <main>
      <AddUnitModal isOpen={openAddUnitModal} openCloseFunction={handleOpenClose}/>
      <div>
        <Typography variant='h2' component='h1' sx={{color: 'surface.main'}}>
          {'FFBE Fragments'}
        </Typography>

        <Button
          onClick={handleOpenClose}
          disableElevation
          variant='contained'
          startIcon={(<AddRounded/>)}
        >
          {'Add Unit'}
        </Button>

        <Button
          variant='outlined'
          color='warning'
          startIcon={(<DeleteForeverRounded/>)}
        >
          {'Deletar tudo'}
        </Button>

      </div>

      {unitCollection.length === 0
        ? (
          <TableEmpty>
            <MdInfo size={32}/>
            <h2>Nada por aqui</h2>
          </TableEmpty>
        )
        : (
          <TableCanvas>
            <Table>
              <thead>
                <tr>
                  {tableHeadTitles.map((headTitle) => (
                    <th key={headTitle}>{headTitle}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {unitCollection && unitCollection.map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.name}</td>
                    <td>{'EX+' + unit.ex_level + ' -> ' + (unit.ex_level + 1)}</td>
                    <td>{unit.fragments}</td>
                    <td>{unit.extra_units}

                      {unit.extra_units !== 0 && (
                        <small>
                          {' ('}
                          {((unit.nva ? 25 : 50) * unit?.extra_units)}
                          {' frags)'}
                        </small>
                      )}
                    
                    </td>
                    <td>{
                      unit.nva && (
                        <input readOnly checked={true} type="checkbox" disabled/>
                      )}
                    </td>
                    <td>{unit.fragment_needed >= 0 ? unit.fragment_needed : ('Sobram ' + Math.abs(unit.fragment_needed))}</td>
                    <td>{
                      unit.fragment_needed <= 0 && (
                        <input readOnly checked={true} type="checkbox" className="inputSuccess" disabled/>
                      )}
                    </td>

                    <td>
                      <Button2 onDoubleClick={() => deleteSingleUnit(unit.id, unit.name)} style={{backgroundColor: '#dde4f7'}}>
                        <MdDelete size={16}/>
                        <span>Deletar</span>
                      </Button2>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableCanvas>
        )}
    </main>
  );
}
