import { FormEvent, useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdDeleteForever, MdHelpOutline, MdInfo, MdRefresh, MdRemove } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Footer } from './components/Footer/styles';
import { Button, Button2, Checkbox, Form, FormAssist, FormBody, Input, InputNumberButton, InputNumberButtonContainer } from './components/Form/styles';
import { Table, TableCanvas, TableEmpty } from './components/Table/styles';


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
    'Nome da Unidade',
    'EX Level',
    'Fragmentos',
    'Unidades Extra',
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
  
  function handleShowBanner() {
    const infoBanner = document.getElementById('infoBanner');
    infoBanner?.classList.add('banner-show');
  }

  function handleHideBanner() {
    const infoBanner = document.getElementById('infoBanner');
    setTimeout(() => {
      infoBanner?.classList.remove('banner-show');
    }, 500);
  }

  useEffect(()=> {
    localStorage.setItem('@ffbe:fragments', JSON.stringify(tableContent));
    
  }, [tableContent]);

  return (
    <main>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <h1>FFBE Fragments</h1>

        <Button id='infoButton' className='infoButton' onClick={handleShowBanner}>
          <MdHelpOutline size={24}/>
        </Button>

        <Footer
          id='infoBanner'
          onMouseLeave={handleHideBanner}
        >
          <MdClose size={24} onClick={handleHideBanner} style={{position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer'}}/>
          <p>
            <strong>FFBE Fragments Calculator</strong>, como o nome já diz vai ajudar
          a calcular quantos fragmentos restam para despertar uma unidade.
          </p>

          <p>
            Os botões <strong>deletar</strong>, <strong>deletar tudo</strong> e {' '}
            <strong>resetar campos</strong> funcionam com toque duplo.
          </p>
        </Footer>

      </div>

      <header>
        <Form onSubmit={handleUnitSave}>
          <FormBody>
            <Input>
              <label htmlFor="unitName">Nome da Unidade</label>
              <input
                id="unitName"
                type="text"
                placeholder="e.g. Elena"
                value={inputUnitName}
                onChange={(e) => setInputUnitName(e.target.value)}
                required
              />
            </Input>
                
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
                
            <Input>
              <label htmlFor="fragments">Fragmentos</label>
              <div className="inputNumber">
                <input
                  id="fragments"
                  type="number"
                  min={0} placeholder="e.g. 50"
                  value={inputFragments}
                  onChange={(e) => setInputFragments(parseInt(e.target.value))}
                />
                <InputNumberButtonContainer>
                  <InputNumberButton
                    onClick={() => setInputFragments(inputFragments + 1)}
                    type='button'
                  >
                    <MdAdd size={16}/>
                  </InputNumberButton>

                  <InputNumberButton
                    onClick={() => inputFragments > 0 && setInputFragments(inputFragments - 1)}
                    type='button'
                  >
                    <MdRemove size={16}/>
                  </InputNumberButton>
                </InputNumberButtonContainer>
              </div>
            </Input>
                
            <Input>
              <label htmlFor="extraUnits">Unidades Extra</label>
              <div className='inputNumber'>
                <input
                  id="extraUnits"
                  type="number"
                  min={0}
                  placeholder="e.g. 1"
                  value={inputExtraUnits}
                  onChange={(e) => setInputExtraUnits(parseInt(e.target.value))}
                />
                <InputNumberButtonContainer>
                  <InputNumberButton
                    onClick={() => setInputExtraUnits(inputExtraUnits + 1)}
                    type='button'
                  >
                    <MdAdd size={16}/>
                  </InputNumberButton>

                  <InputNumberButton
                    onClick={() => inputExtraUnits > 0 && setInputExtraUnits(inputExtraUnits - 1)}
                    type='button'
                  >
                    <MdRemove size={16}/>
                  </InputNumberButton>
                </InputNumberButtonContainer>
              </div>
            </Input>

            <Checkbox>
              <input
                id="isNVAble"
                type="checkbox"
                min={0}
                checked={inputNVAble}
                onChange={(e) => setInputNVAble(e.target.checked)}/>
              <label htmlFor="isNVAble">NVA</label>
            </Checkbox>
          </FormBody>

          <FormAssist>
            <Button type="submit">
              <MdAdd size={16}/>
              <span>Adicionar</span>
            </Button>

            <Button
              style={{background: '#ffaa00'}}
              type="button"
              onDoubleClick={() => {
                handleReset();
                toast.success('Campos resetados', {icon: '👍'});
              }}
              title="Clique duplo para resetar"
            >
              <MdRefresh size={16}/>
              <span>Resetar campos</span>
            </Button>
                
            <Button style={{background: '#AA1100', color: '#ffffff'}} type="button" onDoubleClick={handleDeleteAll} title="Clique duplo para apagar tudo">
              <MdDeleteForever size={16}/>
              <span>Deletar tudo</span>
            </Button>
          </FormAssist>
        </Form>
      </header>

      {tableContent.length === 0
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
                {tableContent && tableContent.map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.name}</td>
                    <td>{'EX+' + unit.ex_level + ' -> ' + (unit.ex_level + 1)}</td>
                    <td>{unit.fragments}</td>
                    <td>{unit.extra_units}</td>
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
                      <Button2 onDoubleClick={() => handleDelete(unit.id, unit.name)} style={{backgroundColor: '#dde4f7'}}>
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
