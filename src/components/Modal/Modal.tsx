import { type FC } from "react";
import { useAppContext } from "../../hooks/hooks";
import "./Modal.scss";


const Modal:FC = () => {
  const { 
    showModal,
    setShowModal,
    setModalType,
    modalTitle
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
          <h2 className="modal__title">{modalTitle}</h2>

        </div>
      </div>   
    </>
  )};

export default Modal;