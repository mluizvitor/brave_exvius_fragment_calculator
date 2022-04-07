import { createContext, ReactNode, useContext, useState } from 'react';

interface DialogContextData {
  addUnitDialogState: boolean;
  addUnitDialogToggle: () => void;

  deleteAllDialogState: boolean;
  deleteAllDialogToggle: () => void;

  deleteUnitDialogState: boolean;
  deleteUnitDialogToggle: () => void;
}

interface DialogProviderProps {
  children: ReactNode;
}

const DialogContext = createContext<DialogContextData>({} as DialogContextData);

export function DialogProvider({ children }: DialogProviderProps) {
  /**
   * Add Unit dialog
   */
  const [addUnitDialogState, setAddUnitDialogState] = useState(false);

  function addUnitDialogToggle() {
    setAddUnitDialogState(!addUnitDialogState);
  }

  /**
   * Delete Unit dialog
   */

  const [deleteUnitDialogState, setDeleteUnitDialogState] = useState(false);

  function deleteUnitDialogToggle() {
    setDeleteUnitDialogState(!deleteUnitDialogState);
  }

  /**
   * Delete All dialog
   */
  const [deleteAllDialogState, setDeleteAllDialogState] = useState(false);

  function deleteAllDialogToggle() {
    setDeleteAllDialogState(!deleteAllDialogState);
  }


  return (
    <DialogContext.Provider value={{
      addUnitDialogState,
      addUnitDialogToggle,
      deleteAllDialogState,
      deleteAllDialogToggle,
      deleteUnitDialogState,
      deleteUnitDialogToggle,
    }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  return context;
}