import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";

const Filter = () => {
  const { value, setValue } = useContext(FilterContext);

  return (
    <>
      <div>Filter</div>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
    </>
  );
};

export default Filter;
