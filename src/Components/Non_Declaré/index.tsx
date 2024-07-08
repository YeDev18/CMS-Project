import { headerTable, TableConforme } from '../Data';
import SecondTables from '../ui/SecondTables';
const NonDeclaration = () => {
  return (
    <div>
      {' '}
      <SecondTables
        liv={'ph:x-circle'}
        color={'#ea546c'}
        lib={'Nom déclaré'}
        HeaderTable={headerTable}
        Table={TableConforme}
      />{' '}
    </div>
  );
};

export default NonDeclaration;
