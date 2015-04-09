$(function() {
var feelings = [];
  
  for (var i in gon.tweets){
    for (var j = 0; j < gon.tweets[i]; j++){
      feelings.push(i);
    }
  }

  var fill = d3.scale.category20();
  d3.layout.cloud().size([window.outerWidth, 1000])
    .words(feelings.map(function(d) {
      return {text: d, size: 10 + Math.random() * 90};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();
  function draw(words) {
    d3.select("div#d3Cloud").append("svg")
      .attr("width", window.outerWidth)
      .attr("height", 1200)
    .append("g")
      .attr("transform", "translate(150,150)")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
  }
});