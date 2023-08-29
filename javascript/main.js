let btnOpenMenu = document.querySelector("#open-menu");
let btnCloseMenu = document.querySelector("#close-menu");
let menu = document.querySelector("#mobile-menu");

// @ts-ignore
btnOpenMenu.addEventListener("click", () => {
  // @ts-ignore
  menu.classList.remove("disabled");
});

// @ts-ignore
btnCloseMenu.addEventListener("click", () => {
  // @ts-ignore
  menu.classList.add("disabled");
});
