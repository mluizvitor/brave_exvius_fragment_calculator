import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

type UnitInputProps = Omit<Unit, 'id' | 'fragment_needed' | 'can_awaken'>;

interface UnitContextData {
  unitCollection: Unit[];
  
  addUnit: (unitInput: UnitInputProps) => void;
  editUnit: (unitInput: UnitInputProps) => void;
  deleteSingleUnit: (unitId: string, unitName: string) => void;
  deleteAllUnits: () => void;
  
  unitToManipulate: Unit;
  handleUnitToManipulate: (unitEntry: Unit) => void;
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
          can_awaken: data.can_awaken || data.fragment_needed <= 0 
        };
      });
      return savedDataToJson;
    } else {
      return [];
    }
  });

  /**
   * 
   * Init Unit To Manipulate state
   * 
   */

  const [unitToManipulate, setUnitToManipulate] = useState<Unit>({
    id: '',
    name: '',
    ex_level: 0,
    fragments: 0,
    extra_units: 0,
    nva: false,
    fragment_needed: 0,
    can_awaken: false
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
  
    const newTableContent = [...unitCollection, {
      id: genId(),
      name: unitInput.name,
      ex_level: unitInput.ex_level,
      fragments: unitInput.fragments || 0,
      extra_units: unitInput.extra_units || 0,
      nva: unitInput.nva,
      fragment_needed: fragmentsNeeded,
      can_awaken: fragmentsNeeded <= 0,
    }];
  
    setUnitCollection(newTableContent);
  
    toast.success(unitInput.name + ' adicionado(a) com sucesso', {icon: '👍'});
  }

  /**
   * 
   * Edit unit
   * 
   */
  function editUnit(unitInput: UnitInputProps) {
    try {
      if (unitInput.name.length === 0) {
        throw new Error();
      }

      const newUnitCollection = [...unitCollection];
      const unitToEditIndex = newUnitCollection.findIndex((unit) => unit.id === unitToManipulate.id);

      const fragmentsNeeded = fragmentNeededCalculator(
        unitInput.ex_level,
        unitInput.fragments,
        unitInput.extra_units,
        unitInput.nva
      );
      
      newUnitCollection[unitToEditIndex] = {
        ...unitToManipulate,
        name: unitInput.name,
        ex_level: unitInput.ex_level,
        fragments: unitInput.fragments,
        extra_units: unitInput.extra_units,
        nva: unitInput.nva,
        fragment_needed: fragmentsNeeded,
        can_awaken: fragmentsNeeded <= 0,
      };

      setUnitCollection(newUnitCollection);
      clearUnitToManipulate();

    } catch (err) {
      toast.error('Nome da unidade deve ser preenchido', {icon: '🙅'});
    }
  }

  /**
   * 
   * Delete single unit 
   * 
   */

  function deleteSingleUnit(unitId: string, unitName: string) {
    const newTableCotnent = [...unitCollection].filter((tableRow) => tableRow.id !== unitId);
    toast.success(unitName + ' deletado(a) com sucesso', {icon: '👍'});
    setUnitCollection(newTableCotnent);
  }

  /**
   * 
   * Delete all units
   * 
   */
  
  function deleteAllUnits() {
    setUnitCollection([]);
    toast.success('Todos os dados foram deletados', {icon: '👍'});
  }

  /**
   * 
   * Save unit data to unitToManipulate state
   * 
   */

  function handleUnitToManipulate(unitEntry: Unit) {
    setUnitToManipulate(unitEntry);
  }

  /**
   * 
   * Clear unitToManipulate state
   * 
   */

  function clearUnitToManipulate() {
    setUnitToManipulate({
      id: '',
      name: '',
      ex_level: 0,
      fragments: 0,
      extra_units: 0,
      nva: false,
      fragment_needed: 0,
      can_awaken: false
    });
  }

  /***
   * 
   * Save unit collection to Local Storage
   * 
   */
  
  useEffect(()=> {
    localStorage.setItem('@ffbe:fragments', JSON.stringify(unitCollection));

    function sortCollection() {
      const newUnitCollection = [...unitCollection].sort((a, b)=> {
        return a.fragment_needed - b.fragment_needed;
      });

      return newUnitCollection;
    }

    setUnitCollection(sortCollection);
    
  }, [unitCollection]);

  return (
    <UnitContext.Provider value={{
      unitCollection,
      addUnit,
      editUnit,
      deleteSingleUnit,
      deleteAllUnits,
      unitToManipulate,
      handleUnitToManipulate,
      clearUnitToManipulate
    }}>
      { children }
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const context = useContext(UnitContext);

  return context;
}