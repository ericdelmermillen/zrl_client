import type { ReactNode } from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { scrollToTop } from "../../utils/utils";

type ColorMode = "light" | "dark";
type ModalType = "privacy" | "terms";

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
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  modalType: ModalType | null;
  setModalType: React.Dispatch<React.SetStateAction<ModalType | null>>;
  showDropdownNavOptions: boolean;
  setShowDropdownNavOptions: React.Dispatch<React.SetStateAction<boolean>>;
  // functions
  showNav: () => void;
  hideNav: () => void;
  logoutUser: () => void;
  handleSetModalType: (modalType: ModalType) => void;
};

interface AppContextProviderProps {
  children: ReactNode;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [ colorMode, setColorMode ] = useState<ColorMode>(() => localStorage.getItem("colorMode") === "dark" ? "dark" : "light");
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(!false);

  const [scrollYPos, setScrollYPos] = useState(0);
  const [prevScrollYPos, setPrevScrollYPos] = useState(0);

  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ modalType, setModalType ] = useState<ModalType | null>(null);

  const [ showDropdownNavOptions, setShowDropdownNavOptions ] = useState<boolean>(false);


  const handleUpdateScrollYPos = (): void => {
    setPrevScrollYPos(scrollYPos);
    setScrollYPos(window.scrollY);
  };

  const showNav = (): void => document.getElementById("nav-container")?.classList.remove("hide");
  
  const hideNav = (): void => document.getElementById("nav-container")?.classList.add("hide");

  const logoutUser = (): void => setIsLoggedIn(false);


  const handleSetModalType = (modalType: ModalType): void => {
    setShowModal(true);

    // finish when I have content for both modals
    if(modalType === "privacy") {
      console.log("modalType === privacy");
    };
    
    if(modalType === "terms") {
      console.log("modalType === terms");
    };

    setModalType(modalType);
  };

  // useEffect to check local storage for colorMode
  useEffect(() => {
  const validModes = ["light", "dark"];
  const storedMode = localStorage.getItem("colorMode");

    if (!storedMode || !validModes.includes(storedMode)) {
      localStorage.setItem("colorMode", "light");
    } else {
      localStorage.setItem("colorMode", colorMode);
    };

  }, [colorMode]);


  // useEffect for updating of scrollYPos
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if(!ticking) {
        requestAnimationFrame(() => {
          handleUpdateScrollYPos();
          setShowModal(false);
          setModalType(null);
          ticking = false;
        });
        ticking = true;
      };
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYPos]);

  // useEffect to scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, [])
  

  const contextValues = {
    // state
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
    showModal, 
    setShowModal,
    showDropdownNavOptions, 
    setShowDropdownNavOptions,
    // functions
    showNav,
    hideNav,
    logoutUser,
    modalType, 
    setModalType,
    handleSetModalType
  };


  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  };
  return context;
};

export { 
  AppContextProvider, 
  useAppContext, 
  type ColorMode, 
  type AppContextValue, 
  type AppContextProviderProps 
};