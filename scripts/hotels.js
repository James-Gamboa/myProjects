const destiny = document.querySelector("#destiny");
const button = document.querySelector('#button');
const hotel = document.querySelector('#hotels');
const hotelInfo = document.querySelector('#hotelInfo');
const roomSlider = document.querySelector('#roomSlider');
const galery = document.querySelector('#galery');
const features = document.querySelector('#features');

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get('id');
const hotelUrl = 'https://63f6833959c944921f7569ab.mockapi.io/Hotels';

if (window.location.pathname === "/components.html") {
  // @ts-ignore
  id = 1;
}

function nextRoom () {
  // @ts-ignore
  document.getElementById('roomSlider').scrollLeft += size;
};

function previousRoom () {
  // @ts-ignore
  document.getElementById('roomSlider').scrollLeft -= size;
};


/// HOTEL DESCRIPTION //// display features on hotel-info
fetch(`${hotelUrl}/${id}`)
.then(res => res.json())
.then(data => {
  const div = document.createElement('div');
  div.setAttribute('id', data.id)
  div.innerHTML = `
        <h4 class="subtitle__description">About ${data.hotelName}</h4>
        <p class="text__description">${data.description}</p>
      </div>
      <div class="container__list--flex container">
        <ul class="list__styles">
          <li>${data.featuresHotel[0]}</li>
          <li>${data.featuresHotel[1]}</li>
          <li>${data.featuresHotel[2]}</li>
          <li>${data.featuresHotel[3]}</li>
        </ul>
        <ul class="list__styles">
          <li>${data.featuresHotel[4]}</li>
          <li>${data.featuresHotel[5]}</li>
          <li>${data.featuresHotel[6]}</li>
        </ul>
      </div>
    </div>`;

  features.appendChild(div); 

  //// ROOMS CARDS WITH INFORMATION
  data.roomsList.forEach(element => {
    const li = document.createElement('li')
    li.classList.add("card");
    li.classList.add("slideshow__fade");
    li.innerHTML = `
      <div class="card__wrapper">
      <img class="card__img" src="${element.roomImage}" alt="">
      <div class="card__info">
      <p class="card__info__name">${element.roomName}</p>
      <p>Features</p>
      <ul>
        <li class="card__info__description">${element.features[0]}</li>
        <li class="card__info__description">${element.features[1]}</li>
        <li class="card__info__description">${element.features[2]}</li>
        <li class="card__info__description">${element.features[3]}</li>
      </ul>
      <p>${element.price}</p>
      <p class="card__info__discount">${element.discount || ""}</p>
      </div></div>
    </li>`;

    roomSlider.appendChild(li);
  })

  button.addEventListener('click', function() {
    window.location.href = `./hotel-info.html?id=${data.id}`
  })
})
.catch(err => console.log(err)) 

/// HOTEL-INFO ///
fetch(`${hotelUrl}/${id}`)
.then(res => res.json())
.then(data => {
  const div = document.createElement('div');
  div.setAttribute('id', data.id)
  div.innerHTML = `
      <div class="container__flex">
        <img src="${data.image}" alt="" class="container__flex--img" />
        <div class="container__flex--list">
          <h2 class="subtitle__main">${data.hotelName}</h2>
          <img src="public/img/hotelImage/stars.png" alt="" />
          <p class="text__address">
            ${data.address}
          </p>
          <a href="tel:${data.phoneNunber}">${data.phoneNunber}</a>
        </div>
      </div>
      <div class="description__above--line container">
    </div>`;

  hotelInfo.appendChild(div);
})
.catch(err => console.log(err))


/// TITLE AND IMAGE DESTINY ///
fetch(`${url}/${id}`)
.then(res => res.json())
.then(data => {
  const destination = document.createElement('div')
  destination.innerHTML = `
    <h2 class="title">${data.destination}</h2>
    <div class="imageCont">
    <img class="imageCont__img" src="${data.heroImage}" alt=""/>
    </div>
  `;
  const description = document.createElement("div");
  description.innerHTML = `
  <p class="hidden" id="words">
    ${data.description}
  </p>
`;
  // @ts-ignore
  destiny.appendChild(destination)
  // @ts-ignore
  words.appendChild(description)
  
})
.catch(err => console.log(err))

/// HOTEL CARD FROM DESTINY ///
fetch(`${hotelUrl}/${id}`)
.then(res => res.json())
.then(data => {
  const li = document.createElement('li')
    li.setAttribute('id', data.id)
    li.classList.add("card");
    li.classList.add("cards");
    li.innerHTML = `
    <div class="card__wrapper">
    <img class="card__img" src="${data.image}" alt="">
    <div class="card__info">
    <p class="card__info__name">${data.hotelName}</p>
    <p class="card__info__description">${data.description}</p>
    </div>
    </div>
    </li>
  `;

  li.addEventListener('click', function() {
    window.location.href = `./hotel-info.html?id=${data.id}`
  })

  // @ts-ignore
  sliderList.appendChild(li); 

})
.catch(err => console.log(err)) 

//// DESTINIES GALERY ////
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

    galery.appendChild(li)
  })
})
.catch(err => console.log(err))