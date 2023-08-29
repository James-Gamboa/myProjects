const sliderList = document.querySelector("#sliderList");
const url = 'https://63f6833959c944921f7569ab.mockapi.io/Destinations';
const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');
const slideshow = document.querySelectorAll('.slideshow__container')[0];
let size = 0;

// @ts-ignore
if (slideshow.offsetWidth > 1024) {
  size = 725;
// @ts-ignore
} else if (slideshow.offsetWidth > 680) {
  size = 600;
} else {
  size = 300;
}

function next () {
  // @ts-ignore
  document.getElementById('sliderList').scrollLeft += size;
};

function previous () {
  // @ts-ignore
  document.getElementById('sliderList').scrollLeft -= size;
};

fetch(url)
.then(res => res.json())
.then(data => {  
  data.forEach(element => {
    const li = document.createElement('li')
    li.setAttribute('id', element.id)
    li.classList.add("card");
    li.classList.add("slideshow__fade");
    li.innerHTML = `
      <div class="card__wrapper">
      <img class="card__img" src="${element.heroImage}" alt="">
      <div class="card__info">
      <p class="card__info__name">${element.destination}</p>
      <p class="card__info__description">${element.description}</p>
      </div></div>
      </li>
      `;
  li.addEventListener('click', function() {
  window.location.href = `./destiny.html?id=${element.id}`
  });      
    // @ts-ignore
    sliderList.appendChild(li)
  })
})
.catch(err => console.log(err))
