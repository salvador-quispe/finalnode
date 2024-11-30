// Gráfico de barras
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Disponibilidad', 'Calidad', 'Rendimiento'],
        datasets: [{
            label: 'Indicadores',
            data: [90, 99, 95],
            backgroundColor: ['#6ec1e4', '#8bc34a', '#f47c7c']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Gráfico principal (doughnut)
const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
        labels: ['Disponibilidad', 'Calidad', 'Rendimiento'],
        datasets: [{
            data: [90, 99, 95],
            backgroundColor: ['#6ec1e4', '#8bc34a', '#f47c7c']
        }]
    },
    options: {
        cutout: '70%',
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});

// Gráficos individuales (pie)
function createPieChart(ctxId, value, color) {
    const ctx = document.getElementById(ctxId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [value, 100 - value],
                backgroundColor: [color, '#e8e8e8']
            }]
        },
        options: {
            cutout: '75%',
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

createPieChart('availabilityChart', 90, '#6ec1e4');
createPieChart('qualityChart', 99, '#8bc34a');
createPieChart('performanceChart', 95, '#f47c7c');
