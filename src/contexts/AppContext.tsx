import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type ColorMode = "light" | "dark";

interface AppContextValue {
  // state and state setting 
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  scrollYPos: number;
  setScrollYPos: React.Dispatch<React.SetStateAction<number>>;
  prevScrollYPos: number;
  setPrevScrollYPos: React.Dispatch<React.SetStateAction<number>>;
  // functions
  showNav: () => void;
  hideNav: () => void;
  logoutUser: () => void;
};

interface AppContextProviderProps {
  children: ReactNode;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [ colorMode, setColorMode ] = useState<ColorMode>(() =>
    localStorage.getItem("colorMode") === "dark" ? "dark" : "light"
  );
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(!false);

  const [ scrollYPos, setScrollYPos ] = useState<number>(window.scrollY);
  const [ prevScrollYPos, setPrevScrollYPos ] = useState<number>(window.scrollY);


  const handleUpdateScrollYPos = (): void => {
    setPrevScrollYPos(scrollYPos);
    setScrollYPos(window.scrollY);
  };


  const showNav = (): void => {
    document.getElementById("nav")?.classList.remove("hide");
  };

  const hideNav = (): void => {
    document.getElementById("nav")?.classList.add("hide");
  };

  const logoutUser = (): void => {
    setIsLoggedIn(false);
  };


  // useEffect to check local storage for colorMode
  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
  }, [colorMode]);


      // useEffect for updating of scrollYPos
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if(!ticking) {
        requestAnimationFrame(() => {
          handleUpdateScrollYPos();
          // setShowSideNav(false);
          ticking = false;
        });
        ticking = true;
      };
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYPos]);
  

  const contextValues = {
    isLoading, 
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    colorMode,
    setColorMode,
    scrollYPos, 
    setScrollYPos,
    prevScrollYPos, 
    setPrevScrollYPos,
    showNav,
    hideNav,
    logoutUser
  };


  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  };
  return context;
};

export { AppContextProvider, useAppContext };
// export type { ColorMode, AppContextValue, AppContextProviderProps };