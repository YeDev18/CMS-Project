import useExportExcel from '@/Components/ui/export-excel';
import usePagination from '@/Components/ui/pagination';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import React, { useMemo, useState } from 'react';
import { AllMonths, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
import Table from '../table-compare';

type UndeclaredProps = {
  trafic_maritime: {
    imo_trafic: string;
    nom_navire_trafic: string;
    mouvement_trafic: string;
    date_trafic: string;
    port_trafic: string;
  };
};
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
  };
  const [searchValue, setSearchValue] = useState<string>();
  const Filter = useMemo(() => {
    return undeclared.filter(
      (val: UndeclaredProps) =>
        val.trafic_maritime.date_trafic.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? undeclared : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: UndeclaredProps) =>
        val.trafic_maritime.imo_trafic.toString().includes(searchValue)
      )
    : Final;

  let FinalData = dataFinal;
  if (portA) {
    FinalData = dataFinal.filter(
      (val: UndeclaredProps) => val.trafic_maritime.port_trafic === 'ABIDJAN'
    );
  } else if (portSP) {
    FinalData = dataFinal.filter(
      (val: UndeclaredProps) => val.trafic_maritime.port_trafic === 'SAN PEDRO'
    );
  } else {
    console.log('');
  }

  const modifiedData = FinalData.map(
    (item: UndeclaredProps, index: number) => ({
      Id: index,
      Imo: item?.trafic_maritime?.imo_trafic,
      Navire: item?.trafic_maritime?.nom_navire_trafic,
      Mouvement: item?.trafic_maritime.mouvement_trafic,
      Date: item?.trafic_maritime?.date_trafic.split('-').reverse().join('-'),
      Port: item?.trafic_maritime?.port_trafic,
    })
  );

  const { exportToExcel } = useExportExcel(modifiedData, 'non declare');

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalData);
  const FinalPagination = FinalData.slice(startIndex, endIndex);

  return (
    <div className="relative flex size-full flex-col gap-6  ">
      <div className="relative flex w-full justify-between gap-2 gap-y-4">
        <div className="flex gap-4">
          <Libelle
            icon="ph:x-circle"
            libelle="Non declarés"
            color="#F0352B"
            number={undeclared.length}
          />
          <button
            className="inline-flex  h-10 items-center whitespace-nowrap rounded-md bg-[#0e5c2f] p-2 text-sm text-firstColors shadow-sm shadow-slate-200 "
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
            <div className="inline-flex h-10  items-center gap-1 whitespace-nowrap rounded-md bg-[#F0352B] p-2 text-firstColors shadow-sm shadow-slate-200">
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
                <button onClick={handleUpdateFilter}>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchValue(e.target.value);
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
                      checked={portA}
                      onChange={handleChangePortA}
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
                      checked={portSP}
                      onChange={handleChangePortSP}
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
      <div className="relative size-full overflow-x-auto  pr-2">
        <Table data={FinalPagination} label="Non Declare" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default NonDeclaration;
