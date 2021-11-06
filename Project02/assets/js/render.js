const makeNavbar = (person, icon, elClass) => {
    document.querySelector('nav').innerHTML = `
        <div class="navbar-visitor-artist">
            <span class="navbar-brand">
                <img class="logo bg-light p-absolute" src="./img/Logo.png" alt="logo"/>
            </span>
            <div class="navbar-wrapper row">
                <span class="c-text-primary-default"><b>${person}</b></span>
                <span class="navbar-icon">
                        <img src="./img/${icon}.svg" class="${elClass}" alt="${icon}-icon"/>
                </span>
            </div>
        </div>
    `;
};

const makeSliderImg = (slideTrack, src) => {
    slideTrack.innerHTML += `<div class="slide">
    <img src="${src}" alt="" />
    </div>`;
};

const makeVisitorListingPhotos = (
    id,
    src,
    artistName,
    price,
    title,
    desc,
    cssClassOne,
    cssClassTwo
) => {
    document.querySelector('.visitor-listing-page-inner').innerHTML += `
        <div class="col-47 ${cssClassOne}" id="${id}">
            <img src="${src}"/>
            <div class="text-box">
                <div class="row">
                    <span>${artistName}</span>
                    <button class="${cssClassTwo}">$${price}</button>
                </div>
                <p>${title}</p>
                <p class="mb-0">${desc}</p>
            </div>
        </div>
    `;
};
