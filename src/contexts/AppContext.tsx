import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ColorMode = "light" | "dark";

interface AppContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: ColorMode;
  setColorMode: (value: ColorMode) => void;
};

interface AppContextProviderProps {
  children: ReactNode;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [ colorMode, setColorMode ] = useState<ColorMode>(
  localStorage.getItem("colorMode") === "dark" ? "dark" : "light"
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const contextValues: AppContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    colorMode,
    setColorMode
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
