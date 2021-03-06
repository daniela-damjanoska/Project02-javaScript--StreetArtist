function initCaptureImagePage() {
    const video = document.querySelector('.make-snapshot-inner video'),
        snapshotWrapper = document.querySelector('.snapshot-wrapper'),
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

            //when user click on the add-new-item area hide the canvas
            dNone(canvas);

            canvas.getContext('2d').drawImage(video, 0, 0);

            const imageURL = canvas.toDataURL('image/webp');
            imgFromVideo.src = imageURL;

            location.hash = '#artists/items/add';

            //enter the image url in the addImgUrlInput
            addImgUrlInput.value = imageURL;
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
