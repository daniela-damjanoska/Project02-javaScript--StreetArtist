const initVisitorItemsPage = () => {
    const filteredPublishedLS = JSON.parse(
        localStorage.getItem('filteredPublishedLS')
    );
    const filterItemsLS = JSON.parse(localStorage.getItem('filterItemsLS'));

    createArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dBlock(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    //create the items
    visitorListingPageInner.innerHTML = '';

    if (!filterItemsLS) {
        createVisitorPageAllItems(filteredPublishedLS);
    } else {
        if (filterItemsLS.length === 0) {
            //create the msg that there is no item with that search
            createFilterMessage();

            //back to items button when the previous msg is open
            document.addEventListener('click', e => {
                if (e.target.classList.contains('back-items')) {
                    localStorage.removeItem('filterItemsLS');
                    createVisitorPageAllItems(filteredPublishedLS);
                    dBlock(filterIcon);
                }
            });
        } else if (filterItemsLS.length !== 0) {
            // create the filtered items
            createVisitorPageAllItems(filterItemsLS);
            //open the showAll btn for user to back to all items
            createShowAllBtn();
            //remove the showAll btn when the user click the button and make the opposite functionality
            removeShowAllBtn();
        }
    }

    // click on filter icon to open filter-section
    filterIcon.addEventListener('click', openFilterSection);
};
