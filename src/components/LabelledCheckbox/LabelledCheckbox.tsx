import { type FC, type ChangeEvent } from "react";
import type { LabelledCheckboxProps } from "../../typing/types/types";
import "./LabelledCheckbox.scss";


const LabelledCheckbox: FC<LabelledCheckboxProps> = ({
  labelId,
  labelText,
  isChecked,
  setIsChecked,
  isValid,
  modalType,
  spanStub,
  spanLinkText,
  onSpanLinkClick,
 }) => {

  const handleIsClickedChange = (e: ChangeEvent<HTMLInputElement>): boolean => {
    setIsChecked(e.target.checked);
    return true;
  };

  const handleSpanLinkClick = (): void => {
    onSpanLinkClick(modalType)
  };

  return (
    <div className="labelledCheckbox">
      <label htmlFor={labelId} className="labelledCheckbox__label">
        {labelText}
      </label>

      <input
        id={labelId}
        type="checkbox"
        className={`labelledCheckbox__input
          ${isValid ? "" : "invalid"}`}
        checked={isChecked}
        onChange={handleIsClickedChange}
      />

      <span className="labelledCheckbox__text">
        {`${spanStub}`}
        <span
          className="labelledCheckbox__text-link"
          onClick={handleSpanLinkClick}
        >
          {spanLinkText}
        </span>
      </span>
    </div>
  )};

export default LabelledCheckbox;