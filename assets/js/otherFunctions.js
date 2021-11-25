const dNone = el => {
    el.style.display = 'none';
};

const dBlock = el => {
    el.style.display = 'block';
};

const addElClass = (el, addClass) => {
    el.classList.add(addClass);
};

const removeElClass = (el, removeClass) => {
    el.classList.remove(removeClass);
};

const toggleElClass = (el, toggleClass) => {
    el.classList.toggle(toggleClass);
};

const manipulateOverlayHeight = section => {
    const overlayHeight = section.offsetHeight;
    bodyOverlay.style.height = `${overlayHeight + 75}px`;
};

const manipulateOverlayDisplay = (element, status, overlay) => {
    element.style.display = status;
    bodyOverlay.style.display = overlay;
};

const addRedBorder = input => {
    input.addEventListener('blur', () => {
        if (input.value < 0) {
            input.style.borderWidth = '2px';
            input.style.borderColor = '#c90f0f';
        } else {
            input.style.borderWidth = '1px';
            input.style.borderColor = '#edd5bb';
        }
    });
};

const openNewEditSection = () => {
    location.hash = '#artists/items/add';

    manipulateOverlayDisplay(addEditSection, 'block', 'block');
    document.body.classList.add('p-fixed');
    bodyOverlay.style.top = 0;
    bodyOverlay.style.height = '100vh';

    if (windowWidth < 870) {
        addEditSection.style.overflowY = 'scroll';
        addEditSection.style.height = '70vh';
        bodyOverlay.style.backgroundColor = 'transparent';
        document.querySelector('.logo').style.zIndex = 20;
        if (windowWidth < 600) {
            addEditSection.style.height = '90vh';
        }
    } else if (windowWidth > 870) {
        addEditSection.style.height = '560px';
    }
};

const manipulatingRequiredFieldsOnFocus = (input, reqField) => {
    if (reqField) input.addEventListener('focus', () => reqField.remove());
};

const editItemOnSubmit = () => {
    const editItemIdLS = JSON.parse(localStorage.getItem('editItemIdLS')),
        isPublishedLS = JSON.parse(localStorage.getItem('isPublished')),
        itemsLS = JSON.parse(localStorage.getItem('itemsLS')),
        //find the item to be edited
        findIdxOfItemsLS = itemsLS.find(el => el.id === editItemIdLS),
        //find the index of item to be edited
        idxOfItemsLS = itemsLS.indexOf(findIdxOfItemsLS);

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
};

const addNewItemOnSubmit = () => {
    const isPublishedLS = JSON.parse(localStorage.getItem('isPublished')),
        artistLS = localStorage.getItem('artist');

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
};

const closeNewEditSection = () => {
    addEditSection.reset();
    localStorage.removeItem('editItemIdLS');

    location.hash = '#artists/items';
    manipulateOverlayDisplay(addEditSection, 'none', 'none');
    removeElClass(imgCheckBox, 'hide');
    document.body.classList.remove('p-fixed');
};

const openFilterSection = () => {
    const filterPartHeight = filterSection.offsetHeight,
        windowHeight = window.innerHeight;

    location.hash = '#visitor/listing/filter';

    filterSection.style.right = 0;
    document.querySelector('.logo').style.zIndex = 14;
    document.body.classList.add('p-fixed');
    manipulateOverlayDisplay(filterIcon, 'none', 'block');
    bodyOverlay.style.top = 0;
    bodyOverlay.style.height = '100vh';

    if (filterPartHeight < windowHeight) {
        filterSection.style.overflowY = 'hidden';
    } else {
        filterSection.style.overflowY = 'scroll';
        if (windowWidth <= 600) {
            filterSection.style.height = `${windowHeight - 50}px`;
            bodyOverlay.style.backgroundColor = 'transparent';
            document.querySelector('.logo').style.zIndex = 20;
        } else filterSection.style.height = `${windowHeight}px`;
    }

    //clear the input fields
    titleInputFilter.value = '';
    artistInputFilter.value = '';
    minPriceInputFilter.value = '';
    maxPriceInputFilter.value = '';
    typeInputFilter.value = '';

    //clear the red border if the user does not enter the positive value, and in the meanwhile open the filter section again
    minPriceInputFilter.style.borderWidth = '1px';
    minPriceInputFilter.style.borderColor = '#edd5bb';
    maxPriceInputFilter.style.borderWidth = '1px';
    maxPriceInputFilter.style.borderColor = '#edd5bb';
};

const closeFilterSection = () => {
    location.hash = '#visitor/listing';

    filterSection.style.right = '-600px';
    filterSection.style.overflowY = 'hidden';
    document.body.classList.remove('p-fixed');
    manipulateOverlayDisplay(filterIcon, 'block', 'none');
};

const removeItem = (itemToRemove, itemToRemoveId) => {
    //click on confirm button to delete the item and also to update(filter) the items array and artist array
    document.querySelector('.confirm-remove').addEventListener('click', () => {
        const removeConfirmation = document.querySelector(
            '.remove-confirmation'
        );

        deleteMsg(removeConfirmation);
        itemToRemove.remove();

        const itemsLS = JSON.parse(localStorage.getItem('itemsLS'));

        //filter the items array
        const filteredItems = itemsLS.filter(
            item => item.id !== itemToRemoveId
        );

        // make  renumeration of the items according to the index, so the new items can get the appropriate id
        filteredItems.forEach((el, i) => (el.id = i + 1));

        localStorage.setItem('itemsLS', JSON.stringify(filteredItems));

        updateArtistItemsArray();
    });
};

const closeDropdownMenu = (section, arrow) => {
    section.innerHTML = '';
    removeElClass(section, 'chooseTypeOpen');
    removeElClass(arrow, 'rotate-arrow');
};

const calcProperTimeFormat = date => {
    if (date) {
        const dateFormat = date.slice(0, 10),
            year = dateFormat.slice(0, 4),
            month = dateFormat.slice(5, 7),
            day = dateFormat.slice(8);

        return `${day}.${month}.${year}`;
    }
};

const manipulateMenuAndOverlayWhenSectionisUnder100vh = (section, menu) => {
    const sectionPageHeight = section.offsetHeight,
        windowHeight = window.innerHeight;

    manipulateOverlayDisplay(menu, 'block', 'block');
    if (sectionPageHeight < windowHeight) bodyOverlay.style.height = '100vh';
    else manipulateOverlayHeight(section);
};

const deleteMsg = msg => {
    msg.classList.remove('msg-show');
    msg.innerHTML = '';
    dNone(bodyOverlay);
};

const updateArtistItemsArray = () => {
    const itemsLS = JSON.parse(localStorage.getItem('itemsLS')),
        artistLS = localStorage.getItem('artist');

    let artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));

    artistItemsLS = itemsLS.filter(item => item.artist === artistLS);

    localStorage.setItem('artistItemsLS', JSON.stringify(artistItemsLS));
};
