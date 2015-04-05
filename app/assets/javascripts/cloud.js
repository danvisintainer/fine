$(function() {

  var div = document.getElementById("surrounding_div");
  var canvas = document.getElementById("cloud");

  canvas.height = div.offsetHeight;
  canvas.width  = div.offsetWidth;

  WordCloud($('#cloud')[0], { list: gon.tweets, gridSize: Math.round(16 * $('#cloud').width() / 1024),
    weightFactor: function (size) {
      return Math.pow(size, 1.6) * $('#cloud').width() / 1024;
    },
    fontFamily: 'Times, serif',
    rotateRatio: 0.5} );

  data = gon.tweets.map(function(e){ 
    return {
      value: e[1],
      color: getRandomColor(),
      label: e[0]
    };
  });

  var options = {
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"comm-how\"><%=segments[i].value%>%</div><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"};

  var ctx = document.getElementById("myChart").getContext("2d");
  var myNewChart = new Chart(ctx).Pie(data, options);
  $('#my-doughnut-legend')[0].innerHTML = myNewChart.generateLegend();

});

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// var data = [
//     {
//         value: 300,
//         color:"#F7464A",
//         highlight: "#FF5A5E",
//         label: "Red"
//     },
//     {
//         value: 50,
//         color: "#46BFBD",
//         highlight: "#5AD3D1",
//         label: "Green"
//     },
//     {
//         value: 100,
//         color: "#FDB45C",
//         highlight: "#FFC870",
//         label: "Yellow"
//     }
// ]