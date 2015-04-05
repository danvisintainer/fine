$(function() {

  var div = document.getElementById("surrounding_div");

  var canvas = document.getElementById("cloud");

  canvas.height = div.offsetHeight;

  canvas.width  = div.offsetWidth;

  WordCloud($('#cloud')[0], { list: gon.tweets, gridSize: Math.round(16 * $('#cloud').width() / 1024),
    weightFactor: function (size) {
      return Math.pow(size, 2.3) * $('#cloud').width() / 1024;
    },
    fontFamily: 'Times, serif',
    rotateRatio: 0.5} );
});