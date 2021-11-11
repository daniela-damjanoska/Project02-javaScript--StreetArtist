const initArtistAddEditPage = () => {
    const isPublishWrapper = document.querySelector('.isPublishWrapper'),
        totalItems = items.filter(item => item.artist === artistLS);

    //if the user click on reload render tne navbar, open the items and edit/new section ----------------
    makeArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
    dNone(auctionPage);

    artistItemsListing.innerHTML = '';

    //render the items with the appropriate publish/unpublish button and send/not sent to auction button
    totalItems.forEach(item => {
        if (item.isPublished === true && item.priceSold === undefined)
            makeArtistListingItems(
                item.id,
                item.image,
                item.title,
                item.price,
                item.dateCreated,
                item.description,
                'bg-primary-green',
                'unpublish',
                'sold-no'
            );
        else if (item.isPublished === true && item.priceSold !== undefined)
            makeArtistListingItems(
                item.id,
                item.image,
                item.title,
                item.price,
                item.dateCreated,
                item.description,
                'bg-primary-green',
                'unpublish',
                'sold-yes'
            );
        else if (item.isPublished === false && item.priceSold === undefined)
            makeArtistListingItems(
                item.id,
                item.image,
                item.title,
                item.price,
                item.dateCreated,
                item.description,
                'btn-grey',
                'publish',
                'sold-no'
            );
        else if (item.isPublished === false && item.priceSold !== undefined)
            makeArtistListingItems(
                item.id,
                item.image,
                item.title,
                item.price,
                item.dateCreated,
                item.description,
                'bg-primary-green',
                'unpublish',
                'sold-yes'
            );
    });

    //make go to auction buttons disabled when the item is sold
    const soldBtns = document.querySelectorAll('.sold-status');
    soldBtns.forEach(btn => {
        if (btn.classList.contains('sold-yes')) {
            btn.setAttribute('disabled', true);
        }
    });

    openNewEditSection();
    //-----------------------------------------------------------------------------------------------------

    //manipulating the isPublished checkbox
    isPublishWrapper.addEventListener('click', e => {
        e.stopPropagation();
        toggleElClass(imgCheckBox, 'hide');

        if (imgCheckBox.classList.contains('hide'))
            isPublishWrapper.removeAttribute('data-checked');
        else isPublishWrapper.setAttribute('data-checked', true);

        if (isPublishWrapper.getAttribute('data-checked')) {
            localStorage.setItem('isPublished', true);
        } else {
            localStorage.setItem('isPublished', false);
        }
    });

    //add/edit functionality
    addEditSection.addEventListener('submit', e => {
        e.preventDefault();

        if (!addTitleInput.value) {
            document.querySelector('.add-title-req').innerHTML = '';
            makeRequiredFeedback('reqTitle', '.add-title-req');
        }

        if (!addTypeInput.value) {
            document.querySelector('.add-type').innerHTML = '';
            makeRequiredFeedback('reqType', '.add-type');
        }

        if (!addPriceInput.value) {
            document.querySelector('.add-price').innerHTML = '';
            makeRequiredFeedback('reqPrice', '.add-price');
        }

        if (!addImgUrlInput.value) {
            document.querySelector('.add-img').innerHTML = '';
            makeRequiredFeedback('reqImgUrl', '.add-img');
        }

        const reqTitle = document.querySelector('.reqTitle'),
            reqType = document.querySelector('.reqType'),
            reqPrice = document.querySelector('.reqPrice'),
            reqImgUrl = document.querySelector('.reqImgUrl');

        manipulatingRequiredFieldsOnFocus(addTitleInput, reqTitle);
        manipulatingRequiredFieldsOnFocus(addTypeInput, reqType);
        manipulatingRequiredFieldsOnFocus(addPriceInput, reqPrice);
        manipulatingRequiredFieldsOnFocus(addImgUrlInput, reqImgUrl);

        if (
            addTitleInput.value &&
            addTypeInput.value &&
            addPriceInput.value &&
            addImgUrlInput.value
        ) {
            if (!isEditing) {
                const isPublishedLS = JSON.parse(
                    localStorage.getItem('isPublished')
                );

                const newItem = {
                    id: undefined,
                    title: addTitleInput.value,
                    description: addDescInput.value,
                    type: addTypeInput.value,
                    image: addImgUrlInput.value,
                    price: addPriceInput.valueAsNumber,
                    artist: artistLS,
                    dateCreated: new Date().toISOString(),
                    isPublished: isPublishedLS,
                    isAuctioning: false,
                    dateSold: undefined,
                    priceSold: undefined,
                };

                items.push(newItem);

                items.forEach((el, i) => (el.id = i + 1));

                localStorage.setItem('itemsLS', JSON.stringify(items));
            } else {
                isEditing = true;

                const editItemIdLS = JSON.parse(
                    localStorage.getItem('editItemIdLS')
                );

                const isPublishedLS = JSON.parse(
                    localStorage.getItem('isPublished')
                );

                items.forEach((item, idx) => {
                    if (idx + 1 === editItemIdLS) {
                        item.title = addTitleInput.value;
                        item.description = addDescInput.value;
                        item.type = addTypeInput.value;
                        item.image = addImgUrlInput.value;
                        item.price = addPriceInput.valueAsNumber;
                        item.isPublished = isPublishedLS;
                    }
                });

                localStorage.setItem('itemsLS', JSON.stringify(items));

                const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

                if (itemsLS) {
                    artistItemsListing.innerHTML = '';

                    //render the items with the appropriate publish/unpublish button
                    itemsLS.forEach(item => {
                        if (item.isPublished === true)
                            makeArtistListingItems(
                                item.id,
                                item.image,
                                item.title,
                                item.price,
                                item.dateCreated,
                                item.description,
                                'bg-primary-green',
                                'unpublish'
                            );
                        else
                            makeArtistListingItems(
                                item.id,
                                item.image,
                                item.title,
                                item.price,
                                item.dateCreated,
                                item.description,
                                'btn-grey',
                                'publish'
                            );
                    });
                }

                isEditing = false;
            }

            closeNewEditSection();
        }
    });

    //click on cancel button to close the add-new/edit section
    document
        .querySelector('.cancelNewEdit')
        .addEventListener('click', closeNewEditSection);

    //open the dropdown on inputType
    addTypeInput.addEventListener('click', makeDropdownTypeMenu);

    document.addEventListener('click', function (e) {
        //click on arrow-up to close the choose type dropdown
        if (e.target.classList.contains('rotate-arrow')) {
            closeDropdownMenu();
        }

        //click on chooseTypeDropdown to select the option and update the value
        if (e.target.classList.contains('chooseType')) {
            addTypeInput.value = e.target.textContent;
            closeDropdownMenu();
        }
    });
};
