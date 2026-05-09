import { useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { ModalContext } from "../contexts/ModalContext";
import { scrollToTop } from "../../utils/utils";

const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  };
  return context;
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if(!context) {
    throw new Error("useModalContext must be used within a ModalContextProvider");
  };
  return context;
};

const usePageLoading = (): void => {
  const { appIsLoading, setAppIsLoading, handleSetShowIsLoadingTrue, handleSetShowIsLoadingFalse } = useAppContext();

  useEffect(() => {
    handleSetShowIsLoadingTrue(setAppIsLoading, "appIsLoading");
  }, []);

  useEffect(() => {
    if (appIsLoading) {
      handleSetShowIsLoadingFalse(setAppIsLoading, "appIsLoading");
    }
  }, [appIsLoading]);
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
  useModalContext,
  usePageLoading,
  useDocumentTitle,
  useScrollToTopOnPageMount
 };