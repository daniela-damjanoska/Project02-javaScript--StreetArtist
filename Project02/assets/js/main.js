'use strict';

makeNavbar('Street ARTist', 'auction');

//--------------------------imgSlider-------------------------------
items.forEach(el => {
    makeSliderImg(document.querySelector('.slide-track-one'), el.image);
    makeSliderImg(document.querySelector('.slide-track-two'), el.image);
});
