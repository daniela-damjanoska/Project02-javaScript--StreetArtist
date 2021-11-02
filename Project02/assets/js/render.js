const makeNavbar = (person, icon) => {
    document.querySelector('nav').innerHTML = `
        <div class="navbar-visitor-artist">
            <span class="navbar-brand">
                <img class="logo bg-light p-absolute" src="./img/Logo.png" alt="logo"/>
            </span>
            <div class="navbar-wrapper row">
                <span class="c-text-primary-default"><b>${person}</b></span>
                <span class="navbar-icon">
                        <img src="./img/${icon}.svg" alt="${icon}-icon"/>
                </span>
            </div>
        </div>
    `;
};

const makeSliderImg = (slideTrack, src) => {
    slideTrack.innerHTML += `<div class="slide">
    <img src="${src}" alt="" />
    </div>`;
};
