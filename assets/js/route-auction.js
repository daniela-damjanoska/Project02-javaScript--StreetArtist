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
                //stop the timer
                clearInterval(timer);

                //find the item in itemsLS array and set item isAuctioning property to true, and set dateSold and priceSold properties
                const itemsLS = JSON.parse(localStorage.getItem('itemsLS')),
                    priceSold = JSON.parse(
                        localStorage.getItem('currentBidLS')
                    );

                itemsLS.forEach(item => {
                    if (item.isAuctioning === true) {
                        if (!priceSold) {
                            item.isAuctioning = false;
                        } else {
                            item.isAuctioning = false;
                            item.dateSold = new Date().toISOString();
                            item.priceSold = priceSold;
                        }
                    }
                });

                localStorage.setItem('itemsLS', JSON.stringify(itemsLS));

                updateArtistItemsArray();

                // clear the local storage
                localStorage.removeItem('auction');
                localStorage.removeItem('startTime');
                localStorage.removeItem('endTime');
                localStorage.removeItem('itemForAuctionId');
                localStorage.removeItem('remainingTime');
                localStorage.removeItem('bidArrLS');
                if (!localStorage.getItem('artist'))
                    localStorage.removeItem('artistItemsLS');
            }
        });

        //biding process
        const formBid = document.querySelector('.send-bid'),
            bidInput = document.querySelector('.input-wrapper'),
            bidAmountInput = document.querySelector('#bidAmount'),
            confirmBidBtn = document.querySelector('.bid'),
            startPriceContent =
                document.querySelector('.starting-price').textContent;

        //create empty arr for bids to save them in local storage and to render on page  reload
        let bidArr = [];

        // on form bid submit
        formBid.addEventListener('submit', e => {
            e.preventDefault();

            //remove red border(if any) on focus
            bidAmountInput.addEventListener('focus', () => {
                bidAmountInput.style.borderWidth = '2px';
                bidAmountInput.style.borderColor = '#ff9900';
            });

            //check whether the input is empty or its value is smaller than the reserve price
            if (
                !bidAmountInput.value ||
                bidAmountInput.valueAsNumber <= +startPriceContent.slice(1)
            ) {
                bidAmountInput.style.borderWidth = '3px';
                bidAmountInput.style.borderColor = '#c90f0f';
            } else if (
                bidAmountInput.value &&
                bidAmountInput.valueAsNumber > +startPriceContent.slice(1)
            ) {
                // appending visitor bid to the list
                createBidContent('bid-visitor', bidAmountInput.value);

                //create bid object to push in the bidArr
                const newBid = {
                    amount: bidAmountInput.value,
                    left: true,
                    right: false,
                };

                bidArr.push(newBid);

                //save array of bids in local storage so the bids can be rendered after page reload
                localStorage.setItem('bidArrLS', JSON.stringify(bidArr));

                //save the current bid in local storage so it can be rendered in artist home page
                localStorage.setItem('currentBidLS', bidAmountInput.value);

                // making bid request
                makeBid(bidAmountInput.value).then(data => {
                    const { isBidding, bidAmount } = data;

                    // if is bidding
                    if (isBidding) {
                        // appending their bid to the list
                        createBidContent('bid-api', bidAmount);

                        //create bid object to push in the bidArr
                        const newBid = {
                            amount: bidAmount,
                            left: false,
                            right: true,
                        };

                        //save array of bids in local storage so the bids can be rendered after page reload
                        bidArr.push(newBid);
                        localStorage.setItem(
                            'bidArrLS',
                            JSON.stringify(bidArr)
                        );

                        bidAmountInput.setAttribute('min', bidAmount);
                        bidAmountInput.value = bidAmount + 50;

                        //update the timer
                        const end = JSON.parse(localStorage.getItem('endTime')),
                            updateTimer = end + 60000;

                        localStorage.setItem('endTime', updateTimer);
                    } else {
                        //when bidding is done, disable the bid button, remove the input and remove bidding from local storage
                        confirmBidBtn.setAttribute('disabled', true);
                        dNone(bidInput);
                        localStorage.removeItem('bidding');
                    }
                });
            }
        });

        //create the bid list after page reload
        const bidArrLS = JSON.parse(localStorage.getItem('bidArrLS'));

        if (bidArrLS && bidArrLS.length !== 0) {
            bidArrLS.forEach(bid => {
                if (bid.right === false) {
                    createBidContent('bid-visitor', bid.amount);
                } else {
                    createBidContent('bid-api', bid.amount);
                }
            });
        }

        // if there is auction in progress and an artist go to the auction page/or bidding is done then make the bid button disabled and hide the bid input
        if (artistLS || !localStorage.getItem('bidding')) {
            confirmBidBtn.setAttribute('disabled', true);
            dNone(bidInput);
        } else {
            confirmBidBtn.removeAttribute('disabled');
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
