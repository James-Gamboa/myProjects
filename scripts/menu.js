//hamburger menu
const nav = document.querySelector("#nav");
// @ts-ignore
const open = document.querySelector("#open");
// @ts-ignore
const close = document.querySelector("#close");

// @ts-ignore
open.addEventListener("click", () => {
  // @ts-ignore
  nav.classList.add("visible");
});

// @ts-ignore
close.addEventListener("click", () => {
  // @ts-ignore
  nav.classList.remove("visible");
});
