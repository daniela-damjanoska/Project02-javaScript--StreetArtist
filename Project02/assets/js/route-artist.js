const initArtistHomePage = () => {
    const artistLS = localStorage.getItem('artist'),
        totalItems = items.filter(item => item.artist === artistLS);

    makeArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dBlock(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    addElClass(menuHome, 'active');
    removeElClass(menuItems, 'active');
    removeElClass(menuAuction, 'active');

    const soldItems = totalItems.filter(itemSold => itemSold.priceSold !== 0);

    let sum = 0;
    for (let i = 0; i < soldItems.length; i++) {
        if (!soldItems[i].priceSold) continue;
        sum += soldItems[i].priceSold;
    }

    //updating the data for the artist sold items and income
    document.querySelector('#totalItems').textContent = totalItems.length;
    document.querySelector('#soldItems').textContent = soldItems.length;
    document.querySelector('#totalIncome').textContent = `$${sum}`;
};
