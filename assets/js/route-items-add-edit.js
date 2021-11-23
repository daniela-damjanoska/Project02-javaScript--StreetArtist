const initArtistAddEditPage = () => {
    const artistLS = localStorage.getItem('artist'),
        isPublishWrapper = document.querySelector('.isPublishWrapper');

    //if the user click on reload -> render tne navbar, the items and open the edit/new section ----------
    createArtistVisitorNavbar(artistLS, 'menu', 'menuIcon');
    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
    dNone(auctionPage);

    //create the items
    artistItemsListing.innerHTML = '';
    createArtistPageAllItems();

    openNewEditSection();
    //-----------------------------------------------------------------------------------------------------

    //manipulating the isPublished checkbox
    isPublishWrapper.addEventListener('click', e => {
        e.stopPropagation();
        toggleElClass(imgCheckBox, 'hide');

        if (imgCheckBox.classList.contains('hide'))
            isPublishWrapper.removeAttribute('data-checked');
        else isPublishWrapper.setAttribute('data-checked', true);

        if (isPublishWrapper.getAttribute('data-checked')) {
            localStorage.setItem('isPublished', true);
        } else {
            localStorage.setItem('isPublished', false);
        }
    });

    //add and remove items when click on 'Add New Item' / 'Add Item' button in the addEditSection
    addEditSection.addEventListener('submit', e => {
        e.preventDefault();

        //check the required input fields, if no value show the required msg
        if (!addTitleInput.value) {
            document.querySelector('.add-title-req').innerHTML = '';
            createRequiredFeedback('reqTitle', '.add-title-req');
        }

        if (!addTypeInput.value) {
            document.querySelector('.add-type').innerHTML = '';
            createRequiredFeedback('reqType', '.add-type');
        }

        if (!addPriceInput.value) {
            document.querySelector('.add-price').innerHTML = '';
            createRequiredFeedback('reqPrice', '.add-price');
        }

        if (!addImgUrlInput.value) {
            document.querySelector('.add-img').innerHTML = '';
            createRequiredFeedback('reqImgUrl', '.add-img');
        }

        const reqTitle = document.querySelector('.reqTitle'),
            reqType = document.querySelector('.reqType'),
            reqPrice = document.querySelector('.reqPrice'),
            reqImgUrl = document.querySelector('.reqImgUrl');

        manipulatingRequiredFieldsOnFocus(addTitleInput, reqTitle);
        manipulatingRequiredFieldsOnFocus(addTypeInput, reqType);
        manipulatingRequiredFieldsOnFocus(addPriceInput, reqPrice);
        manipulatingRequiredFieldsOnFocus(addImgUrlInput, reqImgUrl);

        if (
            addTitleInput.value &&
            addTypeInput.value &&
            addPriceInput.value &&
            addPriceInput.valueAsNumber > 0 &&
            addImgUrlInput.value
        ) {
            if (!isEditing) {
                addNewItemOnSubmit();
            } else {
                isEditing = true;

                editItemOnSubmit();

                //create the items
                artistItemsListing.innerHTML = '';
                createArtistPageAllItems();

                isEditing = false;
            }

            closeNewEditSection();
        }
    });

    //check the value od price (not to be negative)
    addRedBorder(addPriceInput);

    //click on cancel button to close the add-new/edit section
    document
        .querySelector('.cancelNewEdit')
        .addEventListener('click', closeNewEditSection);

    //open the dropdown on inputType
    addTypeInput.addEventListener('click', () => {
        createDropdownChooseType(typeDropDown, changeTypeArrow);
    });

    document.addEventListener('click', function (e) {
        //click on arrow-up to close the choose type dropdown
        if (e.target.classList.contains('rotate-arrow')) {
            closeDropdownMenu(typeDropDown, changeTypeArrow);
        }

        //click on chooseTypeDropdown to select the option and update the value
        if (e.target.classList.contains('chooseType')) {
            addTypeInput.value = e.target.textContent;
            closeDropdownMenu(typeDropDown, changeTypeArrow);
        }
    });
};

function initCaptureImagePage() {
    console.log('Capture image');

    const video = document.querySelector('.make-snapshot-inner video');
    const canvas = document.querySelector('.make-snapshot-inner canvas');
    const img = document.querySelector(' .new');
    const ssBtn = document.querySelector('.take-photo');
    const selectVideos = document.querySelector('#videos');

    ssBtn.addEventListener('click', function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.getContext('2d').drawImage(video, 0, 0);
        const imageURL = canvas.toDataURL('image/webp');
        img.src = imageURL;

        stopStreamedVideo();
        canvas.style.display = 'none';
    });

    function getStream() {
        const source = selectVideos.value;

        const constrains = {
            video: {
                deviceId: source ? { exact: source } : undefined,
            },
        };

        return navigator.mediaDevices.getUserMedia(constrains).then(gotStream);
    }

    function gotStream(stream) {
        // console.log(stream.getVideoTracks()[0].id)
        // selectVideos.selectedIndex = [...selectVideos.options].findIndex(opt => opt)

        video.srcObject = stream;
    }

    function getDevices() {
        return navigator.mediaDevices.enumerateDevices();
    }

    function gotDevices(deviceInfo) {
        const videoDevices = deviceInfo.filter(x => x.kind === 'videoinput');
        console.log(videoDevices);

        for (let i = 0; i < videoDevices.length; i++) {
            const device = videoDevices[i];

            const opt = document.createElement('option');
            opt.value = device.deviceId;
            opt.text = `Camera ${i + 1} ${device.label || device.deviceId}`;
            selectVideos.appendChild(opt);
        }
    }

    function stopStreamedVideo(e) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        video.srcObject = null;
    }

    document
        .querySelector('#stopStream')
        .addEventListener('click', stopStreamedVideo);

    getStream().then(getDevices).then(gotDevices);
}

initCaptureImagePage();
