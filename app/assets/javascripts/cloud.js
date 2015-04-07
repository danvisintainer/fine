$(function() {

  var div = document.getElementById("surrounding_div");

  var canvas = document.getElementById("cloud");

  canvas.height = div.offsetHeight;

  canvas.width  = div.offsetWidth;

  var data = [];

  for (var i in gon.tweets){
    data.push([i, gon.tweets[i]]);
  }

  WordCloud($('#cloud')[0], {
    list: data,
    gridSize: Math.round(16 * $('#cloud').width() / 1024),
    weightFactor: function (size) {
      return Math.pow(size, 1.5) * $('#cloud').width() / 1024;
    },
    fontFamily: 'Times, serif',
    rotateRatio: 0.5,
    click: function(item, dimension, event){
      console.log("Clicked on " + item);
    }} );

});