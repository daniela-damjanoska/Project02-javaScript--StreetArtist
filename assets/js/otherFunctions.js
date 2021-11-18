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

    if (windowWidth < 769) {
        addEditSection.style.overflowY = 'scroll';
        addEditSection.style.height = '94vh';
        bodyOverlay.style.backgroundColor = 'transparent';
        document.querySelector('.logo').style.zIndex = 20;
        if (windowWidth < 601) {
            addEditSection.style.height = '93vh';
        }
    } else {
        addEditSection.style.height = '560px';
    }
};

const manipulatingRequiredFieldsOnFocus = (input, reqField) => {
    if (reqField) input.addEventListener('focus', () => reqField.remove());
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
    document.querySelector('.logo').style.zIndex = 20;
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

const closeDropdownMenu = (section, arrow) => {
    section.innerHTML = '';
    removeElClass(section, 'chooseTypeOpen');
    removeElClass(arrow, 'rotate-arrow');
};

const calcProperTimeFormat = date => {
    const dateFormat = date.slice(0, 10),
        year = dateFormat.slice(0, 4),
        month = dateFormat.slice(5, 7),
        day = dateFormat.slice(8);

    return `${day}.${month}.${year}`;
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

function findDuplicates(array) {
    const uniqueElements = new Set(array);
    const filteredElements = array.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return [...new Set(filteredElements)];
}

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

const makeDateToProperFormat = lab => {
    const dateToISOString = lab.map(el => el.toISOString()),
        dateToProperTimeFormat = dateToISOString.map(el =>
            calcProperTimeFormat(el)
        );

    return dateToProperTimeFormat;
};

function updateChart(data, num, label) {
    makeLabel(data, num);
    findDuplicatesAndCalcSum(label);
    const chartDataLS = JSON.parse(localStorage.getItem('chartDataLS'));
    artistInfoChart.data.datasets[0].data = chartDataLS;

    artistInfoChart.data.labels = makeDateToProperFormat(label);
    artistInfoChart.update();
}
