import { CssBaseline, ThemeProvider } from "@mui/material";
import { DataContextProvider } from "./contexts/DataContext";
import { FilterContextProvider } from "./contexts/FilterContext";
import { NavigationContextProvider } from "./contexts/NavigationContext";
import MainLayout from "./layouts/MainLayout";
import Applications from "./pages/Applications";
import theme from "./theme";

function App() {
  return (
    // For this task did not use a dynamic global state management framework like Redux
    // As the application grows, it might be necessary to move dynamic context data to such a framework
    // Data, Navigation, Filter
    <DataContextProvider>
      <NavigationContextProvider>
        <FilterContextProvider>
          <ThemeProvider theme={theme}>
            <MainLayout>
              <CssBaseline />
              <Applications />
            </MainLayout>
          </ThemeProvider>
        </FilterContextProvider>
      </NavigationContextProvider>
    </DataContextProvider>
  );
}

export default App;
