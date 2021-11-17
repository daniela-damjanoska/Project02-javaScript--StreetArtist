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
        dNone(bodyOverlay);
        //find the element for auction
        const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

        const itemForAuctionIdLS = JSON.parse(
            localStorage.getItem('itemForAuctionId')
        );

        const itemForAuction = itemsLS.find(
            item => item.id === itemForAuctionIdLS
        );

        //update the arrays
        itemsLS.forEach((item, idx) => {
            if (idx + 1 === itemForAuctionIdLS) {
                item.isAuctioning = true;
            }
        });

        localStorage.setItem('itemsLS', JSON.stringify(itemsLS));

        updateArtistItemsArray();

        //create the auction item
        createAuctionItem(
            itemForAuction.image,
            itemForAuction.title,
            itemForAuction.artist,
            calcProperTimeFormat(itemForAuction.dateCreated),
            itemForAuction.price / 2
        );

        //make the timer
        const timer = setInterval(() => {
            const end = JSON.parse(localStorage.getItem('endTime'));

            let remainingTime = end - new Date();

            if (remainingTime >= 0) {
                const time = Math.floor(remainingTime / 1000),
                    minutes = Math.floor(time / 60),
                    seconds = time % 60;

                document.querySelector('.minute').textContent =
                    minutes < 10 ? `0${minutes}` : minutes;
                document.querySelector('.second').textContent =
                    seconds < 10 ? `0${seconds}` : seconds;
            } else {
                //stop the timer and clear the local storage
                clearInterval(timer);
                localStorage.removeItem('auction');
                localStorage.removeItem('startTime');
                localStorage.removeItem('endTime');
                localStorage.removeItem('itemForAuctionId');
                localStorage.removeItem('remainingTime');
                if (!localStorage.getItem('artist'))
                    localStorage.removeItem('artistItemsLS');
            }
        });

        /////////////check the value of the price (not to be negative)
        const bidPriceInput = document.querySelector('#bidPrice');

        // if there is auction in progress and an artist go to the auction page then make the bid button disabled and hide the bid input
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
