import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";

const Items = () => {
  const { filteredData } = useContext(FilterContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "0px",
      }}
    >
      {filteredData.map((item) => (
        <div
          key={item.id}
          style={{
            margin: 8,
            border: "1px solid black",
            width: 200,
            height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>{item.name}</h3>
          <div>{`Total spend: ${item.spend}`}</div>
        </div>
      ))}
    </div>
  );
};

export default Items;
