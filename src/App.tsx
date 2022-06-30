import Filter from "./components/Filter";
import Items from "./components/Items";
import Navigation from "./components/Navigation";
import { DataContextProvider } from "./contexts/DataContext";
import { FilterContextProvider } from "./contexts/FilterContext";
import { NavigationContextProvider } from "./contexts/NavigationContext";

function App() {
  return (
    <DataContextProvider>
      <NavigationContextProvider>
        <FilterContextProvider>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Navigation />
              <Filter />
            </div>
            <Items />
          </div>
        </FilterContextProvider>
      </NavigationContextProvider>
    </DataContextProvider>
  );
}

export default App;
