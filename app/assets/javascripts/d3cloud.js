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

    function draw(words) {
    d3.select("div#d3Cloud").append("svg")
    .attr('width', 1900)
    .attr('height', 600)
    // .append('g')
    .selectAll('text')
    .data(words)
    .enter().append('text')
    .style('font-size', function(d) { return d.size + 'px'; })
    .style('font-family', "Impact")
    .style('fill', function(d, i) { return fill(i); })
    .attr('text-anchor', 'middle')
    .style("margin-left", function(d) {return d.size + "px"})
    .attr('transform', function(d) { return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'; })
    .text(function(d) { return d.text; })
      .on("click", function(d) {
        window.location.replace('/word/' + d.text);
      });
  }

  // function draw(words) {
  //   d3.select("div#d3Cloud").append("svg")
  //     .attr("width", 750)
  //     .attr("height", 500)
  //   .append("g")
  //     .attr("transform", "translate(150,150)")
  //   .selectAll("text")
  //     .data(words)
  //   .enter().append("text")
  //     .style("font-size", function(d) { return d.size + "px"; })
  //     .style("font-family", "Impact")
  //     .style("fill", function(d, i) { return fill(i); })
  //     .attr("text-anchor", "middle")
  //     .attr("transform", function(d) {
  //       return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  //     })
  //     .text(function(d) { return d.text; })
  //     .on("click", function(d) {
  //       window.location.replace('/word/' + d.text);
  //     });
  // }
});