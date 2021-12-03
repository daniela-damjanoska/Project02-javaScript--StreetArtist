let carouselIdx = 0;

const changeCarouselSlide = () => {
    if (carouselIdx > slides.length - 1) carouselIdx = 0;
    else if (carouselIdx < 0) carouselIdx = slides.length - 1;

    slides.forEach(
        el =>
            (el.style.transform = `translateX(${-carouselIdx * slideWidth}px)`)
    );
};

const movingCarouselSlides = () => (carouselIdx++, changeCarouselSlide());

const resetCarouselInterval = () => {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(movingCarouselSlides, 5000);
};

//render the carousel content
carouselData.forEach(slide => {
    document.querySelector('.carousel-container').innerHTML += `
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
        </div>
    `;
});

const slides = document.querySelectorAll('.carousel-slide'),
    slideWidth = `${window.innerWidth - 80}`;

let carouselInterval = setInterval(movingCarouselSlides, 5000);

slides.forEach(el => (el.style.width = `${slideWidth}px`));
document.querySelector('.carousel').style.width = `${slideWidth}px`;
document.querySelector('.carousel-buttons').style.width = `${slideWidth}px`;

//click on arrows
document.addEventListener('click', e => {
    if (e.target === e.target.parentElement.children[0]) {
        carouselIdx--;
        changeCarouselSlide();
        resetCarouselInterval();
    }

    if (e.target === e.target.parentElement.children[1]) {
        carouselIdx++;
        changeCarouselSlide();
        resetCarouselInterval();
    }
});
