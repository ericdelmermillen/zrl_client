import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ColorMode = "light" | "dark";

interface AppContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
};

interface AppContextProviderProps {
  children: ReactNode;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [ colorMode, setColorMode ] = useState<ColorMode>(() =>
    localStorage.getItem("colorMode") === "dark" ? "dark" : "light"
  );
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

  const contextValues = useMemo(() => ({
    isLoggedIn,
    setIsLoggedIn,
    colorMode,
    setColorMode,
  }), [isLoggedIn, setIsLoggedIn, colorMode, setColorMode]);

  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
  }, [colorMode]);

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