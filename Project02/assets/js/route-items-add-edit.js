const initArtistAddEditPage = () => {
    const artistLS = localStorage.getItem('artist');
    const isPublishWrapper = document.querySelector('.isPublishWrapper');

    //if the user click on reload -> render tne navbar, the items and open the edit/new section ----------
    createArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
    dNone(auctionPage);

    //create the items
    artistItemsListing.innerHTML = '';
    createArtistPageAllItems();

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

        //check the required input fields, if no value show the required msg
        if (!addTitleInput.value) {
            document.querySelector('.add-title-req').innerHTML = '';
            createRequiredFeedback('reqTitle', '.add-title-req');
        }

        if (!addTypeInput.value) {
            document.querySelector('.add-type').innerHTML = '';
            createRequiredFeedback('reqType', '.add-type');
        }

        if (!addPriceInput.value) {
            document.querySelector('.add-price').innerHTML = '';
            createRequiredFeedback('reqPrice', '.add-price');
        }

        if (!addImgUrlInput.value) {
            document.querySelector('.add-img').innerHTML = '';
            createRequiredFeedback('reqImgUrl', '.add-img');
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
            addPriceInput.valueAsNumber > 0 &&
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

                const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

                itemsLS.push(newItem);

                // make  a renumeration of the items according to the index, so the new item can get the appropriate id
                itemsLS.forEach((el, i) => (el.id = i + 1));

                localStorage.setItem('itemsLS', JSON.stringify(itemsLS));

                updateArtistItemsArray();
            } else {
                isEditing = true;

                const editItemIdLS = JSON.parse(
                    localStorage.getItem('editItemIdLS')
                );

                const isPublishedLS = JSON.parse(
                    localStorage.getItem('isPublished')
                );

                const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

                //find the item to be edited
                const findIdxOfItemsLS = itemsLS.find(
                    el => el.id === editItemIdLS
                );

                //find the index of item to be edited
                const idxOfItemsLS = itemsLS.indexOf(findIdxOfItemsLS);

                //update the item according to the new values from the input fields
                itemsLS.forEach((item, idx) => {
                    if (idx === idxOfItemsLS) {
                        item.title = addTitleInput.value;
                        item.description = addDescInput.value;
                        item.type = addTypeInput.value;
                        item.image = addImgUrlInput.value;
                        item.price = addPriceInput.valueAsNumber;
                        item.isPublished = isPublishedLS;
                    }
                });

                localStorage.setItem('itemsLS', JSON.stringify(itemsLS));

                updateArtistItemsArray();

                //create the items
                artistItemsListing.innerHTML = '';
                createArtistPageAllItems();

                isEditing = false;
            }

            closeNewEditSection();
        }
    });

    //check the value od price (not to be negative)
    addRedBorder(addPriceInput);

    //click on cancel button to close the add-new/edit section
    document
        .querySelector('.cancelNewEdit')
        .addEventListener('click', closeNewEditSection);

    //open the dropdown on inputType
    addTypeInput.addEventListener('click', () => {
        createDropdownChooseType(typeDropDown, changeTypeArrow);
    });

    document.addEventListener('click', function (e) {
        //click on arrow-up to close the choose type dropdown
        if (e.target.classList.contains('rotate-arrow')) {
            closeDropdownMenu(typeDropDown, changeTypeArrow);
        }

        //click on chooseTypeDropdown to select the option and update the value
        if (e.target.classList.contains('chooseType')) {
            addTypeInput.value = e.target.textContent;
            closeDropdownMenu(typeDropDown, changeTypeArrow);
        }
    });
};
