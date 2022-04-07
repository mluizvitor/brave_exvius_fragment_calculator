import { createContext, ReactNode, useContext, useState } from 'react';

interface DialogContextData {
  addUnitDialogToggle: () => void;
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
  const [openAddUnitDialog, setOpenAddUnitDialog] = useState(false);

  function addUnitDialogToggle() {
    setOpenAddUnitDialog(!openAddUnitDialog);
  }

  /**
   * Delete All dialog
   */
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);

  function deleteAllDialogToggle() {
    setOpenDeleteAllDialog(!openDeleteAllDialog);
  }


  return (
    <DialogContext.Provider value={{
      addUnitDialogToggle,
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