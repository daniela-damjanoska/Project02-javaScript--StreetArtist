'use strict';

const filterSection = document.querySelector('#filterPart'),
    filterIcon = document.querySelector('#filterIcon'),
    filterOverlay = document.querySelector('.overlay');

makeNavbar('Street ARTist', 'auction');

items.forEach(el => {
    makeSliderImg(document.querySelector('.slide-track-one'), el.image);
    makeSliderImg(document.querySelector('.slide-track-two'), el.image);
});

const filteredPublished = items.filter(item => item.isPublished === true);
filteredPublished.forEach((item, idx) => {
    if (window.innerWidth <= 768) {
        if (idx % 2 === 0)
            makeVisitorListingPhotos(
                item.image,
                item.artist,
                item.price,
                item.title,
                item.description,
                'bg-light c-text-primary-default',
                'c-text-normal bg-primary-default'
            );
        else
            makeVisitorListingPhotos(
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
            makeVisitorListingPhotos(
                item.image,
                item.artist,
                item.price,
                item.title,
                item.description,
                'bg-light c-text-primary-default',
                'c-text-normal bg-primary-default'
            );
        else
            makeVisitorListingPhotos(
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

filterIcon.addEventListener('click', function () {
    const filterPartHeight = filterSection.offsetHeight,
        windowHeight = window.innerHeight;

    filterSection.style.right = 0;
    this.style.display = 'none';
    filterOverlay.style.display = 'block';
    document.body.classList.add('p-fixed-0');

    if (filterPartHeight < windowHeight) {
        filterSection.style.overflowY = 'hidden';
    } else {
        filterSection.style.overflowY = 'scroll';
        filterSection.style.height = `${windowHeight}px`;
    }
});

document.querySelector('#close').addEventListener('click', () => {
    filterSection.style.right = '-600px';
    filterIcon.style.display = 'block';
    filterOverlay.style.display = 'none';
    document.body.classList.remove('p-fixed-0');
});
