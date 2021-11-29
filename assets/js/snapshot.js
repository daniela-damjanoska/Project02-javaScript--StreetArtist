const videoBox = document.querySelector('.make-snapshot-inner video'),
    selectVideos = document.querySelector('#videos');

const getStream = () => {
    const source = selectVideos.value,
        constrains = {
            video: {
                deviceId: source ? { exact: source } : undefined,
            },
        };

    return navigator.mediaDevices.getUserMedia(constrains).then(gotStream);
};

const gotStream = stream => {
    videoBox.srcObject = stream;
};

const getDevices = () => {
    return navigator.mediaDevices.enumerateDevices();
};

const gotDevices = deviceInfo => {
    const videoDevices = deviceInfo.filter(x => x.kind === 'videoinput');

    for (let i = 0; i < videoDevices.length; i++) {
        const device = videoDevices[i],
            option = document.createElement('option');

        option.value = device.deviceId;
        option.text = `Camera ${i + 1} ${device.label || device.deviceId}`;
        selectVideos.appendChild(option);
    }
};

const initCaptureImagePage = () => {
    const snapshotWrapper = document.querySelector('.snapshot-wrapper'),
        imgFromVideo = document.querySelector('.new-img'),
        makeAPhotoBtn = document.querySelector('.take-photo');

    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
    dBlock(addItems);
    dBlock(snapshotWrapper);
    dNone(auctionPage);

    makeAPhotoBtn.addEventListener('click', function () {
        canvas.width = videoBox.videoWidth;
        canvas.height = videoBox.videoHeight;
        dBlock(imgFromVideo);

        canvas.getContext('2d').drawImage(videoBox, 0, 0);

        const imageURL = canvas.toDataURL('image/webp');
        imgFromVideo.src = imageURL;

        location.hash = '#artists/items/add';

        //enter the image url in the addImgUrlInput
        addImgUrlInput.value = imageURL;
    });

    getStream().then(getDevices).then(gotDevices);

    window.addEventListener('load', () => window.scrollTo(0, 0));
};
