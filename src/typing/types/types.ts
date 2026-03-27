import { type FC } from "react"

export type ColorMode = "light" | "dark";

export type ModalType = "privacy" | "terms" | "newsletter";

export type IconType = FC<{ className?: string }>;

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