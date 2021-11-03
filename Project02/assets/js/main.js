'use strict';

makeNavbar('Street ARTist', 'auction');

items.forEach((el, idx) => {
    makeSliderImg(document.querySelector('.slide-track-one'), el.image);
    makeSliderImg(document.querySelector('.slide-track-two'), el.image);

    if (window.innerWidth <= 768) {
        if (idx % 2 === 0)
            makeVisitorListingPhotos(
                el.image,
                el.artist,
                el.price,
                el.title,
                el.description,
                'bg-light c-text-primary-default',
                'c-text-normal bg-primary-default'
            );
        else
            makeVisitorListingPhotos(
                el.image,
                el.artist,
                el.price,
                el.title,
                el.description,
                'bg-primary-default c-text-normal',
                'c-text-primary-default bg-light'
            );
    } else {
        if (idx === 0 || (idx + 1) % 4 === 0 || (idx + 1) % 4 === 1)
            makeVisitorListingPhotos(
                el.image,
                el.artist,
                el.price,
                el.title,
                el.description,
                'bg-light c-text-primary-default',
                'c-text-normal bg-primary-default'
            );
        else
            makeVisitorListingPhotos(
                el.image,
                el.artist,
                el.price,
                el.title,
                el.description,
                'bg-primary-default c-text-normal',
                'c-text-primary-default bg-light'
            );
    }
});
