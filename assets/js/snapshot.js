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

// const stopStreamedVideo = () => {
//     const stream = videoBox.srcObject,
//         tracks = stream.getTracks();

// tracks.forEach(function (track) {
//     track.stop();
// });

// videoBox.srcObject = null;
// };

const initCaptureImagePage = () => {
    // const snapshotWrapper = document.querySelector('.snapshot-wrapper'),
    const canvas = document.querySelector('.make-snapshot-inner canvas'),
        imgFromVideo = document.querySelector('.new-img'),
        makeAPhotoBtn = document.querySelector('.take-photo');

    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
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
    });

    getStream().then(getDevices).then(gotDevices);
};
