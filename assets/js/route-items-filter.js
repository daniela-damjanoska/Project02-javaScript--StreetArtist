const initVisitorItemsFilterPage = () => {
    const filteredPublished = items.filter(item => item.isPublished === true);
    const filteredPublishedLS = JSON.parse(
        localStorage.getItem('filteredPublishedLS')
    );
    const filterItemsLS = JSON.parse(localStorage.getItem('filterItemsLS'));

    //if the user click on reload render tne navbar, open the items and filter section ----------------
    createArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dBlock(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    visitorListingPageInner.innerHTML = '';

    if (!filterItemsLS) createVisitorPageAllItems(filteredPublishedLS);
    else createVisitorPageAllItems(filterItemsLS);

    // // click on filter icon to open filter-section
    openFilterSection();
    //----------------------------------------------------------------------------------------------------

    //check the value of minPrice and maxPrice (not to be negative)
    addRedBorder(minPriceInputFilter);
    addRedBorder(maxPriceInputFilter);

    artistInputFilter.addEventListener('click', () => {
        // open the filterArtistDropdown
        createDropdownChooseArtist(artistDropDownFilter);
        artistDropDownFilter.classList.add('chooseTypeOpen');
        changeArtistArrowFilter.classList.add('rotate-arrow');
    });

    typeInputFilter.addEventListener('click', () => {
        createDropdownChooseType(typeDropDownFilter, changeTypeArrowFilter);
    });

    document.addEventListener('click', e => {
        //click on arrow-up to close the filterArtistDropdown
        if (e.target.classList.contains('rotate-arrow')) {
            closeDropdownMenu(artistDropDownFilter, changeArtistArrowFilter);
        }

        //select the option, update the value and close the filterArtistDropdown
        if (e.target.classList.contains('chooseArtist')) {
            artistInputFilter.value = e.target.textContent;
            closeDropdownMenu(artistDropDownFilter, changeArtistArrowFilter);
        }

        //click on arrow-up to close the filterTypeDropdown
        if (e.target.classList.contains('rotate-arrow')) {
            closeDropdownMenu(typeDropDownFilter, changeTypeArrowFilter);
        }

        //select the option, update the value and close the filterTypeDropdown
        if (e.target.classList.contains('chooseType')) {
            typeInputFilter.value = e.target.textContent;
            closeDropdownMenu(typeDropDownFilter, changeTypeArrowFilter);
        }

        //click on done-filter icon to close the filter section
        if (e.target.classList.contains('filter-done')) {
            //filter functionality
            let titleVal = titleInputFilter.value,
                artistVal = artistInputFilter.value,
                minPriceVal = minPriceInputFilter.valueAsNumber,
                maxPriceVal = maxPriceInputFilter.valueAsNumber,
                typeVal = typeInputFilter.value;

            if (
                titleVal ||
                artistVal ||
                minPriceVal ||
                maxPriceVal ||
                typeVal
            ) {
                const filterItems = filteredPublished.filter(item => {
                    return (
                        (titleVal.toLowerCase()
                            ? item.title.includes(titleVal.toLowerCase())
                            : true) &&
                        (artistVal ? item.artist === artistVal : true) &&
                        (minPriceVal ? item.price >= minPriceVal : true) &&
                        (maxPriceVal ? item.price <= maxPriceVal : true) &&
                        (typeVal ? item.type === typeVal : true)
                    );
                });

                localStorage.setItem(
                    'filterItemsLS',
                    JSON.stringify(filterItems)
                );
            }

            closeFilterSection();
        }

        //click on close-filter icon to close the filter section
        if (e.target.classList.contains('close-filter')) {
            closeFilterSection();
        }
    });
};
