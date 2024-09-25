import { createContext, ReactNode, useContext } from 'react';

type Context = {
  sum: number;
};
const FilterContext = createContext<Context | null>(null);

// const initialState = [];
// const action = {
//   addMonths: 'AddMonths',
//   addYear: 'addYear',
//   addImo: 'AddMonths',
//   addPort: 'AddPort',
//   addUpdate: 'addUpdate',
// };

type ChildrenProps = {
  children: ReactNode;
};
const FilterProvider = ({ children }: ChildrenProps) => {
  const sum = 1 + 21;
  return (
    <FilterContext.Provider value={{ sum }}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFilter = () => {
  return useContext(FilterContext);
};
