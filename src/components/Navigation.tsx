import useData from "../hooks/useData";

const Navigation = () => {
  const { data } = useData();

  console.log({ data });

  return <div>Navigation</div>;
};

export default Navigation;
