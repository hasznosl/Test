import React, { useContext, useState } from "react";
import { Item, ToggleArgs } from "../hooks/useData";
import DataContext from "./DataContext";

interface Folder {
  level: "BCAP1" | "BCAP2" | "BCAP3";
  label: string;
}

export interface Navigation {
  folder: Folder | null;
  setFolder: React.Dispatch<React.SetStateAction<Folder | null>>;
  toggle: (args: ToggleArgs) => void;
  navigatedRawData: Item[];
}

const NavigationContext = React.createContext<Navigation>({
  folder: null,
  setFolder: () => {},
  toggle: () => {},
  navigatedRawData: [],
});

export const NavigationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [folder, setFolder] = useState<Folder | null>(null);

  const { toggle, rawData } = useContext(DataContext);

  const navigatedRawData = folder
    ? rawData.filter((item) => item[folder.level] === folder.label)
    : rawData;

  console.log({ navigatedRawData });

  return (
    <NavigationContext.Provider
      value={{ folder, setFolder, toggle, navigatedRawData }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
