const initLandingPage = () => {
    localStorage.setItem('itemsLS', JSON.stringify(items));
    const arrowDropdown = document.querySelector('.chooseArtistDropDown'),
        auctioningTrue = localStorage.getItem('auction');

    location.hash = '';
    createLandingPageNav();
    dBlock(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dNone(artistItemsPage);
    dNone(auctionPage);

    if (!auctioningTrue) {
        localStorage.removeItem('artistItemsLS');
    }

    localStorage.removeItem('chartDataLS');

    // click on choose button on landing-page to open the list of artist (from API)
    chooseBtnLanding.addEventListener('click', function () {
        chooseArtistWrapper.innerHTML = '';
        createDropdownChooseArtist(chooseArtistWrapper, 'chooseArtist');
        dBlock(chooseArtistWrapper);
        addElClass(arrowDropdown, 'rotate-arrow');
    });

    //close the dropdown if no artist is chosen
    arrowDropdown.addEventListener('click', e => {
        e.stopPropagation();
        dNone(chooseArtistWrapper);
        e.currentTarget.classList.remove('rotate-arrow');
        chooseArtistWrapper.innerHTML = '';
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
            removeElClass(arrowDropdown, 'rotate-arrow');
        }
    });
};
