(function() {
    var makeSVGRoundProgressBar = function(svgContainer) {
        var progress = 100,
            // gradientStart = 'rgb(11,178,180)',
            // gradientStop = 'rgb(0,255,114)',
            gradientStart = null,
            gradientStop = null,
            background = 'rgb(0,255,255)',
            strokeWidth = 5,
            size = 200;

        // Calculate Size
        progress = progress > 99.9999 ? 99.9999 : progress;
        progress = progress < 0 ? 0 : progress;

        var degrees = ((progress / 100) * 360) - 90,
            radians = (Math.PI * degrees) / 180,
            radius = (size / 2) - strokeWidth,
            offsetY = strokeWidth,
            offsetX = size / 2,
            y = Math.sin(radians) * radius + (radius + offsetY),
            x = Math.cos(radians) * radius + offsetX,
            arc = progress > 50 ? 1 : 0;

        var path = [
            "M " + offsetX + ", " + offsetY,
            "A " + radius + ", " + radius, 0, arc, 1, x, y
        ].join(",");


        // createSvG
        var xmlns = "http://www.w3.org/2000/svg";

        var svgElem = document.createElementNS(xmlns, 'svg');
        svgElem.setAttributeNS (null, "width", size);
        svgElem.setAttributeNS (null, "height", size);
        // create path
        var rpath = document.createElementNS (xmlns, "path");
        rpath.setAttributeNS (null, 'stroke', background);
        rpath.setAttributeNS (null, 'stroke-width', strokeWidth);
        rpath.setAttributeNS (null, 'd', path);
        rpath.setAttributeNS (null, 'fill', "none");
        rpath.setAttributeNS (null, 'opacity', 1.0);

        svgElem.appendChild(rpath);

        svgContainer.appendChild(svgElem);
        var pathSize = rpath.getTotalLength();

        rpath.style.webkitTransition = "stroke-dashoffset 2s ease-in-out";
        rpath.style.strokeDashoffset = pathSize;
        rpath.style.strokeDasharray = pathSize;

        // Apply the Stroke Dashoffset asynchronously to trigger CSS Animation.
        setTimeout(function() {
            rpath.style.strokeDashoffset = 0;
        }, 0);
    };


    var svgContainer = document.getElementById ("svgContainer");    

    makeSVGRoundProgressBar(svgContainer);
})();
