// scroll to top function for mounting page and scrolling to top
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  document.getElementById("nav")?.classList.remove("hide");
};


const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};


const isValidPassword = (password: string) =>{
  return password.trim().length >= 8;
};



const isValidPhoneNumber = (phone: string): boolean => {
  if (typeof phone !== "string") return false;

  // Remove all non-digit characters except leading +
  const normalized = phone.trim().replace(/[^\d+]/g, '');

  // If it starts with +, remove it just for length checking
  const digitsOnly = normalized.startsWith('+') ? normalized.slice(1) : normalized;

  // Phone must be 10 to 12 digits max (e.g., 6476710836 or +16476710836)
  if (digitsOnly.length < 10 || digitsOnly.length > 12) return false;

  // Must contain only digits (after optional +)
  if (!/^\+?\d+$/.test(normalized)) return false;

  // Optional: check for valid North American Numbering Plan (NANP) rules
  // Area codes and exchange codes can't start with 0 or 1
  const num = digitsOnly.length === 10 ? digitsOnly : digitsOnly.slice(-10); // last 10 digits
  const areaCode = num.slice(0, 3);
  const exchangeCode = num.slice(3, 6);
  if (['0', '1'].includes(areaCode[0]) || ['0', '1'].includes(exchangeCode[0])) {
    return false;
  };

  return true;
};

const addClassToDiv = (divID: string, className: string): void => {
  document.getElementById(divID)?.classList.add(className);
};

const removeClassFromDiv = (divID: string, className: string): void => {
  document.getElementById(divID)?.classList.remove(className);
};


export {
  scrollToTop,
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  addClassToDiv,
  removeClassFromDiv
};