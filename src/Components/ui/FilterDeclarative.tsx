import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { AllMonths, Year } from '../Data';
const useFilter = (data: any, label: string) => {
  const server = useServer();
  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });
  const MonthsYears = formValue.years + '-' + formValue.months;
  const [searchValue, setSearchValue] = useState<string>();
  const [update, setUpdate] = useState<boolean>(false);
  const [portA, setPortA] = useState<boolean>(false);
  const [portSP, setPortSP] = useState<boolean>(false);
  const [tags, setTags] = useState<boolean>(false);
  const handleUpdateFilter = () => {
    setUpdate(false);
    setPortA(false);
    setPortSP(false);
    setFormValue({ ...formValue, months: '', years: '' });
    setTags(false);
  };
  const handleChangeCheck = () => {
    setUpdate(!update);
    server?.toInitialize();
  };
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
  const handleTagsCheck = () => {
    setTags(!tags);
    server?.toInitialize();
  };
  const Filter = useMemo(() => {
    return data.filter((val: any) =>
      val?.soumission_dtci?.mouvement_dtci === 'Arrivée'
        ? val?.soumission_dtci?.eta_dtci.toString().slice(0, 7) === MonthsYears
        : val?.soumission_dtci?.etd_dtci.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? data : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: any) =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
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
    <></>;
  }

  const dataFinalChecked = update
    ? FinalData.filter((val: any) => val.observation)
    : FinalData;

  const dataTagsChecked = tags
    ? FinalData.filter((val: any) => val.observation)
    : FinalData;

  const filterComponent = () => {
    return (
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
          <label
            htmlFor="imo"
            className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal"
          >
            IMO
          </label>
          <input
            type="number"
            placeholder="IMO"
            id="imo"
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
        {label === 'Conforme' ? (
          <div className="w-full ">
            {' '}
            <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
              Mise á jour
            </h3>
            <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
              <label
                htmlFor=""
                className="text-base font-normal text-[#000]/80"
              >
                À mettre á jour
              </label>
              <input
                type="checkbox"
                checked={update}
                onChange={handleChangeCheck}
                placeholder=""
                className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
              />
            </div>
          </div>
        ) : (
          <>
            {label === 'NConforme' ? (
              <div className="w-full ">
                {' '}
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  Tags
                </h3>
                <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                  <label
                    htmlFor=""
                    className="text-base font-normal text-[#000]/80"
                  >
                    Tags
                  </label>
                  <input
                    type="checkbox"
                    checked={tags}
                    onChange={handleTagsCheck}
                    placeholder=""
                    className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    );
  };

  return {
    dataFinalChecked,
    dataTagsChecked,
    MonthsYears,
    searchValue,
    update,
    portSP,
    portA,
    FinalData,
    filterComponent,
    tags,
  };
};

export default useFilter;
