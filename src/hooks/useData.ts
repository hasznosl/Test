import { useEffect, useState } from "react";

export interface Data {
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
  id: string;
  name: string;
  spend: number;
}

const useData = () => {
  const [data, setData] = useState<Data | null>(null);

  const fetchData = async () => {
    const data = await (await fetch("http://localhost:8080/data")).json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export default useData;
