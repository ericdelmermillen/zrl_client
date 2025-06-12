// scroll to top function for mounting page and scrolling to top
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  document.getElementById("nav")?.classList.remove("hide");
};


export {
  scrollToTop,
};