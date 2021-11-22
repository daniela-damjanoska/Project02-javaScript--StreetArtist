const initArtistItemsPage = () => {
    const artistLS = localStorage.getItem('artist');

    createArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
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

    //create the items
    artistItemsListing.innerHTML = '';
    createArtistPageAllItems();

    //if there is only one item or no items -> the width of the section to be 100vw when addNew/Edit section is open
    const artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));
    if (artistItemsLS.length <= 1) {
        artistItemsPage.style.width = '100vw';
    }

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
        // click on menu icon to open the artist menu
        if (e.target.classList.contains('menuIcon'))
            manipulateMenuAndOverlayWhenSectionisUnder100vh(
                artistItemsPage,
                menuArtist
            );

        //click on publish/unpublish buttons to change their color/text content and update arrays
        if (e.target.classList.contains('publishing')) {
            e.stopPropagation();
            toggleElClass(e.target, 'btn-grey');
            toggleElClass(e.target, 'bg-primary-green');

            if (e.target.textContent === 'publish') {
                const BtnToChangePublishId =
                    +e.target.parentElement.parentElement.id;

                const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

                e.target.textContent = 'unpublish';
                itemsLS.forEach((item, idx) => {
                    if (idx + 1 === BtnToChangePublishId) {
                        item.isPublished = true;
                    }
                });

                localStorage.setItem('itemsLS', JSON.stringify(itemsLS));

                updateArtistItemsArray();
            } else if (e.target.textContent === 'unpublish') {
                const BtnToChangeUnpublishId =
                    +e.target.parentElement.parentElement.id;

                const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

                e.target.textContent = 'publish';
                itemsLS.forEach((item, idx) => {
                    if (idx + 1 === BtnToChangeUnpublishId) {
                        item.isPublished = false;
                    }
                });

                localStorage.setItem('itemsLS', JSON.stringify(itemsLS));

                updateArtistItemsArray();
            }
        }

        //click on remove button to open the confirmation popup
        if (e.target.classList.contains('remove')) {
            const itemToRemove = e.target.parentElement.parentElement;
            const itemToRemoveId = +itemToRemove.id;

            createRemoveMsg();

            //click on confirm button to delete the item and also to update(filter) the items array and artist array
            removeItem(itemToRemove, itemToRemoveId);
        }

        //click on cancel button to cancel the item deletion
        if (e.target.classList.contains('cancel-remove')) {
            const removeConfirmation = document.querySelector(
                '.remove-confirmation'
            );
            deleteMsg(removeConfirmation);
        }

        //edit functionality when 'edit' button is clicked by the artist - take the values from the appropriate item from the Artist Items Array
        if (e.target.classList.contains('edit-item')) {
            isEditing = true;

            openNewEditSection();

            //change the button textContent
            document.querySelector('.add-edit-btn').textContent = 'Add Item';

            //find the item to be edited ID and save it to local storage
            const itemToEditId = +e.target.parentElement.parentElement.id;
            localStorage.setItem('editItemIdLS', itemToEditId);

            //find the item to be edited in the artist items array in order to take the values to be edited
            const artistItemsLS = JSON.parse(
                localStorage.getItem('artistItemsLS')
            );

            const itemToEdit = artistItemsLS.find(
                item => item.id === itemToEditId
            );

            //update the checkbox when the edit section is open according to the isPublished property
            if (itemToEdit.isPublished === true) {
                removeElClass(imgCheckBox, 'hide');
            } else {
                addElClass(imgCheckBox, 'hide');
                localStorage.setItem('isPublished', false);
            }

            //take the values for the inputs according to the appropriate properties
            addTitleInput.value = itemToEdit.title;
            addDescInput.value = itemToEdit.description;
            addTypeInput.value = itemToEdit.type;
            addPriceInput.value = itemToEdit.price;
            addImgUrlInput.value = itemToEdit.image;
        }

        //click on sent to auction button to send the item for auctioning
        const auctioningTrue = localStorage.getItem('auction');

        if (e.target.classList.contains('sold-no') && !auctioningTrue) {
            e.stopPropagation();

            //get the id of the item, create starting time and ending time(start counting from 2 min -> 120000ms)
            const itemForAuctionId = +e.target.parentElement.parentElement.id,
                startTime = new Date().getTime(),
                endTime = startTime + 120000;

            //find the item in itemsLS array and set item isAuctioning property to true
            const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

            itemsLS.forEach((item, idx) => {
                if (idx + 1 === itemForAuctionId) item.isAuctioning = true;
            });

            localStorage.setItem('itemsLS', JSON.stringify(itemsLS));

            updateArtistItemsArray();

            //save the id, the state of auction(true), endTime and startTime
            localStorage.setItem('itemForAuctionId', itemForAuctionId);
            localStorage.setItem('auction', true);
            localStorage.setItem('startTime', startTime);
            localStorage.setItem('endTime', endTime);
            localStorage.setItem('bidding', true);

            if (!auctioningTrue) {
                localStorage.removeItem('currentBidLS');
            }

            location.hash = '#auction';
        }

        //on click on sent to auction button when auction is in progress show the rejecting message
        if (e.target.classList.contains('sold-no') && auctioningTrue) {
            e.stopPropagation();
            createAuctionMsg();
        }

        //delete the rejecting message
        if (e.target.classList.contains('confirm')) {
            deleteMsg(auctionMsg);
        }
    });
};
