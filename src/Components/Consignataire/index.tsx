import { headersConsignataires, TableConsignataire } from '../Data';
import Tables from '../ui/Tables';
const Consignataire = () => {
  return (
    <>
      {' '}
      <Tables
        lib={'Consignataire'}
        HeaderTable={headersConsignataires}
        Table={TableConsignataire}
      />
    </>
  );
};

export default Consignataire;
