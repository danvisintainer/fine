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
            label: "My First dataset",
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