import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { AllMonths, Year } from '../../Data.tsx';
import Libelle from '../../ui/Libelle.tsx';
import usePagination from '../../ui/pagination.tsx';
import Table from '../table-tonnages.tsx';
const T_Conforme = () => {
  const server = useServer();
  const tonnes = server?.tonnages;
  const crd = server?.getCsrf;
  console.log(tonnes);

  console.log(crd);
  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });
  // <Viva />;s
  console.log(server);
  const [correct, setCorrect] = useState<boolean>(false);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState();

  const handleChangeCorrect = () => {
    setCorrect(!correct);
    setIncorrect(false);
    server?.toInitialize();
  };
  const handleChangeIncorrect = () => {
    setIncorrect(!incorrect);
    setCorrect(false);
    server?.toInitialize();
  };

  const MonthsYears = formValue.years + '-' + formValue.months;

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const Filter = useMemo(() => {
    return tonnes.filter((val: any) =>
      val.tonnage_dt.mouvement_dt_tonnage === 'Arrivée'
        ? val.tonnage_dt.eta_dt_tonnage.toString().slice(0, 7) === MonthsYears
        : val.tonnage_dt.etd_dt_tonnage.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? tonnes : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: any) =>
        val.tonnage_dt.imo_dt_tonnage.toString().includes(searchValue)
      )
    : Final;

  let FinalDataCheck = Final;
  if (correct) {
    FinalDataCheck = Final.filter(
      (val: any) => val.statut === 'Tonnage Correct'
    );
  } else if (incorrect) {
    FinalDataCheck = Final.filter(
      (val: any) => val.statut === 'Tonnage Incorrect'
    );
  } else {
    console.log('');
  }
  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalDataCheck);
  let FinalPagination = tonnes.slice(startIndex, endIndex);
  return (
    <div className="w-full h-full  flex flex-col gap-6 ">
      <div className="flex justify-between gap-2 gap-y-4 w-full relative">
        <div className="flex gap-4">
          <Libelle
            icon="lucide:anvil"
            libelle="Tonages"
            color="#141A15"
            number={tonnes.length}
          />
          <button
            className="rounded-md  whitespace-nowrap shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-[#0e5c2f] text-firstColors text-sm h-10 "
            // onClick={() => exportToExcel()}
          >
            <Icon
              icon="material-symbols:download"
              width="1.2em"
              height="1.2em"
              style={{ color: 'rgb(255, 255, 255)' }}
              className="mr-2"
            />
            Export en csv
          </button>
        </div>

        <div className="z-10 static  w-full flex justify-end ">
          <button
            className="rounded-md  whitespace-nowrap shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-[#191114]  text-sm  text-firstColors font-semibold h-10 "
            onClick={handleShowFilter}
          >
            <Icon
              icon="gridicons:filter"
              width="1.2em"
              height="1.2em"
              className="mr-2"
            />
            Filtre
          </button>
          {showFilter ? (
            <div className="bg-white z-3 absolute top-12 shadow w-80 p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl">Filtre</h2>
                <button>
                  <Icon icon="radix-icons:update" />
                </button>
              </div>

              <div className="w-full ">
                {' '}
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  Periode
                </h3>
                <form action="" className="flex items-center justify-center">
                  <div className="w-full h-fit rounded-sm whitespace-nowrap flex flex-col gap-4 ">
                    <select
                      name="months"
                      id=""
                      value={formValue.months}
                      className="bg-none border border-gray-700/10  bg-firstColors p-2"
                      onChange={e => {
                        setFormValue({
                          ...formValue,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      {AllMonths.map((month, index) => (
                        <option key={index} value={month.value}>
                          {month.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="years"
                      id=""
                      value={formValue.years}
                      className="bg-none border outline-none border-gray-700/10  bg-firstColors p-2"
                      onChange={e => {
                        setFormValue({
                          ...formValue,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      {Year.map((year, index) => (
                        <option key={index} value={year.value}>
                          {year.year}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="w-full ">
                {' '}
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  IMO
                </h3>
                <input
                  type="number"
                  placeholder="IMO"
                  value={searchValue}
                  className="bg-none border border-gray-700/10  bg-firstColors p-2 w-full rounded-sm outline-none "
                  onChange={(e: any) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>
              <div className="w-full ">
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  Port
                </h3>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-center h-fit w-full p-2 rounded-sm border border-gray-700/10 ">
                    <label
                      htmlFor=""
                      className="font-normal text-base  text-[#000]/80"
                    >
                      Port Abidjan
                    </label>
                    <input
                      type="checkbox"
                      // checked={portA}
                      // onChange={handleChangePortA}
                      placeholder=""
                      className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
                    />
                  </div>
                  <div className="flex justify-between items-center h-fit w-full p-2 rounded-sm border border-gray-700/10 ">
                    <label
                      htmlFor=""
                      className="font-normal text-base  text-[#000]/80"
                    >
                      Port San-Pedro
                    </label>
                    <input
                      type="checkbox"
                      // checked={portSP}
                      // onChange={handleChangePortSP}
                      placeholder="MO"
                      className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full ">
                {' '}
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  Statut
                </h3>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-center h-fit w-full p-2 rounded-sm border border-gray-700/10 ">
                    <label
                      htmlFor=""
                      className="font-normal text-base  text-[#000]/80"
                    >
                      Correct
                    </label>
                    <input
                      type="checkbox"
                      // checked={portA}
                      // onChange={handleChangePortA}
                      placeholder=""
                      className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
                    />
                  </div>
                  <div className="flex justify-between items-center h-fit w-full p-2 rounded-sm border border-gray-700/10 ">
                    <label
                      htmlFor=""
                      className="font-normal text-base  text-[#000]/80"
                    >
                      Incorrect
                    </label>
                    <input
                      type="checkbox"
                      // checked={portSP}
                      // onChange={handleChangePortSP}
                      placeholder="MO"
                      className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="w-full h-full flex gap-4 justify-between flex-col  overflow-x-auto  pr-2 relative">
        <Table data={FinalPagination} label="Conforme" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default T_Conforme;
