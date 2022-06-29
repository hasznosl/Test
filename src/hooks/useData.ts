import { useEffect, useState } from "react";

export interface Item {
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
  id: string;
  name: string;
  spend: number;
}

interface Tree {
  [bcap1Id: string]: {
    isOpen: boolean;
    children: {
      [bcap2Id: string]: {
        isOpen: boolean;
        children: {
          [bcap3Id: string]: {
            isOpen: boolean;
            items: Item[];
          };
        };
      };
    };
  };
}

const attachItemToBranch = (item: Item, tree: Tree) => {
  const currentItems =
    tree[item.BCAP1].children[item.BCAP2].children[item.BCAP3].items;
  tree[item.BCAP1].children[item.BCAP2].children[item.BCAP3].items = [
    ...currentItems,
    item,
  ];
};

const growBranch = (item: Item, tree: Tree) => {
  const anyTree = tree as any;

  if (anyTree[item.BCAP1]) {
    if (anyTree[item.BCAP1].children[item.BCAP2]) {
      if (anyTree[item.BCAP1].children[item.BCAP2].children[item.BCAP3]) {
        // branch is ready, nothing to do
      } else {
        anyTree[item.BCAP1].children[item.BCAP2].children = {
          [item.BCAP3]: {
            isOpen: false,
            items: [],
          },
        };
      }
    } else {
      anyTree[item.BCAP1].children = {
        [item.BCAP2]: {
          isOpen: false,
          children: {
            [item.BCAP3]: {
              isOpen: false,
              items: [],
            },
          },
        },
      };
    }
  } else {
    const anyTree = tree as any;
    anyTree[item.BCAP1] = {
      isOpen: false,
      children: {
        [item.BCAP2]: {
          isOpen: false,
          children: {
            [item.BCAP3]: {
              isOpen: false,
              items: [],
            },
          },
        },
      },
    };
  }
};

const attachItemToTree = (item: Item, tree: Tree) => {
  growBranch(item, tree);
  attachItemToBranch(item, tree);
};

const useData = () => {
  const [data, setData] = useState<Tree>({});

  const fetchData = async () => {
    const data: Item[] = await (
      await fetch("http://localhost:8080/data")
    ).json();
    let tree: Tree = {};
    data.forEach((item) => {
      attachItemToTree(item, tree);
    });
    setData(tree);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData };
};

export default useData;
