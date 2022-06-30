import Filter from "./components/Filter";
import Navigation from "./components/Navigation";
import { DataContextProvider } from "./contexts/DataContext";
import { FilterContextProvider } from "./contexts/FilterContext";
import { NavigationContextProvider } from "./contexts/NavigationContext";

function App() {
  return (
    <DataContextProvider>
      <NavigationContextProvider>
        <FilterContextProvider>
          <Navigation />
          <Filter />
        </FilterContextProvider>
      </NavigationContextProvider>
    </DataContextProvider>
  );
}

export default App;
