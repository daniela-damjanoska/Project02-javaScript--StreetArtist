const canvasWrapper = document.querySelector('.canvas');

Chart.defaults.font.size = 9;

function generateDatesInBetween(start, end) {
    let arr = new Array();
    let dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr.reverse();
}

const today = new Date();
document.querySelector('#days7').addEventListener('click', function () {
    canvasWrapper.innerHTML = '';
    const artistChart7 = document.createElement('canvas');
    canvasWrapper.appendChild(artistChart7);

    const sevenDaysAgo = new Date().setDate(new Date().getDate() - 7);
    const labels7 = generateDatesInBetween(sevenDaysAgo, today);

    const artistInfoChart = new Chart(artistChart7, {
        type: 'bar',
        data: {
            // example
            labels: labels7.map(d => `${d.toLocaleDateString('en-GB')}`),
            datasets: [
                {
                    label: 'Amount',
                    // example
                    data: [
                        617, 5943, 1815, 1045, 153, 3060, 106, 4567, 984, 519,
                        105, 2162, 950, 1272,
                    ],
                    backgroundColor: '#a16a5e',
                    hoverBackgroundColor: '#d54c2e',
                },
            ],
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });
    console.log(labels7);
});

document.querySelector('#days14').addEventListener('click', function () {
    canvasWrapper.innerHTML = '';

    const artistChart14 = document.createElement('canvas');
    canvasWrapper.appendChild(artistChart14);

    const fourteenDaysAgo = new Date().setDate(new Date().getDate() - 14);
    const labels14 = generateDatesInBetween(fourteenDaysAgo, today);

    const artistInfoChart = new Chart(artistChart14, {
        type: 'bar',
        data: {
            // example
            labels: labels14.map(d => `${d.toLocaleDateString('en-GB')}`),
            datasets: [
                {
                    label: 'Amount',
                    // example
                    data: [
                        617, 5943, 1815, 1045, 153, 3060, 106, 4567, 984, 519,
                        105, 2162, 950, 1272,
                    ],
                    backgroundColor: '#a16a5e',
                    hoverBackgroundColor: '#d54c2e',
                },
            ],
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });

    // const newLabel = labels14.map(el => el.toISOString());
    // const hello = newLabel.map(el => calcProperTimeFormat(el));
    // console.log(labels14);
    // console.log(newLabel);
    // console.log(hello);

    // let artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));
    // let dani = [];
    // for (let i = 0; i < artistItemsLS.length; i++) {
    //     if (artistItemsLS[i].dateSold === undefined) continue;
    //     dani.push(calcProperTimeFormat(artistItemsLS[i].dateSold), i);
    // }
    // console.log(dani);
    // let index = [];
    // let element = [];
    // for (let i = 0; i < dani.length; i++) {
    //     if (i % 2 === 1) index.push(dani[i]);
    //     else element.push(dani[i]);
    // }
    // console.log(index);
    // console.log(element);
});

document.querySelector('#days30').addEventListener('click', function () {
    canvasWrapper.innerHTML = ``;

    const artistChart30 = document.createElement('canvas');
    canvasWrapper.appendChild(artistChart30);

    const thirtyDaysAgo = new Date().setDate(new Date().getDate() - 30);
    const labels30 = generateDatesInBetween(thirtyDaysAgo, today);

    const artistInfoChart = new Chart(artistChart30, {
        type: 'bar',
        data: {
            // example
            labels: labels30.map(d => `${d.toLocaleDateString('en-GB')}`),
            datasets: [
                {
                    label: 'Amount',
                    // example
                    data: [
                        617, 5943, 1815, 1045, 153, 3060, 106, 4567, 984, 519,
                        105, 2162, 950, 1272,
                    ],
                    backgroundColor: '#a16a5e',
                    hoverBackgroundColor: '#d54c2e',
                },
            ],
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });

    console.log(labels30);

    const newLabel = labels30.map(el => el.toISOString());
    const hello = newLabel.map(el => calcProperTimeFormat(el));
    // console.log(labels14);
    console.log(newLabel);
    console.log(hello);

    let artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));
    let three = [];
    for (let i = 0; i < artistItemsLS.length; i++) {
        if (artistItemsLS[i].dateSold === undefined) continue;
        three.push(calcProperTimeFormat(artistItemsLS[i].dateSold), i);
    }
    console.log(three);
    let index = [];
    let element = [];
    for (let i = 0; i < dani.length; i++) {
        if (i % 2 === 1) index.push(dani[i]);
        else element.push(dani[i]);
    }
    console.log(index);
    console.log(element);

    //filter the sold items from artist array
    const soldItems = artistItemsLS.filter(
        itemSold => itemSold.dateSold !== undefined
    );

    console.log(soldItems);

    //make a sum of the income of the sold items
    // let sum = 0;
    // for (let i = 0; i < soldItems.length; i++) {
    //     if (!soldItems[i].priceSold) continue;
    //     sum += soldItems[i].priceSold;
    // }

    // findCommonElement(hello, element);
    const one = hello.concat(element);
    console.log(one);

    function toFindDuplicates(array) {
        const uniqueElements = new Set(array);
        const filteredElements = array.filter(item => {
            if (uniqueElements.has(item)) {
                uniqueElements.delete(item);
            } else {
                return item;
            }
        });

        return [...new Set(filteredElements)];
    }

    const duplicate = toFindDuplicates(bravo);
    console.log(duplicate);
    // toFindDuplicates(bravo);
    let exp = [];

    // for(i = 0; i< hello.length)
    // hello.forEach(el => {
    //     console.log(el);
    for (let i = 0; i < element.length; i++) {
        // console.log(element[i]);
        // if (el !== element[i]) {
        //     el = 1;
        // } else {
        //     el = 'yes';
        // }
        const two = hello.indexOf(element[i]);

        exp.push(two);
    }

    // });

    console.log(exp);
});
