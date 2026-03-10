import { type FC } from "react";
import { useAppContext } from "../../hooks/hooks";
import "./Modal.scss";


const Modal:FC = () => {
  const { 
    showModal,
    // setModalType,
    modalTitle, 
    handleClearModal
   } = useAppContext();

   
  return (
    <>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal__overlay" onClick={handleClearModal}></div>
        <div className="modal__content">
          <h2 className="modal__title">{modalTitle}</h2>

        </div>
      </div>   
    </>
  )};

export default Modal;