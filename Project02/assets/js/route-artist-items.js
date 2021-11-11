const initArtistItemsPage = () => {
    const artistLS = localStorage.getItem('artist'),
        totalItems = items.filter(item => item.artist === artistLS);

    makeArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
    dNone(auctionPage);

    removeElClass(menuHome, 'active');
    addElClass(menuItems, 'active');
    removeElClass(menuAuction, 'active');
    manipulateOverlayDisplay(addEditSection, 'none', 'none');

    artistItemsListing.innerHTML = '';

    //render the items with the appropriate publish/unpublish button and send/not sent to auction button
    totalItems.forEach(item => {
        //render the items with the appropriate publish/unpublish button
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

    //set the default isPublished checked
    removeElClass(imgCheckBox, 'hide');
    localStorage.setItem('isPublished', true);

    //remove the required messages on add-edit section after clicking cancel
    const requiredWrappers = document.querySelectorAll('.req');
    requiredWrappers.forEach(el => (el.innerHTML = ''));

    //click on add-new-item to open the add-new/edit section
    document
        .querySelector('.add-items')
        .addEventListener('click', openNewEditSection);

    document.addEventListener('click', e => {
        const removeConfirmation = document.querySelector(
            '.remove-confirmation'
        );

        //clicking on publish/unpublish buttons to change color/text content/update array
        if (e.target.classList.contains('publishing')) {
            toggleElClass(e.target, 'btn-grey');
            toggleElClass(e.target, 'bg-primary-green');

            if (e.target.textContent === 'publish') {
                const BtnToChangePublishId =
                    +e.target.parentElement.parentElement.id;

                e.target.textContent = 'unpublish';
                items.forEach((item, idx) => {
                    if (idx + 1 === BtnToChangePublishId) {
                        item.isPublished = true;
                    }
                });
            } else if (e.target.textContent === 'unpublish') {
                const BtnToChangeUnpublishId =
                    +e.target.parentElement.parentElement.id;

                e.target.textContent = 'publish';
                items.forEach((item, idx) => {
                    if (idx + 1 === BtnToChangeUnpublishId) {
                        item.isPublished = false;
                    }
                });
            }

            localStorage.setItem('itemsLS', JSON.stringify(items));
        }

        //click on remove button to open the confirmation popup
        if (e.target.classList.contains('remove')) {
            const itemToRemove = e.target.parentElement.parentElement;

            manipulateOverlayDisplay(removeConfirmation, 'block', 'block');
            manipulateOverlayHeight(artistItemsPage);
            bodyOverlay.style.background = '#58474799';
            document.querySelector('.logo').style.zIndex = 1;

            localStorage.setItem('itemToRemove', itemToRemove.id);

            //click on confirm button to delete the item and also to update(filter) the items array
            document
                .querySelector('.confirm-remove')
                .addEventListener('click', () => {
                    itemToRemove.remove();

                    const itemToRemoveId = localStorage.getItem('itemToRemove');

                    const filteredArrayWithItems = items.filter(
                        item => item.id !== +itemToRemoveId
                    );

                    filteredArrayWithItems.forEach((el, i) => (el.id = i + 1));

                    localStorage.setItem(
                        'itemsLS',
                        JSON.stringify(filteredArrayWithItems)
                    );

                    manipulateOverlayDisplay(
                        removeConfirmation,
                        'none',
                        'none'
                    );
                });
        }

        //click on cancel button to cancel the item deletion
        if (e.target.classList.contains('cancel-remove')) {
            manipulateOverlayDisplay(removeConfirmation, 'none', 'none');
        }

        //edit functionality
        if (e.target.classList.contains('edit-item')) {
            isEditing = true;

            openNewEditSection();

            //change the button textContent
            document.querySelector('.add-edit-btn').textContent = 'Add Item';

            const itemToEditId = +e.target.parentElement.parentElement.id;

            const itemToEdit = items.find(item => item.id === itemToEditId);

            localStorage.setItem('editItemIdLS', itemToEditId);

            if (itemToEdit.isPublished === true) {
                removeElClass(imgCheckBox, 'hide');
            } else {
                addElClass(imgCheckBox, 'hide');
                localStorage.setItem('isPublished', false);
            }

            addTitleInput.value = itemToEdit.title;
            addDescInput.value = itemToEdit.description;
            addTypeInput.value = itemToEdit.type;
            addPriceInput.value = itemToEdit.price;
            addImgUrlInput.value = itemToEdit.image;
        }
    });
};
