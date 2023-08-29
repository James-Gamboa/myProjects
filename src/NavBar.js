// @ts-nocheck
document.querySelector('#header').innerHTML = `
<nav class="navBar navContainer">
  <div>
    <a href="/">
      <span>
        <img class="navBarSvg" src="../public/img/news.svg" alt="new aritcle picture" />
      </span>
    </a>
  </div>
  
  <div class="navBarLinks links">
    <a href="#">Home</a><a href="#">New</a><a href="#">Popular</a><a href="#">Trending</a>
  </div>
  <div id="navBarHamburger" data-menuswitch="off">
  
  <svg id="svgMenuHamburger"  class="ham hamRotate ham8" viewBox="0 0 100 100" width="60" onclick="this.classList.toggle('active')" onresize="this.classlist.toggle('active')">
  <path
        class="line top"
        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
  <path
        class="line middle"
        d="m 30,50 h 40" />
  <path
        class="line bottom"
        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
</svg>
  </div>
  
  
  <div id="menu">
  
<div id="sideMenuLinks" class="links">
<a href="#">Home</a><a href="#">New</a><a href="#">Popular</a
  ><a href="#">Trending</a>
</div>
</div>

</nav>

`

