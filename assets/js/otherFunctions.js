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
    } else {
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

const removeShowAllBtn = () => {
    document.querySelector('.show-all').addEventListener('click', () => {
        const filteredPublishedLS = JSON.parse(
            localStorage.getItem('filteredPublishedLS')
        );

        localStorage.removeItem('filterItemsLS');
        createVisitorPageAllItems(filteredPublishedLS);
        window.scrollTo(0, 0);
    });
};

const updateArtistItemsArray = () => {
    const itemsLS = JSON.parse(localStorage.getItem('itemsLS')),
        artistLS = localStorage.getItem('artist');

    let artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));

    artistItemsLS = itemsLS.filter(item => item.artist === artistLS);

    localStorage.setItem('artistItemsLS', JSON.stringify(artistItemsLS));
};

const datesBetween = (start, end) => {
    const dates = new Array(),
        day = new Date(start);

    while (day <= end) {
        dates.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }
    return dates.reverse();
};

const makeDateToProperFormat = lab => {
    const dateToISOString = lab.map(el => el.toISOString()),
        dateToProperTimeFormat = dateToISOString.map(el =>
            calcProperTimeFormat(el)
        );

    return dateToProperTimeFormat;
};

const findDuplicates = array => {
    const uniqueElements = new Set(array);
    const filteredElements = array.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return [...new Set(filteredElements)];
};

const makeLabel = (arr, num) => {
    arr = [];

    for (let i = 0; i < num; i++) {
        const i = 0;
        arr.push(i);
    }

    localStorage.setItem('chartDataLS', JSON.stringify(arr));
};

const findDuplicatesAndCalcSum = label => {
    //find the dates in the artistItemsLS array in which the artist has sold an item
    let artistArrDateSold = [];

    const artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));
    if (artistItemsLS) {
        for (let i = 0; i < artistItemsLS.length; i++) {
            if (artistItemsLS[i].dateSold !== undefined)
                artistArrDateSold.push(
                    calcProperTimeFormat(artistItemsLS[i].dateSold)
                );
        }
    }

    // find the common date elements in the array with dates of the chart and array with dates on which the artist sold an item
    const concatArrays =
            makeDateToProperFormat(label).concat(artistArrDateSold),
        duplicates = findDuplicates(concatArrays);

    //for each duplicate element find the sum of the items sold
    duplicates.forEach(duplicate => {
        const date = duplicate,
            //filter the  duplicate element of the artistItems array
            priceSold = artistItemsLS.filter(
                itemSold => calcProperTimeFormat(itemSold.dateSold) === date
            ),
            //find the index of the duplicate element in the array of dates in the chart
            elIdx = makeDateToProperFormat(label).indexOf(date),
            chartDataLS = JSON.parse(localStorage.getItem('chartDataLS'));

        //make a sum of the sold items
        let sum = 0;
        priceSold.forEach(el => (sum += el.priceSold));

        //update the labels
        for (let i = 0; i < chartDataLS.length; i++) {
            if (i === elIdx) {
                chartDataLS[elIdx] = sum;
            }
        }

        //store the labels in local storage
        localStorage.setItem('chartDataLS', JSON.stringify(chartDataLS));
    });
};

const makeBid = amount => {
    const url = 'https://blooming-sierra-28258.herokuapp.com/bid',
        data = { amount };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'origin-when-cross-origin',
        body: JSON.stringify(data),
    }).then(res => res.json());
};

// function hello() {
//     const artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));
//     if (artistItemsLS.length <= 1) {
//         artistItemsPage.style.width = '100vw';
//     }
// }
