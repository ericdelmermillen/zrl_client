import { useState, createContext} from "react";
import { type ModalType, type ModalInput } from "../typing/types/types";
import { type ModalContextProviderProps, type ModalContextValue } from "../typing/interfaces/interfaces";

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ modalType, setModalType ] = useState<ModalType | null>(null);
  const [ modalTitle, setModalTitle ] = useState<string>("");
  const [ modalText, setModalText ] = useState<string>("");
  const [ modalInitialFormCheck , setModalInitialFormCheck ] = useState<boolean>(false);
  const [ modalInputs, setModalInputs ] = useState<ModalInput[] | null>(null);
  const [ modalConfirmCallback, setModalConfirmCallback ] = useState<(() => void) | null>(null);

  const handleOpenModal = (
    modalType: ModalType, 
    modalTitle: string, 
    modalText: string, 
    inputs?: ModalInput[] | null
    ): void => {
      setShowModal(true);
      setModalType(modalType);
      setModalTitle(modalTitle);
      setModalText(modalText);
      setModalInputs(inputs || null);
    };

  const handleClearModal = (): void => {
    setShowModal(false);
    setModalTitle("");
    setModalInitialFormCheck(false);
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
    modalText, 
    setModalText,
    modalInitialFormCheck,
    setModalInitialFormCheck,
    modalInputs, 
    setModalInputs,
    modalConfirmCallback, 
    setModalConfirmCallback,
    handleOpenModal,
    handleClearModal
  };

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  );
};

export {
  ModalContext,
  ModalContextProvider
};