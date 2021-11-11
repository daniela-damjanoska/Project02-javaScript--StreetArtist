'use strict';

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
    typeDropDown = document.querySelector('.choose-type'),
    changeTypeArrow = document.querySelector('.chooseTypeArrow'),
    menuHome = document.querySelector('.menuHome'),
    menuItems = document.querySelector('.menuItems'),
    menuAuction = document.querySelector('.menuAuction'),
    addTitleInput = document.querySelector('#addTitle'),
    addDescInput = document.querySelector('#itemDesc'),
    addTypeInput = document.querySelector('#itemType'),
    addPriceInput = document.querySelector('#itemPrice'),
    addImgUrlInput = document.querySelector('#imageUrl'),
    imgCheckBox = document.querySelector('img.checked'),
    itemsLS = JSON.parse(localStorage.getItem('itemsLS')),
    artistLS = localStorage.getItem('artist');

let isEditing = false;

const handleRoute = () => {
    let _hash = location.hash;

    switch (_hash) {
        case '#artists':
            initArtistHomePage();
            break;

        case '#artists/items':
            initArtistItemsPage();
            break;

        case '#artists/items/add':
            initArtistAddEditPage();
            break;

        case '#visitor':
            initVisitorHomePage();
            break;

        case '#visitor/listing':
            initVisitorItemsPage();
            break;

        case '#visitor/listing/filter':
            initVisitorItemsFilterPage();
            break;

        case '#auction':
            initAuctionPage();
            break;

        default:
            initLandingPage();
            break;
    }
};

//updating the items array
if (itemsLS) items = itemsLS;

document.addEventListener('click', function (e) {
    const menuArtist = document.querySelector('.artist-menu-page');

    //click on logo to go to landing page
    if (e.target.classList.contains('logo')) {
        location.hash = '';
    }

    //click on menu icon to open the menu on artist pages
    if (e.target.classList.contains('menuIcon')) {
        manipulateOverlayDisplay(menuArtist, 'block', 'block');

        if (windowWidth <= 600) {
            bodyOverlay.style.backgroundColor = 'transparent';
        }

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

    //click on auction-icon on visitor pages to go to the auction page
    if (e.target.classList.contains('auctionIcon')) {
        location.hash = '#auction';
    }
});

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
