import {
  ConsigneeProps,
  DeclarationTypes,
  ExcelDataProps,
  TonnesTypes,
} from '@/Types';
import * as XLSX from 'xlsx';
const useExportExcel = (
  data: (DeclarationTypes | ConsigneeProps | TonnesTypes | ExcelDataProps)[],
  label: string
) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${label}.xlsx`);
  };
  return { exportToExcel };
};

export default useExportExcel;
