import type { ToastType } from "../src/typing/types/types";
import { toast } from "react-toastify";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

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


const isValidPassword = (password: unknown): boolean => {
  if(typeof password !== "string") return false;
  return password.trim().length >= 8;
};


const addClassToDiv = (divID: string, className: string): void => {
  document.getElementById(divID)?.classList.add(className);
};

const removeClassFromDiv = (divID: string, className: string): void => {
  document.getElementById(divID)?.classList.remove(className);
};

const staggerToastsByInterval = (message: string, toastType: ToastType, staggerOffset: number): void => {
  setTimeout(() => {
    if(toastType === "default") {
      toast(message);
    } else {
      toast[toastType](message);
    }
  }, MIN_LOADING_INTERVAL * staggerOffset);
};

export {
  scrollToTop,
  isValidEmail,
  isValidPassword,
  addClassToDiv,
  removeClassFromDiv,
  staggerToastsByInterval
};







// import { jwtDecode } from "jwt-decode";
// import toast from "react-hot-toast";

// // convert to typescript


// interface DecodedToken {
//   exp: number;
//   [key: string]: any; // include any other properties your JWT might have
// }



// const BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;

// // // use for setting up drag and drop functionality since firefox has issues with on drag (use onTouchStart)
// // const checkIfIsFirefox = (): boolean => {
// //   return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
// // };

// // use for setting up drag and drop functionality since firefox has issues with onDrag (use onTouchStart)
// const checkIfIsFirefox = (): boolean => {
//   // test this
//   return navigator.userAgent.toLowerCase().includes('firefox');
// };



// // scroll to top function for mounting page and scrolling to top
// const scrollToTop = (): void => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
  
//   document.getElementById("nav")?.classList.remove("hide");
// };



// // const isValidEmail = (email: string): boolean => {
// //   if(typeof email !== "string"){ 
// //     return false;
// //   };
  
// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   return emailRegex.test(email);
// // };

// const isValidEmail = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };




// const isValidPassword = (password: string): boolean => {
//   return password.trim().length >= 8;
// };



// const setTokens = (token: string, refreshToken: string): boolean => {
//   if(token) {
//     localStorage.setItem('token', token);
//   };

//   if(refreshToken) {
//     localStorage.setItem('refreshToken', refreshToken);
//   };
  
//   return true;
// };




// const isValidURL = (str: string): boolean => {
//   if(str.includes("mailto:") || str.includes("@")) {
//     return false
//   };

//   const pattern = new RegExp('^(https?:\\/\\/)?' +
//     '(?:([^:@]+)(?::([^@]+))?@)?' + // Optional username and password
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
//   // return !!pattern.test(str);
//   return pattern.test(str);
// };


// const removeTokens = (): boolean => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('refreshToken');
//   return true; 
// };



// // returns true or false
// // const checkTokenIsValid = async (navigate) => {
// const checkTokenIsValid = async (navigate: (path: string) => void): Promise<boolean> => {
//   const token = localStorage.getItem('token');

//   if(!token) {
//     removeTokens();
//     return false;
//   };

//   try {
//     // const decodedToken = jwtDecode(token);
//     const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
//     const currentTime = Math.floor(Date.now() / 1000);

//     if(decodedToken.exp > currentTime) {
//       return true;
//     };

//     console.log("Token expired: attempting refresh");

//     const refreshToken = localStorage.getItem('refreshToken');

//     if(!refreshToken) {
//       toast.error("Refresh token missing. Logging you out...");
//       removeTokens();
//       navigate("/");
//       return false;
//     };

//     const refreshResponse = await fetch(`${BASE_URL}/auth/refreshtoken`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-refresh-token': refreshToken,
//       }
//     });

//     if(!refreshResponse.ok) {
//       toast.error("Token refresh failed. Logging you out...");
//       removeTokens();
//       navigate("/");
//       return false;
//     };

//     // const { newToken, newRefreshToken } = await refreshResponse.json();
//     const { newToken, newRefreshToken }: { newToken: string; newRefreshToken: string } = await refreshResponse.json();
//     setTokens(newToken, newRefreshToken);
//     return true;

//   } catch (error) {
//     console.error('Error during token validation:', error);
//     toast.error('An error occurred. Logging you out...');
//     removeTokens();
//     navigate("/");
//     return false;
//   };
// };



// const addClassToDiv = (divID: string, className: string): void => {
//   document.getElementById(divID)?.classList.add(className);
// };

// const removeClassFromDiv = (divID: string, className: string): void => {
//   document.getElementById(divID)?.classList.remove(className);
// };

// // const getMonthYear = (dateString: string): string => {
// //   const [ day, month, year ] = dateString?.split("-"); // Split by '-'

// //   // Create a new Date object using the correct month and year
// //   const date = new Date(year, parseInt(month, 10) - 1, day);
// //   const monthName = date.toLocaleString('en-US', { month: 'short' });

// //   // console.log(`${monthName} ${year}`); // Dec 2024
// //   return `${monthName} ${year}`;
// // };

// const getMonthYear = (dateString: string): string => {
//   // test this
//   const [ day, month, year ] = dateString.split("-");

//   const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
//   const monthName = date.toLocaleString("en-US", { month: "short" });

//   return `${monthName} ${year}`;
// };


// const getFormattedDate = (date: Date): string => {
//   // test this
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Use local time zone
//   const year = date.getFullYear(); // Use local time zone

//   return `${day}-${month}-${year}`; // Return in "DD-MM-YYYY" format
// };


// export {
//   checkIfIsFirefox,
//   scrollToTop,
//   isValidEmail,
//   isValidURL,
//   isValidPassword,
//   setTokens,
//   removeTokens,
//   checkTokenIsValid,
//   addClassToDiv,
//   removeClassFromDiv,
//   getMonthYear,
//   getFormattedDate
// };