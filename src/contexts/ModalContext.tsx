import { 
  useState, 
  // useRef, 
  // useEffect, 
  createContext
} from "react";
import type { ModalType, ModalInput } from "../typing/types/types";

import type { ModalContextProviderProps, ModalContextValue } from "../typing/interfaces/interfaces";


// const MIN_LOADING_INTERVAL = Number(import.meta.env.VITE_MIN_LOADING_INTERVAL);
// const APP_ISLOADING_DELAY = Number(import.meta.env.VITE_APP_ISLOADING_DELAY);
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ modalType, setModalType ] = useState<ModalType | null>(null);
  const [ modalTitle, setModalTitle ] = useState<string>("");
  const [ modalInputs, setModalInputs ] = useState<ModalInput[] | null>(null);

  const [ modalConfirmCallback, setModalConfirmCallback ] = useState<(() => void) | null>(null);
  const [ modalText, setModalText ] = useState<string>("");

const handleOpenModal = (modalType: ModalType, modalTitle: string, modalText: string, inputs?: ModalInput[] | null): void => {
  setShowModal(true);
  setModalType(modalType);
  setModalTitle(modalTitle);
  setModalText(modalText);
  setModalInputs(inputs || null);
};

  const handleClearModal = (): void => {
    setShowModal(false);
    setModalTitle("");
    setModalConfirmCallback(null);
    setModalInputs(null);
  };

  const contextValues ={
    showModal, 
    setShowModal,
    modalType, 
    setModalType,
    modalTitle, 
    setModalTitle,
    modalConfirmCallback, 
    setModalConfirmCallback,
    modalText, 
    setModalText,
    modalInputs, 
    setModalInputs,
    handleOpenModal,
    handleClearModal
  }

    return (
      <ModalContext.Provider value={contextValues}>
        {children}
      </ModalContext.Provider>
    );
};

export {
  ModalContext,
  ModalContextProvider
}