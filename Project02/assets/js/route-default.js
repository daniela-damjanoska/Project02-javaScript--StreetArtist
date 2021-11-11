const initLandingPage = () => {
    const arrowDropdown = document.querySelector('.chooseArtistDropDown');

    location.hash = '';
    makeLandingPageNav();
    dBlock(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    //on landing page no artist in local storage, this should be like log in/log out for the artists
    if (artistLS) localStorage.removeItem('artist');

    // click on choose button on landing-page to open the list of artist (from API)
    chooseBtnLanding.addEventListener('click', function () {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                //open the dropdown
                dBlock(chooseArtistWrapper);
                arrowDropdown.classList.add('rotate-arrow');
                chooseArtistWrapper.innerHTML = '';

                res.forEach(user => {
                    chooseArtistWrapper.innerHTML += `
                                <span class="chooseArtist" id="${user.id}">${user.name}</span>`;
                });
            });
    });

    //close the dropdown if no artist is chosen
    arrowDropdown.addEventListener('click', e => {
        e.stopPropagation();
        dNone(chooseArtistWrapper);
        e.currentTarget.classList.remove('rotate-arrow');
    });

    //click on 'Join as visitor' div to open visitor-home-page
    visitorBtnLanding.addEventListener('click', () => {
        location.hash = '#visitor';
    });

    document.addEventListener('click', e => {
        //click on chose artist options to go to the appropriate artist homepage
        if (e.target.classList.contains('chooseArtist')) {
            location.hash = '#artists';
            localStorage.setItem('artist', e.target.textContent);
            dNone(chooseArtistWrapper);
            arrowDropdown.classList.remove('rotate-arrow');
        }
    });
};
