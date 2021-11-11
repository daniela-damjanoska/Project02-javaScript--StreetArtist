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

const manipulatingRequiredFieldsOnFocus = (input, reqField) => {
    input.addEventListener('focus', () => reqField.remove());
};

const closeDropdownMenu = () => {
    typeDropDown.innerHTML = '';
    removeElClass(typeDropDown, 'chooseTypeOpen');
    removeElClass(changeTypeArrow, 'rotate-arrow');
};

const closeFilterSection = () => {
    location.hash = '#visitor/listing';

    filterSection.style.right = '-600px';
    filterSection.style.overflowY = 'hidden';
    document.body.classList.remove('p-fixed');
    manipulateOverlayDisplay(filterIcon, 'block', 'none');
};

const openNewEditSection = () => {
    location.hash = '#artists/items/add';
    manipulateOverlayDisplay(addEditSection, 'block', 'block');
    manipulateOverlayHeight(artistItemsPage);
    document.body.style.overflowX = 'hidden';
};

const closeNewEditSection = () => {
    addEditSection.reset();
    location.hash = '#artists/items';
    manipulateOverlayDisplay(addEditSection, 'none', 'none');
    removeElClass(imgCheckBox, 'hide');
};

const openFilterSection = () => {
    const filterPartHeight = filterSection.offsetHeight,
        windowHeight = window.innerHeight;

    location.hash = '#visitor/listing/filter';

    filterSection.style.right = 0;
    document.body.classList.add('p-fixed');
    manipulateOverlayDisplay(filterIcon, 'none', 'block');
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
};
