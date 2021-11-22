const initVisitorHomePage = () => {
    const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));
    const filteredPublished = itemsLS.filter(item => item.isPublished === true);
    localStorage.setItem(
        'filteredPublishedLS',
        JSON.stringify(filteredPublished)
    );

    createArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
    dNone(landingPage);
    dBlock(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    filteredPublished.forEach(item => {
        createSliderImg(document.querySelector('.slide-track-one'), item.image);
        createSliderImg(document.querySelector('.slide-track-two'), item.image);
    });

    // click on 'Find one btn' to go to visitor-listing-page
    document.querySelector('.findMasterpiece').addEventListener('click', () => {
        location.hash = '#visitor/listing';
    });

    document.addEventListener('click', e => {
        //click on slider img to go to visitor-listing-page
        if (e.target.classList.contains('img-slide')) {
            location.hash = '#visitor/listing';
        }
    });

    window.scrollTo(0, 0);
};
