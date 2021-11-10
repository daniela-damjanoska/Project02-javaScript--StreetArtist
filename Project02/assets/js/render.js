const navbar = document.querySelector('nav');

const makeLandingPageNav = () => {
    navbar.innerHTML = `
        <div class="navbar-landing-page row">
            <span class="c-text-primary-default"><b>Street ARTist</b></span>
        </div>
    `;
};

const makeArtistVisitorNavbar = (person, icon, elClass) => {
    navbar.innerHTML = `
        <div class="navbar-visitor-artist">
            <span class="navbar-brand">
                <img class="logo bg-light p-absolute" src="./img/Logo.png" alt="logo"/>
            </span>
            <div class="navbar-wrapper row">
                <span class="c-text-primary-default artist-name"><b>${person}</b></span>
                <span class="navbar-icon">
                        <img src="./img/${icon}.svg" class="${elClass}" alt="${icon}-icon"/>
                </span>
            </div>
        </div>
    `;
};

const makeSliderImg = (slideTrack, src) => {
    slideTrack.innerHTML += `<div class="slide">
    <img src="${src}" class="img-slide" alt="" />
    </div>`;
};

const makeVisitorListingItems = (
    id,
    src,
    artistName,
    price,
    title,
    desc,
    cssClassOne,
    cssClassTwo
) => {
    visitorListingPageInner.innerHTML += `
        <div class="col-47 ${cssClassOne}" id="${id}">
            <img src="${src}" class="img-item"/>
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

const makeArtistListingItems = (
    id,
    src,
    title,
    price,
    date,
    desc,
    isPublished,
    isPublishedText
) => {
    const dateFormat = date.slice(0, 10),
        year = dateFormat.slice(0, 4),
        month = dateFormat.slice(5, 7),
        day = dateFormat.slice(8);

    artistItemsListing.innerHTML += `
        <div class="col-47" id="${id}">
            <img src="${src}"/ class="img-item">
            <div class="text-box bg-light c-text-primary-default">
                <div class="row">
                    <p class="mb-0">${title}</p>
                    <button class="bg-primary-default c-text-normal price">$${price}</button>
                </div>
                <p>${day}.${month}.${year}</p>
                <p class="mb-0">${desc}</p>
            </div>
            <div class="bg-primary-default row buttons-wrapper">
                <button class="bg-primary-blue">Send to auction</button>
                <button class="${isPublished} publishing">${isPublishedText}</button>
                <button class="bg-primary-contrast remove">Remove</button>
                <button class="bg-light c-text-primary-default">Edit</button>
            </div>
        </div>
    `;
};

const makeRequiredFeedback = (reqField, parent) => {
    const feedbackPar = document.createElement('p');
    feedbackPar.classList.add(reqField, 'required');
    feedbackPar.textContent = '*required field';
    document.querySelector(parent).appendChild(feedbackPar);
};

const makeDropdownTypeMenu = function () {
    typeDropDown.classList.add('chooseTypeOpen');
    changeTypeArrow.classList.add('rotate-arrow');
    typeDropDown.innerHTML = '';
    itemTypes.forEach(
        type =>
            (typeDropDown.innerHTML += `
            <span class="chooseType">${type}</span>
    `)
    );
};
