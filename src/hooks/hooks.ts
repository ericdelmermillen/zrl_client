import { useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { scrollToTop } from "../../utils/utils";

const APP_ISLOADING_DELAY = Number(import.meta.env.VITE_APP_ISLOADING_DELAY);

const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  };
  return context;
};

// isLoading animation for pages with loading delay: simulates call to server
const usePageLoading = (): void => {
  const { setAppIsLoading } = useAppContext();

  useEffect(() => {
    setAppIsLoading(true);

    const timeoutId = window.setTimeout(() => {
      setAppIsLoading(false);
    }, APP_ISLOADING_DELAY);

    // ✅ cleanup prevents state updates after unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [APP_ISLOADING_DELAY, setAppIsLoading]);
};

const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const useScrollToTopOnPageMount = (): void => {
  useEffect(() => {
    scrollToTop();
  }, []);
};

    
export  { 
  useAppContext,
  usePageLoading,
  useDocumentTitle,
  useScrollToTopOnPageMount
 }