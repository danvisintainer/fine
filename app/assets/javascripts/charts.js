function showPastWeek(d) {

  var labels = [];
  var points = [];

  d.forEach(function(e) {
    labels.push(e[0]);
    points.push(e[1]);
  });

  var data = {
    labels: labels.reverse(),
    datasets: [
        {
            label: "occurrences of this word from the past week",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: points.reverse()
        }
        ]
      };

    var ctx = document.getElementById("line-chart").getContext("2d");
    var myLineChart = new Chart(ctx).Line(data);

}

function showPolarityChart(d) {
  debugger;

  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    var ctx = document.getElementById("polarity-chart").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data, options);

}