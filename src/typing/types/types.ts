import { type FC } from "react"

export type ColorMode = "light" | "dark";

export type ModalType = "privacy" | "newsletter" | "sendTest";

export type HandleOpenModal = (
  modalType: ModalType,
  modalTitle: string,
  modalText: string,
  confirmCallback?: () => void
) => void;

export type IconType = FC<{ className?: string }>;

export type LabelledCheckboxProps = {
  labelId: string;
  labelText: string;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  isValid: boolean;
  modalType: ModalType;
  spanStub:  string;
  spanLinkText: string;
  onSpanLinkClick: (modalType: ModalType) => void;
};

export type CheckboxItem = {
    key: "agreeToNewsletter" | "agreeToTerms";
    labelId: string;
    labelText: string;
    modalType: "newsletter" | "privacy";
    spanStub: string;
    spanLinkText: string;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    isValid: boolean;
  };

export type ToastType = "default" | "success" | "error" | "warning" | "info";  