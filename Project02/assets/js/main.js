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
    auctionPage = document.querySelector('#auctionPage'),
    chooseBtnLanding = document.querySelector('#chooseArtistBtn'),
    chooseArtistWrapper = document.querySelector('.chooseArtistWrapper'),
    visitorBtnLanding = document.querySelector('.polygon-reverse'),
    filterSection = document.querySelector('#filterPart'),
    filterIcon = document.querySelector('#filterIcon'),
    bodyOverlay = document.querySelector('.overlay'),
    itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

const manipulateOverlayHeight = section => {
    const overlayHeight = section.offsetHeight;
    bodyOverlay.style.height = `${overlayHeight + 75}px`;
};

const manipulateOverlayDisplay = (element, status, overlay) => {
    element.style.display = status;
    bodyOverlay.style.display = overlay;
};

const closeFilterSection = () => {
    location.hash = '#visitor/listing';

    filterSection.style.right = '-600px';
    filterSection.style.overflowY = 'hidden';
    document.body.classList.remove('p-fixed');
    manipulateOverlayDisplay(filterIcon, 'block', 'none');
};

//updating the items array
if (itemsLS) items = itemsLS;

// click on choose button on landing-page to open the list of artist (from API)
chooseBtnLanding.addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(res => {
            this.style.opacity = 0;
            chooseArtistWrapper.style.display = 'block';
            chooseArtistWrapper.innerHTML = '';

            res.forEach(user => {
                chooseArtistWrapper.innerHTML += `
                    <span class="chooseArtist" id="${user.id}">${user.name}</span>
                `;
            });
        });
});

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

document.querySelector('.add-items').addEventListener('click', function () {
    const addEditSection = document.querySelector('#addEditPart');

    manipulateOverlayDisplay(addEditSection, 'block', 'block');
    manipulateOverlayHeight(artistItemsPage);
    document.body.style.overflowX = 'hidden';
});

document.addEventListener('click', function (e) {
    const menuArtist = document.querySelector('.artist-menu-page'),
        removeConfirmation = document.querySelector('.remove-confirmation');

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

    //click on remove button to open the confirmation popup
    if (e.target.classList.contains('remove')) {
        const itemToRemove = e.target.parentElement.parentElement;

        manipulateOverlayDisplay(removeConfirmation, 'block', 'block');
        manipulateOverlayHeight(artistItemsPage);

        localStorage.setItem('itemToRemove', itemToRemove.id);

        //click on confirm button to delete the item and also to update(filter) the items array
        document
            .querySelector('.confirm-remove')
            .addEventListener('click', () => {
                itemToRemove.remove();

                const itemToRemoveId = localStorage.getItem('itemToRemove'),
                    filteredArrayWithItems = items.filter(
                        item => item.id !== +itemToRemoveId
                    );

                localStorage.setItem(
                    'itemsLS',
                    JSON.stringify(filteredArrayWithItems)
                );

                manipulateOverlayDisplay(removeConfirmation, 'none', 'none');
            });
    }

    //click on cancel button to cancel the item deletion
    if (e.target.classList.contains('cancel-remove')) {
        manipulateOverlayDisplay(removeConfirmation, 'none', 'none');
    }
});

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
