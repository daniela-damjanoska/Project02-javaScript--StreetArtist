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
