
import { type FC, type KeyboardEvent, useEffect, useRef } from "react";
import { useModalContext } from "../../hooks/hooks";
import "./Modal.scss";

const Modal: FC = () => {
  const { 
    showModal,
    modalTitle,
    modalText,
    modalConfirmCallback,
    modalInputs,
    handleClearModal
  } = useModalContext();

  const modalTextRef = useRef<HTMLDivElement | null>(null);

  const handleEnterPress = (e: KeyboardEvent<HTMLFormElement>): void => {
    if(e.key === "Enter" && modalConfirmCallback) {
      e.preventDefault();
      modalConfirmCallback();
    };
  };

  // useEffect to reset the scroll position of the Modal when the modal opens
  useEffect(() => {
    if (showModal && modalTextRef.current) {
      requestAnimationFrame(() => {
        if (modalTextRef.current) {
          modalTextRef.current.scrollTop = 0;
        };
      });
    };
  }, [showModal]);

  return (
    <>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal__overlay" onClick={handleClearModal}></div>

        <div className="modal__card">

          <div className="modal__content">

            <h2 className="modal__heading">
              {modalTitle}
            </h2>

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
                    <form 
                      className="modal__inputs"
                      onKeyDown={(e) => handleEnterPress(e)}
                    >
                      {modalInputs.map((input) => (
                        <div key={input.id} className="modal__input-group">
                          <label className="modal__label" htmlFor={input.id}>
                            {input.label}
                          </label>
                          <input
                            className="modal__input"
                            id={input.id}
                            placeholder={input.placeholder}
                            ref={input.ref}
                            onChange={() => input.onChange()}
                          />
                        </div>
                      ))}
                    </form>
                  )
                : null
              }
            </div>

            <div className="modal__button-container">
              {modalConfirmCallback ? (
                <button
                  className="modal__button"
                  onClick={() => modalConfirmCallback()}
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