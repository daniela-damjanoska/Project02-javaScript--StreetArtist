function initCaptureImagePage() {
    const wrapper = document.querySelector('.snapshot-wrapper');

    dNone(landingPage);
    dNone(visitorHomePage);
    dNone(visitorListingPage);
    dNone(artistHomePage);
    dBlock(artistItemsPage);
    dNone(auctionPage);
    dBlock(wrapper);

    const video = document.querySelector('.make-snapshot-inner video');
    const canvas = document.querySelector('.make-snapshot-inner canvas');
    const img = document.querySelector(' .new');
    const ssBtn = document.querySelector('.take-photo');
    const selectVideos = document.querySelector('#videos');

    ssBtn.addEventListener('click', function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        console.log(video.videoWidth);
        console.log(video.videoHeight);

        canvas.getContext('2d').drawImage(video, 0, 0);
        const imageURL = canvas.toDataURL('image/webp');
        img.src = imageURL;

        stopStreamedVideo();
        canvas.style.display = 'none';
        dNone(canvas);
        dNone(selectVideos);
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

    // document
    //     .querySelector('#stopStream')
    //     .addEventListener('click', stopStreamedVideo);

    getStream().then(getDevices).then(gotDevices);
}
