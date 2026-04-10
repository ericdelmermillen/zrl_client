import { type FC, type ReactNode, type SetStateAction, type Dispatch } from "react";
import type { ColorMode, ModalType, HandleOpenModal, ModalInput } from "../types/types";

export interface AppContextValue {
  // state and state setting 
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  colorMode: ColorMode;
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
  appIsLoading: boolean;
  setAppIsLoading: Dispatch<SetStateAction<boolean>>;
  scrollYPos: number;
  setScrollYPos: Dispatch<SetStateAction<number>>;
  windowWidth: number;
  setWindowWidth: Dispatch<SetStateAction<number>>;
  prevScrollYPos: number;
  setPrevScrollYPos: Dispatch<SetStateAction<number>>;
  showDropdownNavOptions: boolean;
  setShowDropdownNavOptions: Dispatch<SetStateAction<boolean>>;
  navLinkClick: (optionName: string) => void;
  // functions
  handleSetShowIsLoadingTrue: (
  isLoadingStateSetter: Dispatch<React.SetStateAction<boolean>>,
  divId: string
) => void;
  handleSetShowIsLoadingFalse: (
  isLoadingStateSetter: Dispatch<React.SetStateAction<boolean>>,
  divId: string
) => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  showNav: () => void;
  toggleColorMode: () => void;
  notFoundNavLinkClick: (to: string) => void;
  hideNav: () => void;
  logoutUser: () => void;
};

export interface ModalContextValue {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>
  modalType: ModalType | null;
  setModalType: Dispatch<SetStateAction<ModalType | null>>;
  modalTitle: string; 
  setModalTitle: Dispatch<SetStateAction<string | "">>;
  modalText: string;
  setModalText: Dispatch<SetStateAction<string | "">>;
  modalInitialFormCheck: boolean;
  setModalInitialFormCheck: Dispatch<SetStateAction<boolean>>;
  modalInputs: ModalInput[] | null;
  setModalInputs: Dispatch<SetStateAction<ModalInput[] | null>>;
  modalConfirmCallback: ((inputValues?: Record<string, string>) => void) | null;
  setModalConfirmCallback: Dispatch<SetStateAction<((inputValues?: Record<string, string>) => void) | null>>;
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