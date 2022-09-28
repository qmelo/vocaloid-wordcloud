d3.json('./data/tags.json').then(function(data) {
  var width = 400;
  var height = 500;
  
  var words = data.map(function(d) {
    return {
      text: d.text,
      size: Math.pow(d.value, 1/6) * 3,
      url: "https://www.nicovideo.jp/tag/VOCALOID " + d.tags.join(" OR ")
    };
  });

  d3.layout.cloud().size([width, height])
    .words(words)
    .rotate(function() { return (~~(Math.random() * 6) - 3) * 5; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();

  function draw(words) {
    d3.select('#cloud')
      .append("svg")
      .attr("class", "ui fluid image")
      .attr("viewBox", "0 0 " + width + " " + height )
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; })
      .on("click", function (d, i){
        window.open(d.url);
      });
  }
});
