import { type FC } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { useAppContext } from "../../hooks/hooks";
import "./Modal.scss";


const Modal: FC<ChildrenPropsInterface> = ( { children }) => {
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
        <div className="modal__overlay" onClick={handleSetShowModalFalse}></div>
        <div className="modal__content">
          {children}
        </div>
      </div>   
    </>
  )};

export default Modal;