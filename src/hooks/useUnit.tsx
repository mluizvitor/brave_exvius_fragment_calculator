import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface UnitProps {
  id: string;
  name: string;
  ex_level: number;
  fragments: number;
  extra_units: number;
  nva: boolean;
  fragment_needed: number;
  can_awaken: boolean;
}

type UnitInputProps = Omit<UnitProps, 'id' | 'fragment_needed' | 'can_awaken'>;

interface UnitContextData {
  unitCollection: UnitProps[];

  addUnit: (unitInput: UnitInputProps) => void;
  deleteSingleUnit: (unitId: string, unitName: string) => void;
  deleteAllUnits: () => void;
}

interface UnitProviderProps {
  children: ReactNode;
}

const UnitContext = createContext<UnitContextData>({} as UnitContextData);

export function UnitProvider({children}: UnitProviderProps) {

  const [unitCollection, setUnitCollection] = useState<UnitProps[]>(() => {
    const savedData = localStorage.getItem('@ffbe:fragments');
    
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
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
  
    newTableContent.sort((a, b)=> {
      return a.fragment_needed - b.fragment_needed;
    });
  
    setUnitCollection(newTableContent);
  
    toast.success(unitInput.name + ' adicionado(a) com sucesso', {icon: '👍'});
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

  /***
   * 
   * Save unit collection to Local Storage
   * 
   */
  
  useEffect(()=> {
    localStorage.setItem('@ffbe:fragments', JSON.stringify(unitCollection));
    
  }, [unitCollection]);

  return (
    <UnitContext.Provider value={{
      unitCollection,
      addUnit,
      deleteSingleUnit,
      deleteAllUnits}}>
      { children }
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const context = useContext(UnitContext);

  return context;
}