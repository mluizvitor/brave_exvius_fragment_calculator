import { AddUnitModal } from './components/AddUnitModal';
import { ApplicationBar } from './components/ApplicationBar';
import { DeleteAllModal } from './components/DeleteAllModal';
import { DeleteModal } from './components/DeleteModal';
import { EditUnitModal } from './components/EditUnitModal';
import { Footer } from './components/Footer';
import { UnitTable } from './components/UnitTable';


export default function App() {
  return (
    <>
      <ApplicationBar />

      <UnitTable />

      <Footer />

      <AddUnitModal />

      <EditUnitModal />

      <DeleteModal />

      <DeleteAllModal />
    </>
  );
}
