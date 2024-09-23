import useExportExcel from '@/Components/ui/export-excel';
import usePagination from '@/Components/ui/pagination';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { AllMonths, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
import Table from '../table-compare';
const NonDeclaration = () => {
  const undeclared = useServer().undeclared;

  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });

  const MonthsYears = formValue.years + '-' + formValue.months;
  const server = useServer();
  const [portA, setPortA] = useState<boolean>(false);
  const [portSP, setPortSP] = useState<boolean>(false);

  const handleChangePortA = () => {
    setPortA(!portA);
    setPortSP(false);
    server?.toInitialize();
  };
  const handleChangePortSP = () => {
    setPortSP(!portSP);
    setPortA(false);
    server?.toInitialize();
  };

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleUpdateFilter = () => {
    setPortA(false);
    setPortSP(false);
    setFormValue({ ...formValue, months: '', years: '' });
    FinalData == Final;
    //     setSearchValue('dc');
  };
  const [searchValue, setSearchValue] = useState();
  const Filter = useMemo(() => {
    return undeclared.filter(
      (val: any) =>
        val.trafic_maritime.date_trafic.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? undeclared : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: any) =>
        val.trafic_maritime.imo_trafic.toString().includes(searchValue)
      )
    : Final;

  let FinalData = dataFinal;
  if (portA) {
    FinalData = dataFinal.filter(
      (val: any) => val.trafic_maritime.port_trafic === 'ABIDJAN'
    );
  } else if (portSP) {
    FinalData = dataFinal.filter(
      (val: any) => val.trafic_maritime.port_trafic === 'SAN PEDRO'
    );
  } else {
    console.log('');
  }

  const modifiedData = FinalData.map((item: any, index: number) => ({
    Id: index,
    Imo: item?.trafic_maritime?.imo_trafic,
    Navire: item?.trafic_maritime?.nom_navire_trafic,
    Mouvement: item?.trafic_maritime.mouvement_trafic,
    Date: item?.trafic_maritime?.date_trafic.split('-').reverse().join('-'),
    Port: item?.trafic_maritime?.port_trafic,
  }));

  const { exportToExcel } = useExportExcel(modifiedData, 'non declare');

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalData);
  let FinalPagination = FinalData.slice(startIndex, endIndex);

  return (
    <div className="w-full relative h-full flex flex-col gap-6  ">
      <div className="flex justify-between gap-2 gap-y-4 w-full relative">
        <div className="flex gap-4">
          <Libelle
            icon="ph:x-circle"
            libelle="Non declarés"
            color="#F0352B"
            number={undeclared.length}
          />
          <button
            className="rounded-md  whitespace-nowrap shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-[#0e5c2f] text-firstColors text-sm h-10 "
            onClick={() => exportToExcel()}
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
          {!(MonthsYears === '-') || searchValue || portA || portSP ? (
            <div className="rounded-md bg-[#F0352B]  shadow-sm shadow-slate-200 p-2 inline-flex gap-1 items-center h-10 text-firstColors whitespace-nowrap">
              <Icon
                icon="ph:x-circle"
                width="1.2em"
                height="1.2em"
                className="mr-2"
              />
              Quantite : {FinalData.length}
            </div>
          ) : (
            ''
          )}
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
                <button onClick={handleUpdateFilter}>
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
                      checked={portA}
                      onChange={handleChangePortA}
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
                      checked={portSP}
                      onChange={handleChangePortSP}
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
      <div className="w-full h-full overflow-x-auto  pr-2 relative">
        <Table data={FinalPagination} label="Non Declare" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default NonDeclaration;
