import { headerTable, TableConforme } from '../Data';
import SecondTables from '../ui/SecondTables';
const DeclaratioNConforme = () => {
  return (
    <div className="w-screen ">
      {' '}
      <SecondTables
        liv={'charm:notes-cross'}
        color={'#ea546c'}
        lib={'Déclaré non-conforme'}
        nonDeclare={true}
        HeaderTable={headerTable}
        Table={TableConforme}
      />{' '}
    </div>
  );
};

export default DeclaratioNConforme;
