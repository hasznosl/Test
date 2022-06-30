import { useTheme } from "@mui/material";
import Filter from "../components/Filter";
import Items from "../components/Items";
import Navigation from "../components/Navigation";

const Applications = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        background: theme.palette.info.light,
        paddingLeft: 8,
        width: "100%",
      }}
    >
      <div>
        <Navigation />
        <Filter />
      </div>
      <Items />
    </div>
  );
};

export default Applications;
