const datesBetween = (start, end) => {
    const dates = new Array(),
        day = new Date(start);

    while (day <= end) {
        dates.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }
    return dates.reverse();
};

const makeDateToProperFormat = lab => {
    const dateToISOString = lab.map(el => el.toISOString()),
        dateToProperTimeFormat = dateToISOString.map(el =>
            calcProperTimeFormat(el)
        );

    return dateToProperTimeFormat;
};

const findDuplicates = array => {
    const uniqueElements = new Set(array);
    const filteredElements = array.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return [...new Set(filteredElements)];
};

const makeLabel = (arr, num) => {
    arr = [];

    for (let i = 0; i < num; i++) {
        const i = 0;
        arr.push(i);
    }

    localStorage.setItem('chartDataLS', JSON.stringify(arr));
};

const findDuplicatesAndCalcSum = label => {
    //find the dates in the artistItemsLS array in which the artist has sold an item
    let artistArrDateSold = [];

    const artistItemsLS = JSON.parse(localStorage.getItem('artistItemsLS'));
    if (artistItemsLS) {
        for (let i = 0; i < artistItemsLS.length; i++) {
            if (artistItemsLS[i].dateSold !== undefined)
                artistArrDateSold.push(
                    calcProperTimeFormat(artistItemsLS[i].dateSold)
                );
        }
    }

    // find the common date elements in the array with dates of the chart and array with dates on which the artist sold an item
    const concatArrays =
            makeDateToProperFormat(label).concat(artistArrDateSold),
        duplicates = findDuplicates(concatArrays);

    //for each duplicate element find the sum of the items sold
    duplicates.forEach(duplicate => {
        const date = duplicate,
            //filter the  duplicate element of the artistItems array
            priceSold = artistItemsLS.filter(
                itemSold => calcProperTimeFormat(itemSold.dateSold) === date
            ),
            //find the index of the duplicate element in the array of dates in the chart
            elIdx = makeDateToProperFormat(label).indexOf(date),
            chartDataLS = JSON.parse(localStorage.getItem('chartDataLS'));

        //make a sum of the sold items
        let sum = 0;
        priceSold.forEach(el => (sum += el.priceSold));

        //update the labels
        for (let i = 0; i < chartDataLS.length; i++) {
            if (i === elIdx) {
                chartDataLS[elIdx] = sum;
            }
        }

        //store the labels in local storage
        localStorage.setItem('chartDataLS', JSON.stringify(chartDataLS));
    });
};

const initChart = () => {
    const artistChart = document.querySelector('#artistChart'),
        btnDays7 = document.querySelector('#days7'),
        btnDays14 = document.querySelector('#days14'),
        btnDays30 = document.querySelector('#days30'),
        today = new Date(),
        sevenDaysAgo = new Date().setDate(new Date().getDate() - 7),
        fourteenDaysAgo = new Date().setDate(new Date().getDate() - 14),
        thirtyDaysAgo = new Date().setDate(new Date().getDate() - 30),
        labels7 = datesBetween(sevenDaysAgo, today),
        labels14 = datesBetween(fourteenDaysAgo, today),
        labels30 = datesBetween(thirtyDaysAgo, today);

    function updateChart(data, num, label) {
        artistChart.innerHTML = '';
        makeLabel(data, num);
        findDuplicatesAndCalcSum(label);
        const chartDataLS = JSON.parse(localStorage.getItem('chartDataLS'));
        artistInfoChart.data.datasets[0].data = chartDataLS;

        artistInfoChart.data.labels = makeDateToProperFormat(label);
        artistInfoChart.update();
    }

    const config = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Amount',
                    data: [],
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
    };

    const artistInfoChart = new Chart(artistChart, config);

    Chart.defaults.font.size = 9;
    let data7 = [],
        data14 = [],
        data30 = [];

    // //default data for 7 days
    artistChart.innerHTML = '';
    updateChart(data7, 7, labels7);

    addElClass(btnDays7, 'active');
    removeElClass(btnDays14, 'active');
    removeElClass(btnDays30, 'active');

    btnDays7.addEventListener('click', function () {
        artistChart.innerHTML = '';
        updateChart(data7, 7, labels7);

        addElClass(btnDays7, 'active');
        removeElClass(btnDays14, 'active');
        removeElClass(btnDays30, 'active');
    });

    btnDays14.addEventListener('click', function () {
        artistChart.innerHTML = '';
        updateChart(data14, 14, labels14);

        removeElClass(btnDays7, 'active');
        addElClass(btnDays14, 'active');
        removeElClass(btnDays30, 'active');
    });

    btnDays30.addEventListener('click', function () {
        artistChart.innerHTML = '';
        updateChart(data30, 30, labels30);

        removeElClass(btnDays7, 'active');
        removeElClass(btnDays14, 'active');
        addElClass(btnDays30, 'active');
    });

    //7 days by default on hashchange
    window.addEventListener('hashchange', () => {
        artistChart.innerHTML = '';
        updateChart(data7, 7, labels7);

        addElClass(btnDays7, 'active');
        removeElClass(btnDays14, 'active');
        removeElClass(btnDays30, 'active');
    });
};
