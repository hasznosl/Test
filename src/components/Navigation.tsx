import { useState } from "react";
import useData from "../hooks/useData";

const Navigation = () => {
  const { data } = useData();

  console.log({ data });

  return (
    <div>
      <div>Navigation</div>
      {/* {data && data.map((item1) => <div>{item1.id}</div>)} */}
    </div>
  );
};

export default Navigation;
