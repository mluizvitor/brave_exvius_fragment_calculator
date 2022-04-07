import { createContext, ReactNode, useContext, useState } from 'react';

interface DialogContextData {
  addUnitDialogState: boolean;
  addUnitDialogToggle: () => void;

  deleteAllDialogState: boolean;
  deleteAllDialogToggle: () => void;

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
    }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  return context;
}