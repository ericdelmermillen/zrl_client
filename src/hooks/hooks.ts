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

// isLoading animation for pages with loading delay: simulates call to server
const usePageLoading = (): void => {
  const { handleSetShowAppIsLoadingTrue } = useAppContext();

  useEffect(() => {
    handleSetShowAppIsLoadingTrue();
  }, []);
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