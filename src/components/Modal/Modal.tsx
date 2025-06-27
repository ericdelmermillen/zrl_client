import { type FC, type ReactNode } from 'react';
import { useAppContext } from "../../contexts/AppContext";
import "./Modal.scss";

interface ModalProps {
  children: ReactNode;
};

const Modal: FC<ModalProps> = ( { children }) => {
  const { 
    showModal,
    setShowModal,
    setModalType
   } = useAppContext();

  const handleSetShowModalFalse = () : void => {
    setShowModal(false);
    setModalType(null);
  };
   
  return (
    <>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div 
          className="modal__overlay"
          onClick={handleSetShowModalFalse}
          ></div>

        <div className="modal__content">
          {children}
        </div>

      </div>   
    </>
  )};

export default Modal;