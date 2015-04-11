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

  labels = [];
  dataPositive = [];
  dataNegative = [];
  dataUnknown = [];

  d.forEach(function(e) {
    labels.push(e.date);
    dataPositive.push(e.positive);
    dataNegative.push(e.negative);
    dataUnknown.push(e.unknown);
  });

  var data = {
    labels: labels,
    datasets: [
        {
            label: "positive feelings",
            fillColor: "rgba(137,177,116,0.5)",
            strokeColor: "rgba(137,177,116,0.8)",
            highlightFill: "rgba(137,177,116,0.75)",
            highlightStroke: "rgba(137,177,116,1)",
            data: dataPositive
        },
        {
            label: "negative feelings",
            fillColor: "rgba(174,62,61,0.5)",
            strokeColor: "rgba(174,62,61,0.8)",
            highlightFill: "rgba(174,62,61,0.75)",
            highlightStroke: "rgba(174,62,61,1)",
            data: dataNegative
        },
        {
            label: "unknown feelings",
            fillColor: "rgba(175,175,175,0.5)",
            strokeColor: "rgba(175,175,175,0.8)",
            highlightFill: "rgba(175,175,175,0.75)",
            highlightStroke: "rgba(175,175,175,1)",
            data: dataUnknown
        }
      ]
    };

    var ctx = document.getElementById("polarity-chart").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data);

}