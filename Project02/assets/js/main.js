// 'use strict';

const windowWidth = window.innerWidth,
    landingPage = document.querySelector('#landingPage'),
    visitorHomePage = document.querySelector('#visitorHomePage'),
    visitorListingPage = document.querySelector('#visitorListingPage'),
    visitorListingPageInner = document.querySelector(
        '.visitor-listing-page-inner'
    ),
    artistHomePage = document.querySelector('#artistHomePage'),
    artistItemsPage = document.querySelector('#artistItemsPage'),
    artistItemsListing = document.querySelector('.artist-items-listing'),
    addEditSection = document.querySelector('#addEditPart'),
    auctionPage = document.querySelector('#auctionPage'),
    chooseBtnLanding = document.querySelector('#chooseArtistBtn'),
    chooseArtistWrapper = document.querySelector('.chooseArtistWrapper'),
    visitorBtnLanding = document.querySelector('.polygon-reverse'),
    filterSection = document.querySelector('#filterPart'),
    filterIcon = document.querySelector('#filterIcon'),
    bodyOverlay = document.querySelector('.overlay'),
    itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

const typeDropDown = document.querySelector('.choose-type');
const changeTypeArrow = document.querySelector('.chooseTypeArrow');

let isEditing = false;

//updating the items array
if (itemsLS) items = itemsLS;

//click on 'Join as visitor' div to open visitor-home-page
visitorBtnLanding.addEventListener('click', () => {
    location.hash = '#visitor';
});

// click on 'Find one btn' to go to visitor-listing-page
document.querySelector('.findMasterpiece').addEventListener('click', () => {
    location.hash = '#visitor/listing';
});

// click on filter icon to open filter-section
filterIcon.addEventListener('click', function () {
    location.hash = '#visitor/listing/filter';

    const filterPartHeight = filterSection.offsetHeight,
        windowHeight = window.innerHeight;

    filterSection.style.right = 0;
    document.body.classList.add('p-fixed');
    manipulateOverlayDisplay(this, 'none', 'block');
    bodyOverlay.style.height = '100vh';

    if (filterPartHeight < windowHeight) {
        filterSection.style.overflowY = 'hidden';
    } else {
        filterSection.style.overflowY = 'scroll';
        if (windowWidth < 600)
            filterSection.style.height = `${windowHeight - 50}px`;
        else filterSection.style.height = `${windowHeight}px`;
    }
});

document.addEventListener('click', function (e) {
    const menuArtist = document.querySelector('.artist-menu-page');

    //click on chose artist options to go to the appropriate artist homepage
    if (e.target.classList.contains('chooseArtist')) {
        location.hash = '#artists';
        localStorage.setItem('artist', e.target.textContent);
    }

    //if user wants to close the author list without to choose any option
    chooseArtistWrapper.style.display = 'none';
    chooseBtnLanding.style.opacity = 1;

    //click on logo to go to landing page
    if (e.target.classList.contains('logo')) {
        location.hash = '';
    }

    //click on menu icon to open the menu on artist pages
    if (e.target.classList.contains('menuIcon')) {
        manipulateOverlayDisplay(menuArtist, 'block', 'block');

        if (location.hash === '#artists/items') {
            manipulateOverlayHeight(artistItemsPage);
            document.body.style.overflowX = 'hidden';
        } else {
            bodyOverlay.style.height = '100vh';
        }
    }

    //click on home from the menu-artist to go to the artist homepage
    if (e.target.classList.contains('menuHome')) {
        location.hash = '#artists';
        manipulateOverlayDisplay(menuArtist, 'none', 'none');
    }

    //click on items from the menu-artist to go to the artist items page
    if (e.target.classList.contains('menuItems')) {
        location.hash = '#artists/items';
        manipulateOverlayDisplay(menuArtist, 'none', 'none');
    }

    //click on auction from the menu-artist to go to the auction page
    if (e.target.classList.contains('menuAuction')) {
        location.hash = '#auction';
        manipulateOverlayDisplay(menuArtist, 'none', 'none');
    }

    //click on slider img to go to visitor-listing-page
    if (e.target.classList.contains('img-slide')) {
        location.hash = '#visitor/listing';
    }

    //click on done-filter icon to close the filter section
    if (e.target.classList.contains('filter-done')) {
        closeFilterSection();
    }

    //click on close-filter icon to close the filter section
    if (e.target.classList.contains('close-filter')) {
        closeFilterSection();
    }

    //click on auction-icon on visitor pages to go to the auction page
    if (e.target.classList.contains('auctionIcon')) {
        location.hash = '#auction';
    }
});

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
