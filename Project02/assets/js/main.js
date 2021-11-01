'use strict';

const carousel = document.querySelector('.carousel'),
    carouselContainer = document.querySelector('.carousel-container');

let carouselIdx = 0;

const makeSliderImg = (slideTrack, src) => {
    slideTrack.innerHTML += `<div class="slide">
    <img src="${src}" alt="" />
    </div>`;
};

const movingCarouselSlides = () => (carouselIdx++, changeCarouselSlide());

const changeCarouselSlide = () => {
    if (carouselIdx > slides.length - 1) carouselIdx = 0;
    else if (carouselIdx < 0) carouselIdx = slides.length - 1;

    slides.forEach(
        el =>
            (el.style.transform = `translateX(${-carouselIdx * slideWidth}px)`)
    );
};

const resetCarouselInterval = () => {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(movingCarouselSlides, 5000);
};

//--------------------------imgSlider-------------------------------

items.forEach(el => {
    const slideTrackOne = document.querySelector('.slide-track-one'),
        slideTrackTwo = document.querySelector('.slide-track-two');

    makeSliderImg(slideTrackOne, el.image);
    makeSliderImg(slideTrackTwo, el.image);
});

//--------------------------Carousel-------------------------------

carouselData.forEach(slide => {
    carouselContainer.innerHTML += `
        <div class="carousel-slide row">
            <div class="left-part col-50 row">
                <div class="content-box text-center p-relative">
                    <div class="img-circle p-absolute">
                        <img src=${slide.src} alt="carouselSlide" />
                    </div>
                    <p class="mb-0">${slide.descOne}</p>
                </div>
            </div>
            <div class="right-part col-50 row">
                <div class="content-box text-center">
                    <p class="mb-0 c-text-primary-default">${slide.descTwo}</p>
                </div>
            </div>
        </div>`;
});

const carouselBtnContainer = document.querySelector('.carousel-buttons'),
    slides = document.querySelectorAll('.carousel-slide'),
    slideWidth = `${window.innerWidth - 80}`;

let carouselInterval = setInterval(movingCarouselSlides, 5000);

slides.forEach(el => (el.style.width = `${slideWidth}px`));
carousel.style.width = `${slideWidth}px`;
carouselBtnContainer.style.width = `${slideWidth}px`;

document.addEventListener('click', e => {
    const leftArrow = e.target.parentElement.children[0],
        rightArrow = e.target.parentElement.children[1];
    if (e.target === leftArrow) {
        carouselIdx--;
        changeCarouselSlide();
        resetCarouselInterval();
    }

    if (e.target === rightArrow) {
        carouselIdx++;
        changeCarouselSlide();
        resetCarouselInterval();
    }
});
