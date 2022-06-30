import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";

const Filter = () => {
  const { value, setValue, max } = useContext(FilterContext);

  return (
    <>
      <h2>Filter</h2>
      <div>{`Spending: ${Math.floor((value / 100) * max)} $`}</div>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 150,
        }}
      >
        <div>0 $</div>
        <div>{`${max} $`}</div>
      </div>
    </>
  );
};

export default Filter;
