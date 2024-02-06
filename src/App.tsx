import AddBarPanel from './components/AddBarPanel';
import BodyTodoTable from './components/BodyTodoTable';
import NavbarPanel from './components/NavbarPanel';
import { getItems } from './hooks/getItems';
import './index.css';

function App() {
  const { data, isLoading, isError } = getItems();
  return (
    <>
      {data && (
        <>
          <NavbarPanel />
          <AddBarPanel />
          <BodyTodoTable importData={data} />
        </>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error 404 page not found</p>}
    </>
  );
}

export default App;
