import React, { useContext, useState } from "react";
import { Item } from "../hooks/useData";
import NavigationContext from "./NavigationContext";

interface Filter {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  filteredData: Item[];
  max: number;
}

const FilterContext = React.createContext<Filter>({
  value: 0,
  setValue: () => {},
  filteredData: [],
  max: 0,
});

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { navigatedRawData } = useContext(NavigationContext);

  const max = Math.max(...navigatedRawData.map((item) => item.spend));

  const [value, setValue] = useState<number>(100);

  const filteredData = navigatedRawData
    .filter((item) => item.spend <= (value / 100) * max)
    .sort((a1, a2) => a1.spend - a2.spend);

  return (
    <FilterContext.Provider
      value={{
        value,
        setValue,
        filteredData,
        max,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
