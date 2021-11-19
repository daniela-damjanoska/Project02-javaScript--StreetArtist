const initArtistHomePage = () => {
    const currentBidWrapper = document.querySelector('#currentBidBox'),
        artistLS = localStorage.getItem('artist'),
        isAuctioning = localStorage.getItem('auction'),
        itemsLS = JSON.parse(localStorage.getItem('itemsLS')),
        artistItems = itemsLS.filter(item => item.artist === artistLS);

    localStorage.setItem('artistItemsLS', JSON.stringify(artistItems));

    createArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dBlock(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    addElClass(menuHome, 'active');
    removeElClass(menuItems, 'active');
    removeElClass(menuAuction, 'active');

    //filter the sold items from artist array
    const soldItems = artistItems.filter(
        itemSold => itemSold.dateSold !== undefined
    );

    //make a sum of the income of the sold items
    let sum = 0;
    soldItems.forEach(item => (sum += item.priceSold));

    //updating the data for the artist sold items and income
    document.querySelector('#totalItems').textContent = artistItems.length;
    document.querySelector('#soldItems').textContent = soldItems.length;
    document.querySelector('#totalIncome').textContent = `$${sum}`;

    // show the section with current bid amount
    if (isAuctioning) {
        document.querySelector(
            '#currentBidAmount'
        ).textContent = `$${currentBidLS}`;
        dBlock(currentBidWrapper);
    } else {
        dNone(currentBidWrapper);
    }
};
