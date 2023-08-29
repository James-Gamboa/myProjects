// @ts-nocheck
let menu = document.querySelector("#menu");
var menuStatus = "off";

function menuOnclick(e) {
  if (menuStatus === "off") {
    menu.style.setProperty("width", "200px");
    menu.style.setProperty("opacity", "1");
    menuStatus = "on";
    window.addEventListener("resize", menuOnclick);
    return;
  }
  if (menuStatus === "on") {
    menu.style.removeProperty("width");
    menu.style.removeProperty("opacity");
    menuStatus = "off";
    if (e.type !== "click") {
      document.querySelector("#svgMenuHamburger").classList.remove("active");
    }

    window.removeEventListener("resize", menuOnclick);
    return;
  }
}
document
  .querySelector("#navBarHamburger")
  .addEventListener("click", menuOnclick);
