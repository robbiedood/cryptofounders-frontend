import { createContext, useState } from "react";
import { topNumOfCoins } from "./constants"

export const NavContext = createContext({
  menuOpen: false,
  toggleMenu: () => {},
  showNumOfCoinsPerColumn: topNumOfCoins,
  toggleView: (screenWidth:number, totalNumberOfCoins:number) => {},
});


const NavProvider = ({ children }:any) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNumOfCoinsPerColumn, setShowNumOfCoinsPerColumn] = useState(topNumOfCoins);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleView = (screenWidth:number, totalNumberOfCoins:number) => {
    //暫時先用1000 當作顯示最大上限
    console.log(screenWidth)
    let numCol = screenWidth>1024 ? 2 : 1
    let maxNumOfCoinsPerColumn = Math.min(totalNumberOfCoins/numCol, 1000/numCol)
    setShowNumOfCoinsPerColumn(numCol*showNumOfCoinsPerColumn > numCol*topNumOfCoins ? topNumOfCoins : maxNumOfCoinsPerColumn)
  }

  return (
    <NavContext.Provider value={{ menuOpen, toggleMenu, showNumOfCoinsPerColumn, toggleView }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;