import { type Dispatch, type SetStateAction, useState, useRef, useEffect, createContext } from "react";
import { useModalContext } from "../hooks/hooks";
import type { ColorMode } from "../typing/types/types";
import type { AppContextProviderProps, AppContextValue } from "../typing/interfaces/interfaces";
import { addClassToDiv, removeClassFromDiv, scrollToTop } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MIN_LOADING_INTERVAL = Number(import.meta.env.VITE_MIN_LOADING_INTERVAL);
const APP_ISLOADING_DELAY = Number(import.meta.env.VITE_APP_ISLOADING_DELAY);
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { 
    setShowModal,
    setModalType,
    handleClearModal
  } = useModalContext();

  const navigate = useNavigate();
  const location = useLocation();
  const isOnHome = location.pathname === "/";

  const [ colorMode, setColorMode ] = useState<ColorMode>(() => localStorage.getItem("colorMode") === "dark" ? "dark" : "light");
  const [ appIsLoading, setAppIsLoading ] = useState<boolean>(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

  const [ scrollYPos, setScrollYPos ] = useState(0);
  const [ prevScrollYPos, setPrevScrollYPos ] = useState(0);
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

  const [ showDropdownNavOptions, setShowDropdownNavOptions ] = useState<boolean>(false);

  // used to prevent duplicate toasts in dev
  const hasRunSessionCheck = useRef(false);

  const NAV_CLICK_DELAY = windowWidth < 1080  || !isOnHome ? Number(import.meta.env.VITE_NAV_CLICK_DELAY) : 0;
  const NOT_FOUND_NAV_CLICK_DELAY = windowWidth < 900 ? Number(import.meta.env.VITE_NOT_FOUND_NAV_CLICK_DELAY) : 0;
  const PAGE_NAV_CLICK_DELAY = Number(import.meta.env.VITE_PAGE_NAV_CLICK_DELAY);

  const handleSetShowIsLoadingTrue = (isLoadingStateSetter: Dispatch<SetStateAction<boolean>>,
  divId: string
  ): void => {
    isLoadingStateSetter(true);

    requestAnimationFrame(() => {
      removeClassFromDiv(divId, "hide");
    });
    addClassToDiv(divId, "show");
  };

  const handleSetShowIsLoadingFalse = (isLoadingStateSetter: Dispatch<SetStateAction<boolean>>,
  divId: string
  ): void => {
    
    setTimeout(() => {
      requestAnimationFrame(() => {
        removeClassFromDiv(divId, "show");
        isLoadingStateSetter(false);
      });
    }, APP_ISLOADING_DELAY);

    setTimeout(() => {
      addClassToDiv(divId, "hide");
    }, APP_ISLOADING_DELAY * 2);
  };


  const handleUpdateScrollYPos = (): void => {
    setPrevScrollYPos(scrollYPos);
    setScrollYPos(window.scrollY);
  };

  const showNav = (): void => removeClassFromDiv("nav-container", "hide");
  
  const hideNav = (): void => addClassToDiv("nav-container", "hide");

  const logoutUser = async (): Promise<void> => {
    handleSetShowIsLoadingTrue(setAppIsLoading, "appIsLoading");

    try {
      const response = await fetch(`${BASE_URL}/auth/logoutuser`, {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      };
      
      localStorage.removeItem("wasLoggedIn");
      toast.success("Logging you out now...");
      navigate("/");
      setShowDropdownNavOptions(false);

      setTimeout(() => {
        scrollToTop();
        setIsLoggedIn(false);
      }, APP_ISLOADING_DELAY);

    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed. Please try again.");
    };
  };

  const toggleColorMode = () : void => {
    setColorMode(prev => prev === "light" ? "dark" : "light")
  };

  const navLinkClick = (optionName: string): void => {
    if(optionName.toLowerCase() === "admin") {
      setTimeout(() => {
        requestAnimationFrame(() => {
          navigate("/admin");
        });
      }, windowWidth < 1080 ? PAGE_NAV_CLICK_DELAY : 0);
      setShowDropdownNavOptions(false);
      return;
    };

    const link = document.createElement('a');
    link.href = `/#${optionName.toLowerCase()}`;

    document.body.appendChild(link);

    setTimeout(() => {
      requestAnimationFrame(() => {
        if (optionName.toLowerCase() === "home") {
          navigate("/");
          scrollToTop();
        } else {
          link.click();
          hideNav();
        };
      });
      setShowDropdownNavOptions(false);
    }, NAV_CLICK_DELAY);
  };

  const notFoundNavLinkClick = (to: string): void => {
    navigate("/");

    setTimeout(() => {
      requestAnimationFrame(() => {
        navLinkClick(to.toLowerCase())
      });
    }, NOT_FOUND_NAV_CLICK_DELAY);
   };


  const loginUser = async (email: string, password: string): Promise<boolean> => {
    handleSetShowIsLoadingTrue(setAppIsLoading, "appIsLoading");

    try {
      const response = await fetch(`${BASE_URL}/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json() as {
        message?: string;
        token?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to log in. Please check your credentials."
        );
      };

      toast.success(data.message || "Login successful!");
      setIsLoggedIn(true);
      localStorage.setItem("wasLoggedIn", "true");
      setTimeout(() => {
        navigate("/");
      }, MIN_LOADING_INTERVAL * 2);

      return true;
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";

      toast.error(message);
      return false;
    } finally {
    };
  };
  
  const checkSessionStatus = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/sessionstatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { isAuthenticated } = await response.json();

      return isAuthenticated;
    } catch (error) {
      console.error("sessionstatus error:", error);
      return false;
    };
  };

  // useEffect to check isLoggedIn status via call to /sessionstatus on mount
  useEffect(() => {
    if (hasRunSessionCheck.current) {
      return;
    };
    
    hasRunSessionCheck.current = true;

    const runSessionCheck = async () => {
      const isAuthenticated = await checkSessionStatus();

      if (isAuthenticated) {
        return setIsLoggedIn(true);
      };

      const hadSession = Boolean(localStorage.getItem("wasLoggedIn"));
      const isOnLogin = location.pathname === "/login";
      
      if (hadSession) {
        console.log("had session")
        if (isOnLogin) {
          localStorage.removeItem("wasLoggedIn");
        } else {
          // setAppIsLoading(true);
          toast.error("Session expired. Logging you out...");

          setTimeout(() => {
            localStorage.removeItem("wasLoggedIn");
            navigate("/");

            // setTimeout(() => {
            //   setAppIsLoading(false);
            // }, MIN_LOADING_INTERVAL);
          }, MIN_LOADING_INTERVAL);
        };
      };

      setIsLoggedIn(false);
    };

    runSessionCheck();
  }, []);


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
          handleClearModal();
          ticking = false;
        });
        ticking = true;
      };
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYPos]);

  // useEffect for updating window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect to scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  const contextValues = {
    appIsLoading, 
    setAppIsLoading,
    handleSetShowIsLoadingTrue,
    handleSetShowIsLoadingFalse,
    // 
    isLoggedIn,
    setIsLoggedIn,
    colorMode,
    setColorMode,
    scrollYPos, 
    setScrollYPos,
    prevScrollYPos, 
    windowWidth,
    setWindowWidth,
    setPrevScrollYPos,
    showDropdownNavOptions, 
    setShowDropdownNavOptions,

    // functions
    loginUser,
    toggleColorMode,
    navLinkClick,
    notFoundNavLinkClick,
    showNav,
    hideNav,
    logoutUser,
  };


  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};


export { 
  AppContext,
  AppContextProvider
};