// import { type FC } from "react";
// import { useAppContext } from "../../hooks/hooks";
// import "./Modal.scss";


// const Modal:FC = () => {
//   const { 
//     showModal,
//     modalTitle,
//     modalText,
//     modalConfirmCallback,
//     handleClearModal
//    } = useAppContext();
   
//   return (
//     <>
//       <div className={`modal ${showModal ? "show" : ""}`}>
//         <div className="modal__overlay" onClick={handleClearModal}></div>
//         <div className="modal__content">
//           <h2 className="modal__heading">{modalTitle}</h2>


//           {/* conditional class for scrollable box styling when no callback included */}
//           <div className="modal__text">
//             {modalText.split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => (
//               <p
//                 key={idx}
//                 className={`modal__paragraph ${/^\s*\d+[\.\):]?\s/.test(paragraph) ? "modal__paragraph--numbered" : ""}`}
//               >
//                 {paragraph}
//               </p>
//             ))}
//           </div>

//           <div className="modal__button-container">
//             {modalConfirmCallback

//               ? (
//                   <button
//                     className="modal__button"
//                     onClick={modalConfirmCallback}
//                   >
//                     Send
//                   </button>
//                 )
//               : null
//             }
//             <button
//               className="modal__button"
//               onClick={handleClearModal}
//             >
//               {modalConfirmCallback
              
//               ? "Cancel"
//               : "Close"
//             }
//             </button>
//           </div>

//         </div>
//       </div>   
//     </>
//   )};

// export default Modal;

import { type FC, useEffect, useRef } from "react";
import { useAppContext } from "../../hooks/hooks";
import "./Modal.scss";

const Modal: FC = () => {
  const {
    showModal,
    modalTitle,
    modalText,
    modalConfirmCallback,
    handleClearModal
  } = useAppContext();

  const modalTextRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (showModal && modalTextRef.current) {
  //     modalTextRef.current.scrollTop = 0;
  //   }
  // }, [showModal]);

  useEffect(() => {
  if (showModal && modalTextRef.current) {
    requestAnimationFrame(() => {
      if (modalTextRef.current) {
        modalTextRef.current.scrollTop = 0;
      }
    });
  }
}, [showModal, modalText]);

  return (
    <>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal__overlay" onClick={handleClearModal}></div>

        <div className="modal__content">
          <h2 className="modal__heading">{modalTitle}</h2>

          <div
            ref={modalTextRef}
            className={`modal__text ${modalConfirmCallback ? "" : "modal__text--informational"}`}
          >
            {modalText
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`modal__paragraph ${
                    /^\s*\d+[\.\):]?\s/.test(paragraph)
                      ? "modal__paragraph--numbered"
                      : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="modal__button-container">

            {modalConfirmCallback

              ? (
                  <button
                    className="modal__button"
                    onClick={modalConfirmCallback}
                  >
                    Send
                  </button>
                )
              : null
            }

            <button
              className="modal__button"
              onClick={handleClearModal}
            >
              {modalConfirmCallback
            
              ? "Cancel"
              : "OK"
            }
            </button>
            
          </div>

        </div>
      </div>
    </>
  );
};

export default Modal;