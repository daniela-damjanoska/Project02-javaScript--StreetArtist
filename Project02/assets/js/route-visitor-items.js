const initVisitorItemsPage = () => {
    const filteredPublished = items.filter(item => item.isPublished === true);

    makeArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dBlock(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    visitorListingPageInner.innerHTML = '';

    //render the items with the appropriate background color on different resolutions
    filteredPublished.forEach((item, idx) => {
        if (windowWidth <= 768) {
            if (idx % 2 === 0)
                makeVisitorListingItems(
                    item.id,
                    item.image,
                    item.artist,
                    item.price,
                    item.title,
                    item.description,
                    'bg-light c-text-primary-default',
                    'c-text-normal bg-primary-default'
                );
            else
                makeVisitorListingItems(
                    item.id,
                    item.image,
                    item.artist,
                    item.price,
                    item.title,
                    item.description,
                    'bg-primary-default c-text-normal',
                    'c-text-primary-default bg-light'
                );
        } else {
            if (idx === 0 || (idx + 1) % 4 === 0 || (idx + 1) % 4 === 1)
                makeVisitorListingItems(
                    item.id,
                    item.image,
                    item.artist,
                    item.price,
                    item.title,
                    item.description,
                    'bg-light c-text-primary-default',
                    'c-text-normal bg-primary-default'
                );
            else
                makeVisitorListingItems(
                    item.id,
                    item.image,
                    item.artist,
                    item.price,
                    item.title,
                    item.description,
                    'bg-primary-default c-text-normal',
                    'c-text-primary-default bg-light'
                );
        }
    });

    // click on filter icon to open filter-section
    filterIcon.addEventListener('click', openFilterSection);
};
