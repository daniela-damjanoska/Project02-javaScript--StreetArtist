'use strict';

const makeSliderImg = (slideTrack, src) => {
    slideTrack.innerHTML += `<div class="slide">
    <img src="${src}" alt="" />
    </div>`;
};

items.forEach(el => {
    const slideTrackOne = document.querySelector('.slide-track-one'),
        slideTrackTwo = document.querySelector('.slide-track-two');

    makeSliderImg(slideTrackOne, el.image);
    makeSliderImg(slideTrackTwo, el.image);
});
