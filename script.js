window.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chartContainer');
    let chart;
    let priceData = [];

    function createChart() {
        const options = {
            series: [{
                name: 'Prix du Gazole',
                data: priceData
            }],
            chart: {
                type: 'line',
                height: 350
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                min: 0,
                max: 9,
                labels: {
                    formatter: function(value) {
                        return value.toFixed(3) + ' €';
                    }
                }
            }
        };

        chart = new ApexCharts(chartContainer, options);
        chart.render();
    }

    function updateChart(price) {
        const timestamp = new Date().getTime();
        const priceValue = parseFloat(price);
        priceData.push([timestamp, priceValue]);
        chart.updateSeries([{
            data: priceData
        }]);
    }

    function fetchPrice() {
        fetch('fetch_price.php')
            .then(response => response.text())
            .then(price => {
                const cleanedPrice = price.replace('€', '').trim();
                updateChart(cleanedPrice);
            })
            .catch(error => {
                console.log('Une erreur s\'est produite lors de la récupération du prix mis à jour :', error);
            });
    }

    createChart();
    fetchPrice();

    setInterval(fetchPrice, 10000);
});