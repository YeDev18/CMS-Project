import { TableNavire, headersNavire } from '../Data';
import Tables from '../ui/Tables';
const Navire = () => {
  return (
    <>
      <Tables lib={'Navires'} HeaderTable={headersNavire} Table={TableNavire} />
    </>
  );
};

export default Navire;
