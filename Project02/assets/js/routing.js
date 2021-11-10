const handleRoute = () => {
    const menuHome = document.querySelector('.menuHome'),
        menuItems = document.querySelector('.menuItems'),
        menuAuction = document.querySelector('.menuAuction'),
        addTitleInput = document.querySelector('#addTitle'),
        addDescInput = document.querySelector('#itemDesc'),
        addTypeInput = document.querySelector('#itemType'),
        addPriceInput = document.querySelector('#itemPrice'),
        addImgUrlInput = document.querySelector('#imageUrl'),
        imgCheckBox = document.querySelector('img.checked'),
        artistLS = localStorage.getItem('artist'),
        //filter by artist and publish/unpublish
        totalItems = items.filter(item => item.artist === artistLS),
        filteredPublished = items.filter(item => item.isPublished === true);

    let _hash = location.hash;

    switch (_hash) {
        case '#artists':
            makeArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
            dNone(landingPage);
            dNone(visitorHomePage);
            dNone(visitorListingPage);
            dBlock(artistHomePage);
            dNone(artistItemsPage);
            dNone(auctionPage);

            addElClass(menuHome, 'active');
            removeElClass(menuItems, 'active');
            removeElClass(menuAuction, 'active');

            const soldItems = totalItems.filter(
                itemSold => itemSold.priceSold !== 0
            );

            let sum = 0;
            for (let i = 0; i < soldItems.length; i++) {
                if (!soldItems[i].priceSold) continue;
                sum += soldItems[i].priceSold;
            }

            //updating the data for the artist sold items and income
            document.querySelector('#totalItems').textContent =
                totalItems.length;
            document.querySelector('#soldItems').textContent = soldItems.length;
            document.querySelector('#totalIncome').textContent = `$${sum}`;
            break;

        case '#artists/items':
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

            //render the items with the appropriate publish/unpublish button
            totalItems.forEach(item => {
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

            //set the default isPublished checked
            removeElClass(imgCheckBox, 'hide');
            localStorage.setItem('isPublished', true);

            //remove the required messages on add-edit section after clicking cancel
            const requiredWrappers = document.querySelectorAll('.req');
            requiredWrappers.forEach(el => (el.innerHTML = ''));

            //click on add-new-item to open the add-new/edit section
            document
                .querySelector('.add-items')
                .addEventListener('click', function () {
                    location.hash = '#artists/items/add';
                    manipulateOverlayDisplay(addEditSection, 'block', 'block');
                    manipulateOverlayHeight(artistItemsPage);
                    document.body.style.overflowX = 'hidden';
                });

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

                    manipulateOverlayDisplay(
                        removeConfirmation,
                        'block',
                        'block'
                    );
                    manipulateOverlayHeight(artistItemsPage);

                    localStorage.setItem('itemToRemove', itemToRemove.id);

                    //click on confirm button to delete the item and also to update(filter) the items array
                    document
                        .querySelector('.confirm-remove')
                        .addEventListener('click', () => {
                            itemToRemove.remove();

                            const itemToRemoveId =
                                localStorage.getItem('itemToRemove');

                            const filteredArrayWithItems = items.filter(
                                item => item.id !== +itemToRemoveId
                            );

                            filteredArrayWithItems.forEach(
                                (el, i) => (el.id = i + 1)
                            );

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
                    manipulateOverlayDisplay(
                        removeConfirmation,
                        'none',
                        'none'
                    );
                }
            });
            break;

        case '#artists/items/add':
            const isPublishWrapper =
                document.querySelector('.isPublishWrapper');

            //manipulating the isPublished checkbox
            isPublishWrapper.addEventListener('click', e => {
                e.stopPropagation();
                toggleElClass(imgCheckBox, 'hide');

                if (imgCheckBox.classList.contains('hide'))
                    isPublishWrapper.setAttribute('data-checked');
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
                            price: addPriceInput.value,
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

                        addEditSection.reset();
                        location.hash = '#artists/items';
                        manipulateOverlayDisplay(
                            addEditSection,
                            'none',
                            'none'
                        );
                    }
                }
            });

            //click on cancel button to close the add-new/edit section
            document
                .querySelector('.cancelNewEdit')
                .addEventListener('click', () => {
                    location.hash = '#artists/items';
                    manipulateOverlayDisplay(addEditSection, 'none', 'none');
                    addEditSection.reset();
                    removeElClass(imgCheckBox, 'hide');
                });

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
            break;

        case '#visitor':
            makeArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
            dNone(landingPage);
            dBlock(visitorHomePage);
            dNone(visitorListingPage);
            dNone(artistHomePage);
            dNone(artistItemsPage);
            dNone(auctionPage);

            filteredPublished.forEach(item => {
                makeSliderImg(
                    document.querySelector('.slide-track-one'),
                    item.image
                );
                makeSliderImg(
                    document.querySelector('.slide-track-two'),
                    item.image
                );
            });
            break;

        case '#visitor/listing':
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
            break;

        case '#visitor/listing/filter':
            break;

        case '#auction':
            //render appropriate navbar for artist or visitor
            if (artistLS) {
                makeArtistVisitorNavbar('Street ARTist', 'menu', 'menuIcon');
                removeElClass(menuHome, 'active');
                removeElClass(menuItems, 'active');
                addElClass(menuAuction, 'active');
            }
            //this icon should be changed with back icon ???????????????????
            else
                makeArtistVisitorNavbar(
                    'Street ARTist',
                    'auction',
                    'auctionIcon'
                );

            dNone(landingPage);
            dNone(visitorHomePage);
            dNone(visitorListingPage);
            dNone(artistHomePage);
            dNone(artistItemsPage);
            dBlock(auctionPage);
            break;

        default:
            location.hash = '';
            makeLandingPageNav();
            dBlock(landingPage);
            dNone(visitorHomePage);
            dNone(visitorListingPage);
            dNone(artistHomePage);
            dNone(artistItemsPage);
            dNone(auctionPage);

            // click on choose button on landing-page to open the list of artist (from API)
            chooseBtnLanding.addEventListener('click', function () {
                fetch('https://jsonplaceholder.typicode.com/users')
                    .then(res => res.json())
                    .then(res => {
                        this.style.opacity = 0;
                        dBlock(chooseArtistWrapper);
                        chooseArtistWrapper.innerHTML = '';

                        res.forEach(user => {
                            chooseArtistWrapper.innerHTML += `
                                <span class="chooseArtist" id="${user.id}">${user.name}</span>`;
                        });
                    });
            });

            if (artistLS) localStorage.removeItem('artist');
            break;
    }
};
