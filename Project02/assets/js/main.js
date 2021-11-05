'use strict';

const windowWidth = window.innerWidth,
    chooseBtnLanding = document.querySelector('#chooseArtistBtn'),
    chooseArtistWrapper = document.querySelector('.chooseArtistWrapper'),
    filterSection = document.querySelector('#filterPart'),
    filterIcon = document.querySelector('#filterIcon'),
    filterOverlay = document.querySelector('.overlay');

makeNavbar('Street ARTist', 'auction');

const filteredPublished = items.filter(item => item.isPublished === true);
filteredPublished.forEach((item, idx) => {
    makeSliderImg(document.querySelector('.slide-track-one'), item.image);
    makeSliderImg(document.querySelector('.slide-track-two'), item.image);

    if (windowWidth <= 768) {
        if (idx % 2 === 0)
            makeVisitorListingPhotos(
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
            makeVisitorListingPhotos(
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
            makeVisitorListingPhotos(
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
            makeVisitorListingPhotos(
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
        if (windowWidth < 600)
            filterSection.style.height = `${windowHeight - 50}px`;
        else filterSection.style.height = `${windowHeight}px`;
    }
});

document.querySelector('#close').addEventListener('click', () => {
    filterSection.style.right = '-600px';
    filterIcon.style.display = 'block';
    filterOverlay.style.display = 'none';
    document.body.classList.remove('p-fixed-0');
});

chooseBtnLanding.addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(res => {
            this.style.opacity = 0;
            chooseArtistWrapper.style.display = 'block';
            chooseArtistWrapper.innerHTML = '';

            res.forEach(user => {
                chooseArtistWrapper.innerHTML += `
                    <span class="chooseArtist" id="${user.id}">${user.name}</span>
                `;
            });
        });
});

document.addEventListener('click', () => {
    chooseArtistWrapper.style.display = 'none';
    chooseBtnLanding.style.opacity = 1;
});
