import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface UnitContextData {
  unitCollection: Unit[];
  
  addUnit: (unitInput: UnitInputProps) => void;
  selectUnit: (unitId: string) => void;
  editUnit: (unitData: Unit) => void;
  awakenUnit: (unitData: Unit) => void;
  deleteSingleUnit: (unitId: string, unitName: string) => void;
  deleteAllUnits: () => void;
  
  searchInput: string;
  searchUnit: (userInput: string) => void;

  unitToManipulate: Unit;
  handleUnitToManipulate: (unitData: Unit) => void;
  clearUnitToManipulate: () => void;
}

interface UnitProviderProps {
  children: ReactNode;
}

const UnitContext = createContext<UnitContextData>({} as UnitContextData);

export function UnitProvider({children}: UnitProviderProps) {

  /**
   * 
   * Init Unit Collection
   * 
   */

  const [unitCollection, setUnitCollection] = useState<Unit[]>(() => {
    const savedData = localStorage.getItem('@ffbe:fragments');
    
    if (savedData) {
      let savedDataToJson: Unit[] = JSON.parse(savedData);

      savedDataToJson = savedDataToJson.map((data) => {
        return { ...data,
          can_awaken: data.can_awaken || data.fragment_needed <= 0,
          selected: data.selected || false,
        };
      });
      return savedDataToJson;
    } else {
      return [];
    }
  });

  /***
   * 
   * Save unit collection to Local Storage
   * 
   */
  
  useEffect(()=> {
    localStorage.setItem('@ffbe:fragments', JSON.stringify(unitCollection));
  }, [unitCollection]);

  /**
   * 
   * Search state
   * 
   */

  const [searchInput, setSearchInput] = useState('');

  function searchUnit(userInput: string) {
    setSearchInput(userInput);
  }

  /**
   * 
   * Init Unit To Manipulate state
   * 
   */

  const [unitToManipulate, setUnitToManipulate] = useState<Unit>({
    id: '',
    selected: false,
    name: '',
    ex_level: 0,
    fragments: 0,
    extra_units: 0,
    nva: false,
    fragment_needed: 0,
    can_awaken: false,
  });

  /**
   * 
   * Generate ID
   * 
   */
  function genId() {
    const charBase =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    let newId = '';
  
    for (let i = 0; i < 16; i++) {
      newId += charBase.charAt(Math.floor(Math.random() * charBase.length));
    }
  
    return newId;
  }
  
  /**
   * 
   *  Calculate fragment needed
   * 
   */
  
  function fragmentNeededCalculator(exLevel: number, fragments: number, extraUnits: number, nva: boolean) {
    if (nva) {
      switch (exLevel) {
        case 0:
          return 50 - fragments - (extraUnits * 25);
        case 1:
          return 75 - fragments - (extraUnits * 25);
        case 2:
          return 100 - fragments - (extraUnits * 25);
        default:
          return 9999;
      }
    } else {
      switch (exLevel) {
        case 0:
          return 50 - fragments - (extraUnits * 50);
        case 1:
          return 100 - fragments - (extraUnits * 50);
        case 2:
          return 200 - fragments - (extraUnits * 50);
        default:
          return 9999;
      }
    }
  }

  /**
   * 
   * Select unit
   * 
   */

  function selectUnit(unitId: string) {
    const newUnitCollection = [...unitCollection];
    const unitIndex = newUnitCollection.findIndex((unit) => unit.id === unitId);
    const unitSelectState = newUnitCollection[unitIndex].selected;

    newUnitCollection[unitIndex].selected = !unitSelectState;

    sortCollection(newUnitCollection);
    setUnitCollection(newUnitCollection);
  }
  
  /**
   * 
   * Add unit to content table
   * 
   */
  
  function addUnit(unitInput: UnitInputProps) {
  
    if(unitInput.name.length === 0) {
      alert('Unit Name must be filled');
      return;
    };

    const fragmentsNeeded = fragmentNeededCalculator(
      unitInput.ex_level,
      unitInput.fragments,
      unitInput.extra_units,
      unitInput.nva
    );
  
    const newUnitCollection = [...unitCollection, {
      id: genId(),
      selected: false,
      name: unitInput.name,
      ex_level: unitInput.ex_level,
      fragments: unitInput.fragments || 0,
      extra_units: unitInput.extra_units || 0,
      nva: unitInput.nva,
      fragment_needed: fragmentsNeeded,
      can_awaken: fragmentsNeeded <= 0,
    }];
  
    sortCollection(newUnitCollection);
    
    setUnitCollection(newUnitCollection);
  
    toast.success(unitInput.name + ' adicionado(a) com sucesso', {icon: '????'});
    clearUnitToManipulate();
  }

  /**
   * 
   * Edit unit
   * 
   */
  function editUnit(unitData: Unit) {

    try {
      if (unitData.name.length === 0) {
        throw new Error();
      }

      const newUnitCollection = [...unitCollection];
      const unitToEditIndex = newUnitCollection.findIndex((unit) => unit.id === unitData.id);

      const fragmentsNeeded = fragmentNeededCalculator(
        unitData.ex_level,
        unitData.fragments,
        unitData.extra_units,
        unitData.nva
      );
      
      newUnitCollection[unitToEditIndex] = {
        ...unitData,
        name: unitData.name,
        ex_level: unitData.ex_level,
        fragments: unitData.fragments,
        extra_units: unitData.extra_units,
        nva: unitData.nva,
        fragment_needed: fragmentsNeeded,
        can_awaken: fragmentsNeeded <= 0 && unitData.ex_level < 3,
      };

      sortCollection(newUnitCollection);

      setUnitCollection(newUnitCollection);

      clearUnitToManipulate();

    } catch (err) {
      toast.error('Nome da unidade deve ser preenchido', {icon: '????'});
    }
  }

  /**
   * 
   * Awaken Unit
   * 
   */

  function awakenUnit(unitData: Unit) {
    const newUnitData = unitData;
    
    if(newUnitData.nva) {
      switch (newUnitData.ex_level) {
        case 0:
          newUnitData.fragments = (newUnitData.extra_units * 25 + newUnitData.fragments) - 50;
          break;
        case 1:
          newUnitData.fragments = (newUnitData.extra_units * 25 + newUnitData.fragments) - 75;
          break;
        case 2:
          newUnitData.fragments = (newUnitData.extra_units * 25 + newUnitData.fragments) - 100;
          break;
      }
    } else {
      switch (newUnitData.ex_level) {
        case 0:
          newUnitData.fragments = (newUnitData.extra_units * 50 + newUnitData.fragments) - 50;
          break;
        case 1:
          newUnitData.fragments = (newUnitData.extra_units * 50 + newUnitData.fragments) - 100;
          break;
        case 2:
          newUnitData.fragments = (newUnitData.extra_units * 50 + newUnitData.fragments) - 200;
          break;
      }
    }

    editUnit({
      ...newUnitData,
      ex_level: newUnitData.ex_level + 1,
      extra_units: 0,
    });
  }

  /**
   * 
   * Delete single unit 
   * 
   */

  function deleteSingleUnit(unitId: string, unitName: string) {
    const newTableCotnent = [...unitCollection].filter((tableRow) => tableRow.id !== unitId);
    toast.success(unitName + ' deletado(a) com sucesso', {icon: '????'});
    setUnitCollection(newTableCotnent);
  }

  /**
   * 
   * Delete all units
   * 
   */
  
  function deleteAllUnits() {
    setUnitCollection([]);
    toast.success('Todos os dados foram deletados', {icon: '????'});
  }

  /**
   * 
   * Save unit data to unitToManipulate state
   * 
   */

  function handleUnitToManipulate(unitData: Unit) {
    setUnitToManipulate(unitData);
  }

  /**
   * 
   * Clear unitToManipulate state
   * 
   */

  function clearUnitToManipulate() {
    setTimeout(() => {
      setUnitToManipulate({
        id: '',
        selected: false,
        name: '',
        ex_level: 0,
        fragments: 0,
        extra_units: 0,
        nva: false,
        fragment_needed: 0,
        can_awaken: false,
      });
    }, 500);
  }

  /**
   * Sort Collection
   */

  function sortCollection(collection: Unit[]) {
    const newUnitCollection = collection.sort((a, b)=> {
      return a.name.localeCompare(b.name);

    }).sort((elementA, elementB) => {
      return elementA.ex_level - elementB.ex_level;

    }).sort((elementA, elementB) => {
      return (elementA.nva === elementB.nva) ? 0 : elementA.nva ? -1 : 1;

    }).sort((elementA, elementB) => {
      return elementA.fragment_needed - elementB.fragment_needed;

    }).sort((elementA, elementB) => {
      return (elementA.selected === elementB.selected) ? 0 : elementA.selected ? -1 : 1;
      
    });

    return newUnitCollection;
  }


  return (
    <UnitContext.Provider value={{
      unitCollection,
      addUnit,
      selectUnit,
      editUnit,
      awakenUnit,
      deleteSingleUnit,
      deleteAllUnits,
      searchInput,
      searchUnit,
      unitToManipulate,
      handleUnitToManipulate,
      clearUnitToManipulate,
    }}>
      { children }
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const context = useContext(UnitContext);

  return context;
}