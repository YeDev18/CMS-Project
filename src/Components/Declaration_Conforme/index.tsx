import { headerTable, TableConforme } from '../Data';
import SecondTables from '../ui/SecondTables';

const DeclarationConforme = () => {
  return (
    <div className="w-screen ">
      <SecondTables
        liv={'lucide:circle-check-big'}
        color={'#008000'}
        lib={'Déclaré conforme'}
        HeaderTable={headerTable}
        Table={TableConforme}
      />
    </div>
  );
};

export default DeclarationConforme;
