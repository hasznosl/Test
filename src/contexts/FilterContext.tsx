import React, { useContext, useState } from "react";
import { Item } from "../hooks/useData";
import NavigationContext from "./NavigationContext";

interface Filter {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  filteredData: Item[];
}

const FilterContext = React.createContext<Filter>({
  value: 0,
  setValue: () => {},
  filteredData: [],
});

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { navigatedRawData } = useContext(NavigationContext);

  const [value, setValue] = useState<number>(
    Math.max(...navigatedRawData.map((item) => item.spend))
  );

  return (
    <FilterContext.Provider
      value={{
        value,
        setValue,
        filteredData: navigatedRawData.filter((item) => item.spend < value),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
