// const videoBox = document.querySelector('.make-snapshot-inner video'),
//     selectVideos = document.querySelector('#videos');

// const getStream = () => {
//     const source = selectVideos.value,
//         constrains = {
//             video: {
//                 deviceId: source ? { exact: source } : undefined,
//             },
//         };

//     return navigator.mediaDevices.getUserMedia(constrains).then(gotStream);
// };

// const gotStream = stream => {
//     videoBox.srcObject = stream;
// };

// const getDevices = () => {
//     return navigator.mediaDevices.enumerateDevices();
// };

// const gotDevices = deviceInfo => {
//     const videoDevices = deviceInfo.filter(x => x.kind === 'videoinput');

//     for (let i = 0; i < videoDevices.length; i++) {
//         const device = videoDevices[i],
//             option = document.createElement('option');

//         option.value = device.deviceId;
//         option.text = `Camera ${i + 1} ${device.label || device.deviceId}`;
//         selectVideos.appendChild(option);
//     }
// };

// const initCaptureImagePage = () => {
//     const snapshotWrapper = document.querySelector('.snapshot-wrapper'),
//         imgFromVideo = document.querySelector('.new-img'),
//         makeAPhotoBtn = document.querySelector('.take-photo');

//     dNone(landingPage);
//     dNone(visitorHomePage);
//     dNone(visitorListingPage);
//     dNone(artistHomePage);
//     dBlock(artistItemsPage);
//     dBlock(addItems);
//     dBlock(snapshotWrapper);
//     dNone(auctionPage);

//     makeAPhotoBtn.addEventListener('click', function () {
//         canvas.width = videoBox.videoWidth;
//         canvas.height = videoBox.videoHeight;
//         dBlock(imgFromVideo);

//         canvas.getContext('2d').drawImage(videoBox, 0, 0);

//         const imageURL = canvas.toDataURL('image/webp');
//         imgFromVideo.src = imageURL;

//         location.hash = '#artists/items/add';

//         //enter the image url in the addImgUrlInput
//         addImgUrlInput.value = imageURL;
//     });

//     getStream().then(getDevices).then(gotDevices);

//     window.addEventListener('load', () => window.scrollTo(0, 0));
// };

function initCaptureImagePage() {
    const video = document.querySelector('.make-snapshot-inner video'),
        snapshotWrapper = document.querySelector('.snapshot-wrapper'),
        imgFromVideo = document.querySelector('.new-img'),
        switchCamera = document.querySelector('.switchBtn');

    let currentStreamingIndex = 0,
        currentStream,
        allVideoDevices;

    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
    dBlock(addItems);
    dBlock(snapshotWrapper);
    dNone(auctionPage);

    // Take all devices
    navigator.mediaDevices.enumerateDevices().then(data => {
        allVideoDevices = data.filter(device => device.kind === 'videoinput');
        switchCamera.removeAttribute('disabled');
    });

    // Get stream when switching camera
    function getStream() {
        currentStreamingIndex++;
        const source =
            allVideoDevices[currentStreamingIndex % allVideoDevices.length]
                .deviceId;

        const constrains = {
            video: {
                deviceId: source ? { exact: source } : undefined,
            },
        };

        navigator.mediaDevices.getUserMedia(constrains).then(stream => {
            currentStream = stream;
            video.srcObject = stream;
        });
    }

    function initCamera() {
        const canvas = document.querySelector('#canvas'),
            makeAPhotoBtn = document.querySelector('.take-photo');

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then(stream => {
                currentStream = stream;
                video.srcObject = stream;
            })
            .catch(function (err) {
                console.log('An error occurred: ' + err);
            });

        makeAPhotoBtn.addEventListener('click', function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            dBlock(imgFromVideo);

            canvas.getContext('2d').drawImage(video, 0, 0);

            const imageURL = canvas.toDataURL('image/webp');
            imgFromVideo.src = imageURL;

            location.hash = '#artists/items/add';

            //enter the image url in the addImgUrlInput
            addImgUrlInput.value = imageURL;

            //fixing-bug
            const reqImgUrl = document.querySelector('.reqImgUrl');
            manipulatingRequiredFieldsOnFocus(addImgUrlInput, reqImgUrl);
        });

        switchCamera.addEventListener('click', function () {
            if (currentStream) {
                stopAllStream(currentStream);
            }
            getStream();
        });
    }

    function stopAllStream(stream) {
        stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    initCamera();
}
