var randomScalingFactor = function() {
    return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
};

var config = {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            fill: false,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }, {
            label: 'My Second dataset',
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            fill: false,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart - Logarithmic'
        },
        scales: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                display: true,
                type: 'logarithmic',
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('chart').getContext('2d');
    var ctx1 = document.getElementById('chart2').getContext('2d');
    var ctx2= document.getElementById('chart3').getContext('2d');
    window.myLine = new Chart(ctx, config);
    window.myLine2 = new Chart(ctx1, config);
    window.myLine3= new Chart(ctx2, config);;
};

document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return randomScalingFactor();
        });

    });

    window.myLine.update();
    window.myLine2.update();
    window.myLine3.update();
});