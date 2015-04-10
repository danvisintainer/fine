$(function() {
var feelings = [];
  
  for (var i in gon.tweets){
    // for (var j = 0; j < gon.tweets[i]; j++){
    //   feelings.push(i);
    // }
    feelings.push([i, gon.tweets[i]]);
  }

  feelings = feelings.map(function(d) {
      return {text: d[0], size: d[1] * 10};
    });

  // var fontSize = d3.scale.log().range([10, 100]);

// var layout = cloud()
//       .size([960, 600])
//       .timeInterval(10)
//       .text(function(d) { return d.key; })
//       .font("Impact")
//       .fontSize(function(d) { return fontSize(+d.value); })
//       .rotate(function(d) { return ~~(Math.random() * 5) * 30 - 60; })
//       .padding(1)
//       .on("word", progress)
//       .on("end", draw)
//       .words([…])
//       .start();

    var fill = d3.scale.category20();
    d3.layout.cloud().size([1900, 600])
    .words(feelings)
    .padding(5)
    .timeInterval(10)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();

    // function draw(words) {
      // scale = bounds ? Math.min(
      // w / Math.abs(bounds[1].x - w / 2),
      // w / Math.abs(bounds[0].x - w / 2),
      // h / Math.abs(bounds[1].y - h / 2),
      // h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
  // words = data;
  // debugger;
  // var text = d3.select("div#d3Cloud")
  //     .data(words, function(d) { return d.text.toLowerCase(); });
  // text.transition()
  //     .duration(1000)
  //     .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
  //     .style("font-size", function(d) { return d.size + "px"; });
  // text.enter().append("text")
  //     .attr("text-anchor", "middle")
  //     .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
  //     .style("font-size", "1px")
  //   .transition()
  //     .duration(1000)
  //     .style("font-size", function(d) { return d.size + "px"; });
  // text.style("font-family", function(d) { return d.font; })
  //     .style("fill", function(d) { return fill(d.text.toLowerCase()); })
  //     .text(function(d) { return d.text; });
  // var exitGroup = background.append("g")
  //     .attr("transform", vis.attr("transform"));
  // var exitGroupNode = exitGroup.node();
  // text.exit().each(function() {
  //   exitGroupNode.appendChild(this);
  // });
  // exitGroup.transition()
  //     .duration(1000)
  //     .style("opacity", 1e-6)
  //     .remove();
  // vis.transition()
  //     .delay(1000)
  //     .duration(750)
  //     .attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
  // }

  function draw(words) {
    // debugger;
    d3.select("div#d3Cloud").append("svg")
      .attr("width", window.innerWidth)
      .attr("height", (window.innerHeight * 0.75))
    .append("g")
      .attr("transform", "translate(" + (window.innerWidth / 2) + ", " + ((window.innerHeight * 0.75) / 2) + ")")
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
      .text(function(d) { return d.text; })
      .on("click", function(d) {
        window.location.replace('/word/' + d.text);
      });
  }
});