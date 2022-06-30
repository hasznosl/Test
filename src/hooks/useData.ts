import { useCallback, useEffect, useState } from "react";

export interface Item {
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
  id: string;
  name: string;
  spend: number;
}

export interface Tree {
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
        if (
          anyTree[item.BCAP1].children[item.BCAP2].children[item.BCAP3].items
        ) {
          // branch is ready, nothing to do
        } else {
          anyTree[item.BCAP1].children[item.BCAP2].children[item.BCAP3].items =
            [];
        }
      } else {
        const currentChildren =
          anyTree[item.BCAP1].children[item.BCAP2].children;
        anyTree[item.BCAP1].children[item.BCAP2].children = {
          ...currentChildren,
          [item.BCAP3]: {
            isOpen: false,
            items: [],
          },
        };
      }
    } else {
      const currentChildren = anyTree[item.BCAP1].children;
      anyTree[item.BCAP1].children = {
        ...currentChildren,
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

export interface ToggleArgs {
  firstLvl: string;
  secondLvl?: string;
  thirdLvl?: string;
  isOpen: boolean;
}

const useData = () => {
  const [rawData, setRawData] = useState<Item[]>([]);
  const [data, setData] = useState<Tree>({});

  const toggle = ({ firstLvl, secondLvl, thirdLvl, isOpen }: ToggleArgs) => {
    if (secondLvl && thirdLvl) {
      const newData = {
        ...data,
        [firstLvl]: {
          ...data[firstLvl],
          children: {
            ...data[firstLvl].children,
            [secondLvl]: {
              ...data[firstLvl].children[secondLvl],
              children: {
                ...data[firstLvl].children[secondLvl].children,
                [thirdLvl]: {
                  ...data[firstLvl].children[secondLvl].children[thirdLvl],
                  isOpen: !isOpen,
                },
              },
            },
          },
        },
      };
      setData(newData);
    } else if (secondLvl && !thirdLvl) {
      const newData = {
        ...data,
        [firstLvl]: {
          ...data[firstLvl],
          children: {
            ...data[firstLvl].children,
            [secondLvl]: {
              ...data[firstLvl].children[secondLvl],
              isOpen: !isOpen,
            },
          },
        },
      };
      setData(newData);
    } else {
      const newData = {
        ...data,
        [firstLvl]: {
          ...data[firstLvl],
          isOpen: !isOpen,
        },
      };
      setData(newData);
    }
  };

  const storeData = (data: Item[]) => {
    const sortedData = data.sort((a, b) => a.BCAP1.localeCompare(b.BCAP1));

    setRawData(sortedData);
    let tree: Tree = {};
    sortedData.forEach((item) => {
      attachItemToTree(item, tree);
    });
    setData(tree);
  };

  const fetchAndStoreData = useCallback(async () => {
    const data: Item[] = await (
      await fetch("http://localhost:8080/data")
    ).json();

    storeData(data);
  }, []);

  useEffect(() => {
    fetchAndStoreData();
  }, [fetchAndStoreData]);

  return { data, rawData, toggle };
};

export default useData;
