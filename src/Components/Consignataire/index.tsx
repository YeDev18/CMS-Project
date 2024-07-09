import { headersConsignataires, TableConsignataire } from '../Data';
import Tables from '../ui/Tables';
const Consignataire = () => {
  return (
    <div className="w-screen">
      {' '}
      <Tables
        lib={'Consignataire'}
        HeaderTable={headersConsignataires}
        Table={TableConsignataire}
      />
    </div>
  );
};

export default Consignataire;
