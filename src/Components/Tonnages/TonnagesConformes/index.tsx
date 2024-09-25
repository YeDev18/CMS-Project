import { useServer } from '@/Context/ServerProvider';
import { TonnesTypes } from '@/Types.tsx';
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
  // const [correct, setCorrect] = useState<boolean>(false);
  // const [incorrect, setIncorrect] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>();

  // const handleChangeCorrect = () => {
  //   setCorrect(!correct);
  //   setIncorrect(false);
  //   server?.toInitialize();
  // };
  // const handleChangeIncorrect = () => {
  //   setIncorrect(!incorrect);
  //   setCorrect(false);
  //   server?.toInitialize();
  // };

  const MonthsYears = formValue.years + '-' + formValue.months;

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const Filter = useMemo(() => {
    return tonnes.filter((val: TonnesTypes) =>
      val.tonnage_dt.mouvement_dt_tonnage === 'Arrivée'
        ? val.tonnage_dt.eta_dt_tonnage.toString().slice(0, 7) === MonthsYears
        : val.tonnage_dt.etd_dt_tonnage.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? tonnes : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: TonnesTypes) =>
        val.tonnage_dt.imo_dt_tonnage.toString().includes(searchValue)
      )
    : Final;

  const FinalDataCheck = dataFinal;
  // if (correct) {
  //   FinalDataCheck = Final.filter(
  //     (val: TonnesTypes) => val.statut === 'Tonnage Correct'
  //   );
  // } else if (incorrect) {
  //   FinalDataCheck = Final.filter(
  //     (val: TonnesTypes) => val.statut === 'Tonnage Incorrect'
  //   );
  // } else {
  //   console.log('');
  // }
  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalDataCheck);
  const FinalPagination = tonnes.slice(startIndex, endIndex);
  return (
    <div className="flex size-full  flex-col gap-6 ">
      <div className="relative flex w-full justify-between gap-2 gap-y-4">
        <div className="flex gap-4">
          <Libelle
            icon="lucide:anvil"
            libelle="Tonages"
            color="#141A15"
            number={tonnes.length}
          />
          <button
            className="inline-flex  h-10 items-center whitespace-nowrap rounded-md bg-[#0e5c2f] p-2 text-sm text-firstColors shadow-sm shadow-slate-200 "
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

        <div className="static z-10  flex w-full justify-end ">
          <button
            className="inline-flex  h-10 items-center whitespace-nowrap rounded-md bg-[#191114] p-2 text-sm  font-semibold  text-firstColors shadow-sm shadow-slate-200 "
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
            <div className="absolute top-12 z-10 flex w-80 flex-col gap-4 bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filtre</h2>
                <button>
                  <Icon icon="radix-icons:update" />
                </button>
              </div>

              <div className="w-full ">
                {' '}
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  Periode
                </h3>
                <form action="" className="flex items-center justify-center">
                  <div className="flex h-fit w-full flex-col gap-4 whitespace-nowrap rounded-sm ">
                    <select
                      name="months"
                      id=""
                      value={formValue.months}
                      className="border border-gray-700/10 bg-firstColors  bg-none p-2"
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
                      className="border border-gray-700/10 bg-firstColors bg-none  p-2 outline-none"
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
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  IMO
                </h3>
                <input
                  type="number"
                  placeholder="IMO"
                  value={searchValue}
                  className="w-full rounded-sm border  border-gray-700/10 bg-firstColors bg-none p-2 outline-none "
                  onChange={event => {
                    setSearchValue(event.target.value);
                  }}
                />
              </div>
              <div className="w-full ">
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  Port
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                    <label
                      htmlFor=""
                      className="text-base font-normal  text-[#000]/80"
                    >
                      Port Abidjan
                    </label>
                    <input
                      type="checkbox"
                      // checked={portA}
                      // onChange={handleChangePortA}
                      placeholder=""
                      className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
                    />
                  </div>
                  <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                    <label
                      htmlFor=""
                      className="text-base font-normal  text-[#000]/80"
                    >
                      Port San-Pedro
                    </label>
                    <input
                      type="checkbox"
                      // checked={portSP}
                      // onChange={handleChangePortSP}
                      placeholder="MO"
                      className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full ">
                {' '}
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  Statut
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                    <label
                      htmlFor=""
                      className="text-base font-normal  text-[#000]/80"
                    >
                      Correct
                    </label>
                    <input
                      type="checkbox"
                      // checked={portA}
                      // onChange={handleChangePortA}
                      placeholder=""
                      className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
                    />
                  </div>
                  <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                    <label
                      htmlFor=""
                      className="text-base font-normal  text-[#000]/80"
                    >
                      Incorrect
                    </label>
                    <input
                      type="checkbox"
                      // checked={portSP}
                      // onChange={handleChangePortSP}
                      placeholder="MO"
                      className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
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
      <div className="relative flex size-full flex-col justify-between gap-4  overflow-x-auto  pr-2">
        <Table data={FinalPagination} label="Conforme" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default T_Conforme;
