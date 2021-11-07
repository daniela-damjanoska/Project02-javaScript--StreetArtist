const handleRoute = () => {
    const menuHome = document.querySelector('.menuHome'),
        menuItems = document.querySelector('.menuItems'),
        menuAuction = document.querySelector('.menuAuction'),
        artistLS = localStorage.getItem('artist'),
        totalItems = items.filter(item => item.artist === artistLS),
        filteredPublished = items.filter(item => item.isPublished === true);

    let _hash = location.hash;

    switch (_hash) {
        case '#artists':
            makeArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
            landingPage.style.display = 'none';
            visitorHomePage.style.display = 'none';
            visitorListingPage.style.display = 'none';
            artistHomePage.style.display = 'block';
            artistItemsPage.style.display = 'none';
            auctionPage.style.display = 'none';

            const soldItems = totalItems.filter(
                itemSold => itemSold.priceSold !== 0
            );

            let sum = 0;
            soldItems.forEach(itemPrice => (sum += itemPrice.priceSold));

            document.querySelector('#totalItems').textContent =
                totalItems.length;
            document.querySelector('#soldItems').textContent = soldItems.length;
            document.querySelector('#totalIncome').textContent = `$${sum}`;

            document.querySelector('.menuHome').classList.add('active');

            menuHome.classList.add('active');
            menuItems.classList.remove('active');
            menuAuction.classList.remove('active');
            break;

        case '#artists/items':
            makeArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
            landingPage.style.display = 'none';
            visitorHomePage.style.display = 'none';
            visitorListingPage.style.display = 'none';
            artistHomePage.style.display = 'none';
            artistItemsPage.style.display = 'block';
            auctionPage.style.display = 'none';

            artistItemsListing.innerHTML = '';

            totalItems.forEach(item =>
                makeArtistListingItems(
                    item.id,
                    item.image,
                    item.title,
                    item.price,
                    item.dateCreated,
                    item.description
                )
            );

            menuHome.classList.remove('active');
            menuItems.classList.add('active');
            menuAuction.classList.remove('active');
            break;

        case '#visitor':
            makeArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
            landingPage.style.display = 'none';
            visitorHomePage.style.display = 'block';
            visitorListingPage.style.display = 'none';
            artistHomePage.style.display = 'none';
            artistItemsPage.style.display = 'none';
            auctionPage.style.display = 'none';

            filteredPublished.forEach(item => {
                makeSliderImg(
                    document.querySelector('.slide-track-one'),
                    item.image
                );
                makeSliderImg(
                    document.querySelector('.slide-track-two'),
                    item.image
                );
            });
            break;

        case '#visitor/listing':
            makeArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
            landingPage.style.display = 'none';
            visitorHomePage.style.display = 'none';
            visitorListingPage.style.display = 'block';
            artistHomePage.style.display = 'none';
            artistItemsPage.style.display = 'none';
            auctionPage.style.display = 'none';

            visitorListingPageInner.innerHTML = '';

            filteredPublished.forEach((item, idx) => {
                if (windowWidth <= 768) {
                    if (idx % 2 === 0)
                        makeVisitorListingItems(
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
                        makeVisitorListingItems(
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
                        makeVisitorListingItems(
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
                        makeVisitorListingItems(
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

            break;

        case '#visitor/listing/filter':
            break;

        case '#auction':
            makeArtistVisitorNavbar('Street ARTist', 'auction', 'auctionIcon');
            landingPage.style.display = 'none';
            visitorHomePage.style.display = 'none';
            visitorListingPage.style.display = 'none';
            artistHomePage.style.display = 'none';
            artistItemsPage.style.display = 'none';
            auctionPage.style.display = 'block';

            if (artistLS) {
                makeArtistVisitorNavbar('Street ARTist', 'menu', 'menuIcon');
                menuHome.classList.remove('active');
                menuItems.classList.remove('active');
                menuAuction.classList.add('active');
            } else
                makeArtistVisitorNavbar(
                    'Street ARTist',
                    'auction',
                    'auctionIcon'
                );
            break;

        default:
            location.hash = '';
            makeLandingPageNav();
            landingPage.style.display = 'block';
            visitorHomePage.style.display = 'none';
            visitorListingPage.style.display = 'none';
            artistHomePage.style.display = 'none';
            artistItemsPage.style.display = 'none';
            auctionPage.style.display = 'none';

            if (artistLS) localStorage.removeItem('artist');
            break;
    }
};
