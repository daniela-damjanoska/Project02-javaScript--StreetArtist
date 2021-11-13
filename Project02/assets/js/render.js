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
    isPublishedText,
    isSold
) => {
    artistItemsListing.innerHTML += `
        <div class="col-47" id="${id}">
            <img src="${src}" class="img-item">
            <div class="text-box bg-light c-text-primary-default">
                <div class="row">
                    <p class="mb-0">${title}</p>
                    <button class="bg-primary-default c-text-normal price">$${price}</button>
                </div>
                <p>${calcProperTimeFormat(date)}</p>
                <p class="mb-0">${desc}</p>
            </div>
            <div class="bg-primary-default row buttons-wrapper">
                <button class="bg-primary-blue ${isSold} sold-status">Send to auction</button>
                <button class="${isPublished} publishing">${isPublishedText}</button>
                <button class="bg-primary-contrast remove">Remove</button>
                <button class="bg-light c-text-primary-default edit-item">Edit</button>
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

const makeAuctionWrapper = (img, title, artist, date, price) => {
    auctionPage.innerHTML = `
        <div class="auction-wrapper">
            <div class="timer row text-center">
                <div class="days">
                    <p class="day">00</p>
                    <span>Days</span>
                </div>
                <div class="hours">
                    <p class="hour">00</p>
                    <span>Hours</span>
                </div>
                <div class="Minutes">
                    <p class="minute">00</p>
                    <span>Minutes</span>
                </div>
                <div class="seconds">
                    <p class="second">00</p>
                    <span>Seconds</span>
                </div>
                </div>
                <div class="auction-items-listing bg-light row" id="01">
                    <div class="col-47">
                        <div class="img-wrapper">
                            <img src="${img}"/>
                        </div>
                        <div class="text-box c-text-primary-default">
                            <p class="title"><b>${title}</b></p>
                            <div class="row artist-created">
                                <p class="artist mb-0">by ${artist}</p>
                                <p>Date created:<span class="date"> ${date}</span></p>
                            </div>
                            <div class="row price">
                                <span class="price">Reserve price:</span>
                                <span class="c-text-normal starting-price">$${price}</span>
                            </div>
                            <div class="input-wrapper text-center">
                                <input type="number" placeholder="Your offer" />
                            </div>
                            <button class="bid">Bid!</button>
                        </div>
                    </div>
                    <div class="col-50"></div>
                </div>
            </div>
        `;
};

const createAuctionMsg = () => {
    auctionMsg.classList.add('msg-show');
    auctionMsg.innerHTML = `
        <p>You cannot send your item to auction right now, please try again later!</p>
        <button class="confirm">OK</button>
    `;
    dBlock(bodyOverlay);
    manipulateOverlayHeight(artistItemsPage);
};

const createRemoveMsg = () => {
    removeMsg.classList.add('msg-show');
    removeMsg.innerHTML = `
        <p><b>Are you sure that you want to remove this item?</b></p>
            <button class="confirm-remove">Yes</button>
            <button class="cancel-remove">Cancel</button>
        `;
    dBlock(bodyOverlay);
    manipulateOverlayHeight(artistItemsPage);
};
