const initAuctionPage = () => {
    //render appropriate navbar for artist or visitor
    const artistLS = localStorage.getItem('artist');

    if (artistLS) {
        createArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
        removeElClass(menuHome, 'active');
        removeElClass(menuItems, 'active');
        addElClass(menuAuction, 'active');
    } else {
        createArtistVisitorNavbar('Street ARTist', 'back', 'backIcon');
    }

    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dBlock(auctionPage);

    const auctioningTrue = localStorage.getItem('auction');

    if (auctioningTrue) {
        //example
        createAuctionItem('hello', 'hello', 'hello', 'hello', 'hello');
        const bidPriceInput = document.querySelector('#bidPrice');
        /////////////check the value of the price (not to be negative)

        //if there is auction in progress and an artist go to the auction page then make the bid button disabled and hide the bid input
        const bidInput = document.querySelector('.input-wrapper'),
            bidBtn = document.querySelector('.bid');

        if (artistLS) {
            bidBtn.setAttribute('disabled', true);
            dNone(bidInput);
        } else {
            bidBtn.removeAttribute('disabled');
            dBlock(bidInput);
        }
    }

    document.addEventListener('click', function (e) {
        const menuVisitor = document.querySelector('.visitor-menu-page');
        //click on back icon to open the visitor menu
        if (e.target.classList.contains('backIcon')) {
            manipulateMenuAndOverlayWhenSectionisUnder100vh(
                auctionPage,
                menuVisitor
            );

            if (windowWidth <= 600) {
                bodyOverlay.style.backgroundColor = 'transparent';
                document.querySelector('.logo').style.zIndex = 20;
            }
        }

        //click on close to close the menu-artist
        if (e.target.classList.contains('closeMenu')) {
            manipulateOverlayDisplay(menuVisitor, 'none', 'none');
        }

        //click on back to home from the visitor-artist to go to the visitor homepage
        if (e.target.classList.contains('menuHomeVisitor')) {
            location.hash = '#visitor';
            manipulateOverlayDisplay(menuVisitor, 'none', 'none');
        }

        //click on back to items from the visitor-artist to go to the visitor items page
        if (e.target.classList.contains('menuItemsVisitor')) {
            location.hash = '#visitor/listing';
            manipulateOverlayDisplay(menuVisitor, 'none', 'none');
        }

        //click on menu icon to open the artist menu
        if (e.target.classList.contains('menuIcon'))
            manipulateMenuAndOverlayWhenSectionisUnder100vh(
                auctionPage,
                menuArtist
            );
    });
};
