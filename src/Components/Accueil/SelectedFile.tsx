import { Icon } from '@iconify/react';
import React, { FC, useState } from 'react';
import {
  PostBoardDt,
  PostBoardPaa,
  PostTonnageDt,
  PostTonnagePaa,
} from '../ui/PostData';
import useMutateHook from '../ui/useMutateHook';

type Lib = {
  libelle: string;
  onClick: () => void;
};

const SelectedFile: FC<Lib> = ({ libelle, onClick }) => {
  const [selectedFile1, setSelectedFile1] = useState<any>(null);
  const [selectedFile2, setSelectedFile2] = useState<any>(null);

  const post_tonnages_dt = useMutateHook(PostTonnageDt());
  const post_tonnages_paa = useMutateHook(PostTonnagePaa());

  const post_board_dt = useMutateHook(PostBoardDt());
  const post_board_paa = useMutateHook(PostBoardPaa());

  const handleTonnages = () => {
    post_tonnages_dt.mutate(selectedFile1);
    post_tonnages_paa.mutate(selectedFile2);
  };

  const handleCompare = async () => {
    post_board_dt.mutate(selectedFile1);
    post_board_paa.mutate(selectedFile2);
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile1(file);
  };
  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile2(file);
  };

  return (
    <div className=" flex-center absolute inset-y-0 z-30 w-full animate-fadIn-up ">
      <div className="flex-column static w-[30%] min-w-[25rem] rounded-md  bg-white px-4 shadow">
        <button
          className=" relative w-full bg-slate-600 text-xl"
          onClick={onClick}
        >
          <Icon
            icon="ic:round-close"
            className="absolute right-0 top-0 text-grayBlack"
          />
        </button>
        <h3 className="text-xl font-bold">{libelle}</h3>
        <p className="font-semibold text-neutral-900/60">
          Televersez les fichiers Excel{' '}
        </p>
        <div className="m-3 flex h-40 w-full items-center justify-evenly rounded border-2 border-dashed border-zinc-200 ">
          <div className="flex h-3/4  w-32 flex-col items-center rounded bg-firstBlue p-1 shadow">
            <label
              htmlFor="fileDT"
              className="flex-start cursor-pointer gap-1 text-sm font-medium text-[#EEEEEC]"
            >
              {' '}
              <Icon icon="solar:download-bold" width="3rem" height="3rem" />
            </label>
            <input
              className="hidden"
              accept=".xlsx, .xls"
              type="file"
              id="fileDT"
              onChange={handleFileChange1}
            />
            <p className="font-semibold text-sm text-[#EEEEEC]">DTCI</p>
            <p className=" text-center text-xs text-[#EEEEEC]">
              Televersez fichier en .xlsx
            </p>
          </div>
          <div className="flex h-3/4  w-32 flex-col items-center rounded bg-firstBlue p-1 shadow">
            <label
              htmlFor="fileTM"
              className="flex-start cursor-pointer gap-1 text-sm font-medium text-[#EEEEEC]"
            >
              {' '}
              <Icon icon="solar:download-bold" width="3rem" height="3rem" />
            </label>
            <input
              className="hidden"
              accept=".xlsx, .xls"
              type="file"
              id="fileTM"
              onChange={handleFileChange2}
            />
            {libelle === 'VOYAGES' ? (
              <p className="font-semibold text-sm text-[#EEEEEC]">TM</p>
            ) : (
              <p className="font-semibold text-sm text-[#EEEEEC]">PAA</p>
            )}
            <p className=" text-center text-xs text-[#EEEEEC]">
              {' '}
              Televersez fichier en .xlsx
            </p>
          </div>
        </div>

        <div className=" flex-column relative flex h-40 w-full flex-col items-center justify-center gap-4 rounded-sm bg-slate-200/20">
          {!(selectedFile1 || selectedFile2) ? (
            <p className=" text-base font-normal text-slate-400">
              Aucun Fichier
            </p>
          ) : (
            ''
          )}
          {selectedFile1 && (
            <div className="flex w-full items-center justify-between rounded-md border p-3 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-base">
                <Icon
                  icon="mdi:file-excel-outline"
                  width="1.7em"
                  height="1.7em"
                />
                <div className="flex flex-col items-start justify-center">
                  <p> {selectedFile1?.name} </p>
                  <p className="text-xs text-grayBlack/60">Fichier DTCI</p>
                </div>
              </div>
              {selectedFile1 && (
                <div className="flex items-center gap-2">
                  <p className="opacity-60">
                    {Math.trunc(selectedFile1?.size / 1024)} Ko
                  </p>
                  <button onClick={() => setSelectedFile1(null)}>
                    <Icon
                      icon="gridicons:trash"
                      className="text-grayBlack"
                      width="1.5em"
                      height="1.5em"
                    />
                  </button>
                </div>
              )}
            </div>
          )}
          {selectedFile2 && (
            <>
              <div className="flex w-full items-center justify-between rounded-md border p-3 shadow-sm">
                <div className="flex items-center justify-center gap-2 text-base">
                  <Icon
                    icon="mdi:file-excel-outline"
                    width="1.7em"
                    height="1.7em"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <p> {selectedFile2?.name} </p>
                    <p className="text-xs text-grayBlack/60">
                      Fichier Trafic Maritime
                    </p>
                  </div>
                </div>
                {selectedFile2 && (
                  <div className="flex items-center gap-2">
                    <p className="opacity-60">
                      {Math.trunc(selectedFile2?.size / 1024)} Ko
                    </p>
                    <button onClick={() => setSelectedFile2(null)}>
                      <Icon
                        icon="gridicons:trash"
                        className="text-grayBlack"
                        width="1.5em"
                        height="1.5em"
                      />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex h-24 flex-col w-full justify-between p-2 gap-4 text-black  relative">
          {(post_tonnages_dt.isError ||
            post_tonnages_paa.isError ||
            post_board_paa.isError ||
            post_board_dt.isError) && (
            <div className="flex justify-center items-center gap-2">
              <Icon icon="emojione-v1:warning" />
              <p className="text-sm">
                Verifier l'erreur et televeser les deux fichiers
              </p>
            </div>
          )}
          <div className="w-full flex gap-4">
            {(post_tonnages_dt.isPending || post_board_dt.isPending) && (
              <div className="w-1/2 relative">
                <div
                  className={`flex items-center justify-center gap-1 rounded-sm bg-[#009fe3] px-2 py-1 font-semibold`}
                >
                  <Icon
                    icon="eos-icons:loading"
                    className="text-[#ffffff] "
                    width="1.2em"
                    height="1.2em"
                  />
                  <p className="text-sm text-[#ffffff]">Chargement</p>
                </div>
              </div>
            )}
            {(post_tonnages_paa.isPending || post_board_paa.isPending) && (
              <div className="w-1/2 relative">
                <div
                  className={`flex items-center justify-center gap-1 rounded-sm bg-[#009fe3] px-2 py-1 font-semibold`}
                >
                  <Icon
                    icon="eos-icons:loading"
                    className="text-[#ffffff] "
                    width="1.2em"
                    height="1.2em"
                  />
                  <p className="text-sm text-[#ffffff]">Chargement</p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex gap-4">
            <div className="w-1/2 relative">
              {post_tonnages_dt.isSuccess || post_board_dt.isSuccess ? (
                <div
                  className={`flex  py-2 items-center justify-center gap-1 rounded-sm w-full bg-[#0e5c2f] px-2 font-semibold`}
                >
                  <p className="text-sm text-[#ffffff]"> DTCI : Reussite</p>
                  <Icon
                    icon="gg:check-o"
                    width="1.1em"
                    height="1.1em"
                    className="text-[#ffffff]"
                  />
                </div>
              ) : (
                <>
                  {' '}
                  {post_tonnages_dt.isError || post_board_dt.isError ? (
                    <div
                      className={`flex items-center  justify-center gap-1 w-full rounded-sm bg-[#750b0b] py-2  text-right font-semibold`}
                    >
                      <p className="text-sm text-[#ffffff]"> DTCI : Echec</p>
                      <Icon
                        icon="carbon:close-outline"
                        width="1.2em"
                        height="1.2em"
                        className="text-[#ffffff]"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>

            <div className="w-1/2 relative">
              {post_tonnages_paa.isSuccess || post_board_paa.isSuccess ? (
                <div
                  className={`flex items-center justify-center gap-1 rounded-sm w-full  bg-[#0e5c2f] px-2 py-2  font-semibold`}
                >
                  <p className="text-sm text-[#ffffff]">
                    {' '}
                    {libelle === 'VOYAGES' ? 'TM' : 'PAA'} : Reussite
                  </p>
                  <Icon
                    icon="gg:check-o"
                    width="1.1em"
                    height="1.1em"
                    className="text-[#ffffff]"
                  />
                </div>
              ) : (
                <>
                  {post_tonnages_paa.isError || post_board_paa.isError ? (
                    <div
                      className={`flex items-center justify-center gap-1 w-full rounded-sm bg-[#750b0b] py-2  text-right font-semibold`}
                    >
                      <p className="text-sm text-[#ffffff]">
                        {' '}
                        {libelle === 'VOYAGES' ? 'TM' : 'PAA'} : Echec
                      </p>
                      <Icon
                        icon="carbon:close-outline"
                        width="1.2em"
                        height="1.2em"
                        className="text-[#ffffff]"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between gap-4 py-4">
          <button
            className=" h-12 w-40 cursor-pointer rounded-md border border-grayBlack font-semibold text-grayBlack transition delay-150 ease-in-out hover:scale-105 "
            onClick={onClick}
          >
            Quittez
          </button>
          <button
            className="h-12 w-40 cursor-pointer rounded-md bg-firstBlue font-semibold text-[#EEEEEC] transition delay-150 ease-in-out hover:scale-105 "
            onClick={libelle === 'VOYAGES' ? handleCompare : handleTonnages}
          >
            Comparez
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedFile;
