const artistChart = document.querySelector('#artistChart');

Chart.defaults.font.size = 9;

const artistInfoChart = new Chart(artistChart, {
    type: 'bar',
    data: {
        // example
        labels: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
        ],
        datasets: [
            {
                label: 'Amount',
                // example
                data: [
                    617, 5943, 1815, 1045, 153, 3060, 106, 4567, 984, 519, 105,
                    2162, 950, 1272,
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
