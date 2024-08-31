const ctx = document.getElementById('lineChart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // To be populated with dates
        datasets: [{
            label: 'Followers',
            data: [], // To be populated with follower counts
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart() {
    const metric = document.getElementById('metric').value;

    // Fetch data from your API or static JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const dates = data.map(entry => entry.date);
            const values = data.map(entry => entry[metric]);

            chart.data.labels = dates;
            chart.data.datasets[0].label = metric.charAt(0).toUpperCase() + metric.slice(1);
            chart.data.datasets[0].data = values;
            chart.update();
        });
}

// Initial chart update
updateChart();
