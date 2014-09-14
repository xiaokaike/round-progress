$(function() {
  var makeSVGRoundProgressBar = function($this) {
    var   progress = $this.attr("data-progress") ? parseInt($this.attr("data-progress")) : 0
        , gradientStart = $this.attr("data-progress-gradient-start")
        , gradientStop = $this.attr("data-progress-gradient-stop")
        , background = $this.attr("data-progress-background")
        , strokeWidth = $this.attr("data-progress-stroke-width") ? parseInt($this.attr("data-progress-stroke-width")) : 5
        , size = $this.attr("data-progress-size") ? parseInt($this.attr("data-progress-size")) : 0;

    var progressID = "progress-bar-" + Math.round(Math.random() * 10000);

    // Calculate Size
    progress = progress > 99.9999 ? 99.9999 : progress;
    progress = progress < 0 ? 0 : progress;

    var   degrees = ((progress / 100) * 360) - 90
        , radians = (Math.PI * degrees) / 180
        , radius = (size / 2) - strokeWidth
        , offsetY = strokeWidth
        , offsetX = size / 2
        , y = Math.sin(radians) * radius + (radius + offsetY)
        , x = Math.cos(radians) * radius + offsetX
        , arc = progress > 50 ? 1 : 0;

    var path = [
      "M " + offsetX + ", " + offsetY,
      "A " + radius  + ", " + radius, 0, arc, 1, x, y
    ].join(",");

    // Render Template
    var svgTemplate = ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="',size,'px" height="',size,'px">'];

    if (gradientStart && gradientStop) {
      svgTemplate.push('<defs>',
                        '<linearGradient id="',progressID,'-gradient" x1="50%" y1="0%" x2="50%" y2="100%">',
                          '<stop offset="0%" style="stop-color:',gradientStart,';stop-opacity:1" />',
                          '<stop offset="100%" style="stop-color:',gradientStop,';stop-opacity:1" />',
                        '</linearGradient>',
                      '</defs>',
                      '<path id="',progressID,'" d="',path,'" fill="none" stroke="url(#',progressID,'-gradient)" stroke-width="',strokeWidth,'" />');
    } else if (background) {
      svgTemplate.push('<path id="',progressID,'" d="',path,'" fill="none" stroke="',background,'" stroke-width="',strokeWidth,'" />');
    } else {
      background = ["rgb(",Math.round(Math.random()*255),",",Math.round(Math.random()*255),",",Math.round(Math.random()*255),")"].join("");
      svgTemplate.push('<path id="',progressID,'" d="',path,'" fill="none" stroke="',background,'" stroke-width="',strokeWidth,'" />');
    }

    svgTemplate.push('</svg>');

    svgTemplate = svgTemplate.join("");

    $this.html(svgTemplate);
    var   $circle = $this.find("#" + progressID)
        , pathSize = $circle[0].getTotalLength();

    $circle.css("transition","stroke-dashoffset 1s ease-in-out");
    $circle.css("stroke-dashoffset",pathSize);
    $circle.css("stroke-dasharray",pathSize);

    // Apply the Stroke Dashoffset asynchronously to trigger CSS Animation.
    setTimeout(function() {
      $circle.css("stroke-dashoffset",0);
    },0);
  };

  $(".progress").each(function() {
    makeSVGRoundProgressBar($(this));
  });
});