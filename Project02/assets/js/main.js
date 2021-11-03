'use strict';

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
