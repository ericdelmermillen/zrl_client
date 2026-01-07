import { type ReactNode } from "react";
import type { ColorMode, ModalType } from "../types/types";

export interface AppContextValue {
  // state and state setting 
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  scrollYPos: number;
  setScrollYPos: React.Dispatch<React.SetStateAction<number>>;
  windowWidth: number;
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>;
  prevScrollYPos: number;
  setPrevScrollYPos: React.Dispatch<React.SetStateAction<number>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  modalType: ModalType | null;
  setModalType: React.Dispatch<React.SetStateAction<ModalType | null>>;
  showDropdownNavOptions: boolean;
  setShowDropdownNavOptions: React.Dispatch<React.SetStateAction<boolean>>;
  navLinkClick: (optionName: string) => void;
  // functions
  loginUser: (email: string, password: string) => boolean;
  showNav: () => void;
  toggleColorMode: () => void;
  notFoundNavLinkClick: (to: string) => void;
  hideNav: () => void;
  logoutUser: () => void;
  handleSetModalType: (modalType: ModalType) => void;
};

export interface AppContextProviderProps {
  children: ReactNode;
};

export interface ClassNameInterface {
  className?: string;
}

export interface ChildrenPropsInterface {
  children?: ReactNode;
}

export interface NavOption {
  id: number;
  optionName: string;
}

export interface MoreInfoTextData {
  titleShort: string;
  titleFull: string;
  description: string;
}

export interface SolutionProps {
  img: string;
  shortTitle: string;
  fullTitle: string;
  text: string;
  tag: string;
  alt: string;
}

export interface SolutionsData {
  image: string;
  shortTitle: string;
  fullTitle: string;
  text: string;
  tag: string;
  alt: string;
};

export interface Bullet {
  bulletHeadingShort: string;
  bulletHeadingFull: string;
  bulletBlurb: string;
};

export interface DetailData {
  detailHeading: string;
  detailLead: string;
  bullets: Bullet[];
  detailImg: string;
  imgDesc: string;
}

export interface DetailProps extends DetailData {
  idx: number;
}