import { type FC } from "react"

export type ColorMode = "light" | "dark";

export type ModalType = "privacy" | "newsletter" | "sendTest";

export type HandleOpenModal = (
  modalType: ModalType, 
  modalTitle: string
) => void;

export type IconType = FC<{ className?: string }>;

export type ToastType = "default" | "success" | "error" | "warning" | "info";

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