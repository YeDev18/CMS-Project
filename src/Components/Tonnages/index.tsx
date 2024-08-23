import Libelle from '../ui/Libelle';

const Tonages = () => {
  return (
    <div className="w-full h-full relative flex flex-col gap-6 ">
      <div className="flex justify-start gap-2 flex-wrap w-full">
        {/* <div className="flex gap-4"> */}
        <Libelle
          icon="lucide:anvil"
          libelle="Tonages"
          color="#141A15"
          number={52}
        />
      </div>
    </div>
  );
};

export default Tonages;
