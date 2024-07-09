import { TableNavire, headersNavire } from '../Data';
import Tables from '../ui/Tables';
const Navire = () => {
  return (
    <div className="w-screen">
      <Tables lib={'Navires'} HeaderTable={headersNavire} Table={TableNavire} />
    </div>
  );
};

export default Navire;
