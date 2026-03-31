import { type FC, useEffect, useRef, useState } from "react";
import { useModalContext } from "../../hooks/hooks";
import "./Modal.scss";

const Modal: FC = () => {
  const { 
    showModal,
    modalText,
    modalTitle,
    handleClearModal, 
    modalConfirmCallback,
    modalInputs
  } = useModalContext();
  

  const [ inputValues, setInputValues ] = useState<Record<string, string>>({});

  const modalTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showModal && modalTextRef.current) {
      requestAnimationFrame(() => {
        if (modalTextRef.current) {
          modalTextRef.current.scrollTop = 0;
        }
      });
    }
  }, [showModal, modalText]);

  useEffect(() => {
    if (showModal && modalInputs) {
      const initial = modalInputs.reduce((acc, input) => {
        acc[input.id] = input.value || "";
        return acc;
      }, {} as Record<string, string>);
      setInputValues(initial);
    }
  }, [showModal]);

  const handleInputChange = (id: string, value: string) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal__overlay" onClick={handleClearModal}></div>

        <div className="modal__card">

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
              

              {modalInputs && modalInputs.length > 0 
                ? (
                    <div className="modal__inputs">
                      {modalInputs.map((input) => (

                        <div key={input.id} className="modal__input-group">
                          <label className="modal__label" htmlFor={input.id}>
                            {input.label}
                          </label>
                          <input
                            className="modal__input"
                            id={input.id}
                            placeholder={input.placeholder}
                            value={inputValues[input.id] || ""}
                            ref={input.ref}
                            onChange={(e) => {
                              handleInputChange(input.id, e.target.value);
                              console.log(e.target.value);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )
                : null
                
              }
            </div>

            <div className="modal__button-container">
              {modalConfirmCallback ? (
                <button
                  className="modal__button"
                  onClick={() => modalConfirmCallback(inputValues)}
                >
                  Send
                </button>
              ) : null}

              <button
                className="modal__button"
                onClick={handleClearModal}
              >
                {modalConfirmCallback ? "Cancel" : "OK"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Modal;