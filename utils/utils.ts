import React, { type ReactNode, type RefObject, type KeyboardEvent } from "react";
import type { ToastType } from "../src/typing/types/types";
import { toast } from "react-toastify";

const MIN_LOADING_INTERVAL = Number(import.meta.env.VITE_MIN_LOADING_INTERVAL);

const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });  
  removeClassFromDiv("nav", "hide");
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: unknown): boolean => {
  if (typeof password !== "string") {
    return false;
  };
  return password.trim().length >= 8;
};

const addClassToDiv = (divID: string, className: string): void => {
  document.getElementById(divID)?.classList.add(className);
};

const removeClassFromDiv = (divID: string, className: string): void => {
  document.getElementById(divID)?.classList.remove(className);
};

const staggerToastsByN = (message: string, toastType: ToastType, staggerOffset: number): void => {
  setTimeout(() => {
    if (toastType === "default") {
      toast(message);
    } else {
      toast[toastType](message);
    }
  }, MIN_LOADING_INTERVAL * staggerOffset);
};

const focusInputStart = (ref: RefObject<HTMLInputElement | null>): void => {
  ref.current?.focus();
  ref.current?.setSelectionRange(0, 0);
};

const handleFormEnterPress = (e: KeyboardEvent<HTMLFormElement>, boolean: boolean, elseCallback: () => void ): void => {
  if(e.key === "Enter" && boolean) {
    if(e.shiftKey) {
      return;
    };
    e.preventDefault();
    elseCallback();
  };
};

 const parseParagraphLink = (text: string): ReactNode => {
    const urlRegex = /(https?:\/\/[^\s\[]+)(?:\[([^\]]+)\])?/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
      const [ full, url, linkText ] = match;

      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      };

      parts.push(
        React.createElement(
          "a",
          {
            key: match.index,
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "moreInfoEmail__link"
          },
          linkText ?? url
        )
      );

      lastIndex = match.index + full.length;
    };

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    };

    return parts;
  };


export {
  scrollToTop,
  isValidEmail,
  isValidPassword,
  addClassToDiv,
  removeClassFromDiv,
  staggerToastsByN,
  focusInputStart,
  handleFormEnterPress,
  parseParagraphLink
};