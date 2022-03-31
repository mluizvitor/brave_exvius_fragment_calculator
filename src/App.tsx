import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Footer } from './components/Footer/styles';
import { Button, Button2, Checkbox, Form, Input } from './components/Form/styles';
import { Table } from './components/Table/styles';

interface UnitProps {
  id: string;
  name: string;
  ex_level: number;
  fragments?: number;
  extra_units?: number;
  nva?: boolean;
  fragment_needed: number;
}

export default function App() {
  const tableHeadTitles = [
    'Name',
    'EX Level',
    'Fragmentos',
    'Unidades Extras',
    'NVA',
    'Fragmentos necessários',
    'Pode ser despertado',
    'Ações'
  ];

  const [tableContent, setTableContent] = useState<UnitProps[]>(() => {
    const savedData = localStorage.getItem('@ffbe:fragments');
    
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });

  const [inputUnitName, setInputUnitName] = useState('');
  const [inputExLevel, setInputExLevel] = useState(0);
  const [inputFragments, setInputFragments] = useState(0);
  const [inputExtraUnits, setInputExtraUnits] = useState(0);
  const [inputNVAble, setInputNVAble] = useState(false);

  function fragmentNeededCalculator(exLevel: number, fragments: number, extraUnits: number, nva: boolean) {
    if (nva) {
      switch (exLevel) {
        case 1:
          return 75 - fragments - (extraUnits * 25);
        case 2:
          return 100 - fragments - (extraUnits * 25);
        default:
          return 50 - fragments - (extraUnits * 25);
      }
    } else {
      switch (exLevel) {
        case 1:
          return 100 - fragments - (extraUnits * 50);
        case 2:
          return 200 - fragments - (extraUnits * 50);
        default:
          return 50 - fragments - (extraUnits * 50);
      }
    }
  }

  function genId() {
    const charBase =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let newId = '';

    for (let i = 0; i < 16; i++) {
      newId += charBase.charAt(Math.floor(Math.random() * charBase.length));
    }

    return newId;
  }

  function handleReset() {
    setInputUnitName('');
    setInputExLevel(0);
    setInputFragments(0);
    setInputExtraUnits(0);
    setInputNVAble(false);
  }

  function handleDelete(unitId: string, unitName: string) {
    const newTableCotnent = [...tableContent].filter((tableRow) => tableRow.id !== unitId);
    toast.success(unitName + ' deletado(a) com sucesso', {icon: '👍'});
    setTableContent(newTableCotnent);
  }
  
  function handleDeleteAll() {
    setTableContent([]);
    toast.success('Todos os dados foram deletados', {icon: '👍'});
  }

  function handleUnitSave(event: FormEvent) {
    event.preventDefault();

    if(inputUnitName.length === 0) {
      alert('Unit Name must be filled');
      return;
    };

    const newTableContent = [...tableContent, {
      id: genId(),
      name: inputUnitName,
      ex_level: inputExLevel,
      fragments: inputFragments,
      extra_units: inputExtraUnits,
      nva: inputNVAble,
      fragment_needed: fragmentNeededCalculator(inputExLevel, inputFragments, inputExtraUnits, inputNVAble),
    }];

    newTableContent.sort((a, b)=> {
      return a.fragment_needed - b.fragment_needed;
    });

    setTableContent(newTableContent);

    toast.success(inputUnitName + ' adicionado(a) com sucesso', {icon: '👍'});

    handleReset();
  }

  useEffect(()=> {
    localStorage.setItem('@ffbe:fragments', JSON.stringify(tableContent));
    
  }, [tableContent]);

  return (
    <main>
      <h1>FFBE Fragments</h1>

      <Form onSubmit={handleUnitSave}>
        <Table>
          <thead>
            <tr>
              <th>
                <Input>
                  <label htmlFor="unitName">Unit name</label>
                  <input
                    id="unitName"
                    type="text"
                    placeholder="e.g. Elena"
                    value={inputUnitName}
                    onChange={(e) => setInputUnitName(e.target.value)}
                    required
                  />
                </Input>
              </th>

              <th>
                <Input>
                  <label htmlFor="exLevel">Ex Level</label>
                  <select
                    value={inputExLevel}
                    onChange={(e) => setInputExLevel(parseInt(e.target.value))}
                    required>
                    <option value={0}>Ex+0</option>
                    <option value={1}>Ex+1</option>
                    <option value={2}>Ex+2</option>
                  </select>
                </Input>
              </th>

              <th>
                <Input>
                  <label htmlFor="fragments">Fragments</label>
                  <input
                    id="fragments"
                    type="number"
                    min={0} placeholder="e.g. 50"
                    value={inputFragments}
                    onChange={(e) => setInputFragments(parseInt(e.target.value))}
                  />
                </Input>
              </th>

              <th>
                <Input>
                  <label htmlFor="extraUnits">Extra Units</label>
                  <input
                    id="extraUnits"
                    type="number"
                    min={0}
                    placeholder="e.g. 1"
                    value={inputExtraUnits}
                    onChange={(e) => setInputExtraUnits(parseInt(e.target.value))}
                  />
                </Input>
              </th>

              <th>
                <Checkbox>
                  <input
                    id="isNVAble"
                    type="checkbox"
                    min={0}
                    checked={inputNVAble}
                    onChange={(e) => setInputNVAble(e.target.checked)}/>
                  <label htmlFor="isNVAble">NVA</label>
                </Checkbox>
              </th>

              <th colSpan={2}>
                <Button type="submit">
                Adicionar
                </Button>
              </th>
              <th>
                <Button style={{background: '#ffaa00'}} type="button" onDoubleClick={() => {
                  handleReset;
                  toast.success('Campos resetados', {icon: '👍'});
                }
                } title="Clique duplo para resetar">
                  Resetar
                </Button>
              </th>
              <th>
                <Button style={{background: '#AA1100', color: '#ffffff'}} type="button" onDoubleClick={handleDeleteAll} title="Clique duplo para apagar tudo">
                  Deletar tudo
                </Button>
              </th>
            </tr>
          </thead>
        </Table>
      </Form>

      <Table>
        <thead>
          <tr>
            {tableHeadTitles.map((headTitle) => (
              <th key={headTitle}>{headTitle}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableContent && tableContent.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.name}</td>
              <td>{'EX+' + unit.ex_level}</td>
              <td>{unit.fragments}</td>
              <td>{unit.extra_units}</td>
              <td>{
                unit.nva && (
                  <input readOnly checked={true} type="checkbox" disabled/>
                )}
              </td>
              <td>{unit.fragment_needed >= 0 ? unit.fragment_needed : (Math.abs(unit.fragment_needed) + ' left over')}</td>
              <td>{
                unit.fragment_needed <= 0 && (
                  <input readOnly checked={true} type="checkbox" className="inputSuccess" disabled/>
                )}
              </td>

              <td>
                <Button2 onDoubleClick={() => handleDelete(unit.id, unit.name)} style={{backgroundColor: '#dde4f7'}}>
                  Deletar
                </Button2>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Footer>
        <p>
          <strong>FFBE Fragments Calculator</strong>, como o nome já diz vai ajudar
          a calcular quantos fragmentos restam para despertar uma unidade.
        </p>

        <p>
          <em>
            Os botões <strong>deletar</strong>, <strong>deletar tudo</strong> e
            <strong>resetar</strong> funcionam com toque duplo.
          </em>
        </p>
      </Footer>
    </main>
  );
}
