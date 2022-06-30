import { useContext } from "react";
import DataContext from "../contexts/DataContext";
import NavigationContext from "../contexts/NavigationContext";

const IDENTATION = 8;

const Navigation = () => {
  const { data, toggle } = useContext(DataContext);
  const { setFolder, folder } = useContext(NavigationContext);

  const itemStyle = (lvl: number, isActive?: boolean) => ({
    cursor: "pointer",
    marginLeft: (lvl - 1) * IDENTATION,
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <div style={{ width: 200 }}>
      <h1>Navigation</h1>
      {Object.keys(data).map((firstLvl) => {
        const isFirstLevelOpen = data[firstLvl].isOpen;
        const isFirstLevelActive = !!(
          folder &&
          folder.label === firstLvl &&
          folder.level === "BCAP1"
        );
        return (
          <div key={firstLvl}>
            <div
              style={itemStyle(1, isFirstLevelActive)}
              onClick={() => {
                toggle({ firstLvl, isOpen: isFirstLevelOpen });
                setFolder({ level: "BCAP1", label: firstLvl });
              }}
            >
              {firstLvl}
            </div>
            {isFirstLevelOpen &&
              Object.keys(data[firstLvl].children).map((secondLvl) => {
                const isSecondLevelOpen =
                  data[firstLvl].children[secondLvl].isOpen;
                const isSecondLevelActive = !!(
                  folder &&
                  folder.label === secondLvl &&
                  folder.level === "BCAP2"
                );
                return (
                  <div key={secondLvl}>
                    <div
                      style={itemStyle(2, isSecondLevelActive)}
                      onClick={() => {
                        toggle({
                          firstLvl,
                          secondLvl,
                          isOpen: isSecondLevelOpen,
                        });
                        setFolder({ level: "BCAP2", label: secondLvl });
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
                        const isThirdLevelActive = !!(
                          folder &&
                          folder.label === thirdLvl &&
                          folder.level === "BCAP3"
                        );
                        return (
                          <div key={thirdLvl}>
                            <div
                              style={itemStyle(3, isThirdLevelActive)}
                              onClick={() => {
                                toggle({
                                  firstLvl,
                                  secondLvl,
                                  thirdLvl,
                                  isOpen: isThirdLevelOpen,
                                });
                                setFolder({ level: "BCAP3", label: thirdLvl });
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
