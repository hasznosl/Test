import useData from "../hooks/useData";

const IDENTATION = 8;

const Navigation = () => {
  const { data, setData } = useData();

  const itemStyle = (lvl: number) => ({
    cursor: "pointer",
    marginLeft: (lvl - 1) * IDENTATION,
  });

  return (
    <div>
      <div>Navigation</div>
      {Object.keys(data).map((firstLvl) => {
        const isFirstLevelOpen = data[firstLvl].isOpen;

        return (
          <div key={firstLvl}>
            <div
              style={itemStyle(1)}
              onClick={() => {
                const newData = {
                  ...data,
                  [firstLvl]: {
                    ...data[firstLvl],
                    isOpen: !isFirstLevelOpen,
                  },
                };
                setData(newData);
              }}
            >
              {firstLvl}
            </div>
            {isFirstLevelOpen &&
              Object.keys(data[firstLvl].children).map((secondLvl) => {
                const isSecondLevelOpen =
                  data[firstLvl].children[secondLvl].isOpen;

                return (
                  <div key={secondLvl}>
                    <div
                      style={itemStyle(2)}
                      onClick={() => {
                        const newData = {
                          ...data,
                          [firstLvl]: {
                            ...data[firstLvl],
                            children: {
                              ...data[firstLvl].children,
                              [secondLvl]: {
                                ...data[firstLvl].children[secondLvl],
                                isOpen: !isSecondLevelOpen,
                              },
                            },
                          },
                        };
                        setData(newData);
                      }}
                    >
                      {secondLvl}
                    </div>
                    {isSecondLevelOpen &&
                      Object.keys(
                        data[firstLvl].children[secondLvl].children
                      ).map((thirdLvl) => {
                        const isThirdLevelOpen =
                          data[firstLvl].children[secondLvl].children[thirdLvl]
                            .isOpen;

                        return (
                          <div key={thirdLvl}>
                            <div
                              style={itemStyle(3)}
                              onClick={() => {
                                const newData = {
                                  ...data,
                                  [firstLvl]: {
                                    ...data[firstLvl],
                                    children: {
                                      ...data[firstLvl].children,
                                      [secondLvl]: {
                                        ...data[firstLvl].children[secondLvl],
                                        children: {
                                          ...data[firstLvl].children[secondLvl]
                                            .children,
                                          [thirdLvl]: {
                                            ...data[firstLvl].children[
                                              secondLvl
                                            ].children[thirdLvl],
                                            isOpen: !isThirdLevelOpen,
                                          },
                                        },
                                      },
                                    },
                                  },
                                };
                                setData(newData);
                              }}
                            >
                              {thirdLvl}
                            </div>
                            {isThirdLevelOpen &&
                              data[firstLvl].children[secondLvl].children[
                                thirdLvl
                              ].items.map((item) => (
                                <div key={item.id} style={itemStyle(4)}>
                                  item.name
                                </div>
                              ))}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
