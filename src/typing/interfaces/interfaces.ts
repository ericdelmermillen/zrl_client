import { type FC, type ReactNode } from "react";
import type { ColorMode, ModalType, HandleOpenModal } from "../types/types";

export interface AppContextValue {
  // state and state setting 
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
  appIsLoading: boolean;
  setAppIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  scrollYPos: number;
  setScrollYPos: React.Dispatch<React.SetStateAction<number>>;
  windowWidth: number;
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>;
  prevScrollYPos: number;
  setPrevScrollYPos: React.Dispatch<React.SetStateAction<number>>;
  showDropdownNavOptions: boolean;
  setShowDropdownNavOptions: React.Dispatch<React.SetStateAction<boolean>>;
  navLinkClick: (optionName: string) => void;
  // functions
  handleSetShowAppIsLoadingFalse: () => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  showNav: () => void;
  toggleColorMode: () => void;
  notFoundNavLinkClick: (to: string) => void;
  hideNav: () => void;
  logoutUser: () => void;
};

export interface ModalContextValue {
  // // state and state setting 
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  modalType: ModalType | null;
  setModalType: React.Dispatch<React.SetStateAction<ModalType | null>>;
  modalTitle: string; 
  setModalTitle: React.Dispatch<React.SetStateAction<string | "">>;
  modalConfirmCallback: ((inputValues?: Record<string, string>) => void) | null;
  setModalConfirmCallback: React.Dispatch<React.SetStateAction<((inputValues?: Record<string, string>) => void) | null>>;
  modalText: string;
  setModalText: React.Dispatch<React.SetStateAction<string | "">>;
  // handlers
  handleOpenModal: HandleOpenModal;
  handleClearModal: () => void;
};

export interface AppContextProviderProps {
  children: ReactNode;
};

export interface ModalContextProviderProps {
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

export interface NavProps {
  children?: ReactNode;
  navOptions: NavOption[];
};

export interface CarouselItem {
  itemName: string;
};

export interface CarouselProps {
  carouselItems: CarouselItem[];
  itemClassName?: string;
  direction?: "left" | "right";
  secondsPerLoop?: number;
  carouselAriaLabel?: string;
};

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

export interface ExpertiseItemProps {
  Icon: FC<{ className?: string; "aria-label"?: string }>;
  iconClassModifier: string;
  name: string;
  desc: string;
}

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

export interface FooterSocial {
  name: string;
  socialLink: string;
  socialIcon: FC<{ className?: string }>;
}