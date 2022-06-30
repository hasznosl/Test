import React from "react";
import useData, { Item, ToggleArgs, Tree } from "../hooks/useData";

export interface Data {
  data: Tree;
  rawData: Item[];
  toggle: (args: ToggleArgs) => void;
}

const DataContext = React.createContext<Data>({
  data: {},
  rawData: [],
  toggle: () => {},
});

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, rawData, toggle } = useData();

  return (
    <DataContext.Provider value={{ data, rawData, toggle }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
