const initAuctionPage = () => {
    //render appropriate navbar for artist or visitor
    if (artistLS) {
        makeArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
        removeElClass(menuHome, 'active');
        removeElClass(menuItems, 'active');
        addElClass(menuAuction, 'active');
    }
    //this icon should be changed with back icon ???????????????????
    else makeArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');

    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dBlock(auctionPage);
};
