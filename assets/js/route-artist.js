const initArtistHomePage = () => {
    const artistLS = localStorage.getItem('artist'),
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
    for (let i = 0; i < soldItems.length; i++) {
        if (!soldItems[i].priceSold) continue;
        sum += soldItems[i].priceSold;
    }

    //updating the data for the artist sold items and income
    document.querySelector('#totalItems').textContent = artistItems.length;
    document.querySelector('#soldItems').textContent = soldItems.length;
    document.querySelector('#totalIncome').textContent = `$${sum}`;
};
