const initVisitorHomePage = () => {
    const filteredPublished = items.filter(item => item.isPublished === true);

    makeArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
    dNone(landingPage);
    dBlock(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    filteredPublished.forEach(item => {
        makeSliderImg(document.querySelector('.slide-track-one'), item.image);
        makeSliderImg(document.querySelector('.slide-track-two'), item.image);
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
};
