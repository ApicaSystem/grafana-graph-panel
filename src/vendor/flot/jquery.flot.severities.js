define(['jquery'],
function ($) {
  'use strict';

  /*
   * jquery.flot.severities
   *
   * description: Flot plugin for adding marker colors to the plot
   * version: 0.0.1
   * authors:
   *
   * released under MIT License and GPLv2+
   */

  /**
   * initialize the plugin for the given plot
   */
  function init(plot) {

    function processRawData(plot, series, data, datapoints) {
      if (data && data[0] && data[0].length === 4) {

        var format = [
          { x: true, number: true, required: true },
          { y: true, number: true, required: true },
        ];

        var autoscale = !!((series.bars.show && series.bars.zero) || (series.lines.show && series.lines.zero));
        format.push({ y: true, number: true, required: false, defaultValue: 0, autoscale: autoscale });
        if (series.bars.horizontal) {
          delete format[format.length - 1].y;
          format[format.length - 1].x = true;
        }

        format.push({ severity: true, number: true, required: true });

        datapoints.format = format;
      }
    };

    function draw(plot, ctx) {

      function plotPoints(datapoints, offset, shadow, axisx, axisy) {

        if (_.filter(datapoints.format, function(dimension) { return dimension.severity; }).length > 0) {

          var points = datapoints.points, ps = datapoints.pointsize;
  
          for (var i = 0; i < points.length; i += ps) {

            var x = points[i];
            var y = points[i + 1];
            var severity = points[i + 3];

            if (x == null || x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
              continue;

            ctx.beginPath();

            x = axisx.p2c(x);
            y = axisy.p2c(y) + offset;

            ctx.arc(x, y, getRadiusBySeverity(severity), 0, shadow ? Math.PI : Math.PI * 2, false);

            ctx.closePath();

            ctx.fillStyle = getColorBySeverity(severity);
            ctx.fill();

            ctx.stroke();
          }
        }
      }

      function getRadiusBySeverity(severity) {
        return _.includes([4, 8, 16], severity) ? 6 : 0;        
      }

      function getColorBySeverity(severity) {
        switch(severity) {
          case 4: return "#E0D200";
          case 8: return "#FF9933";
          case 16: return "#C91818";
          default: "#000000";
        }
      }

      var series = plot.getData();
      var plotOffset = plot.getPlotOffset();

      ctx.save();

      ctx.translate(plotOffset.left, plotOffset.top);

      for (var i = 0; i < series.length; i++) {

        var serie = series[i];

        if (serie.lines.show || serie.bars.show || serie.points.show) {

          plotPoints(serie.datapoints, 0, false, serie.xaxis, serie.yaxis);
        }
      }

      ctx.restore();
    }

    plot.hooks.processRawData.push(processRawData);
    plot.hooks.draw.push(draw);
  }

  var defaultOptions = {
  };

  $.plot.plugins.push({
    init: init,
    options: defaultOptions,
    name: "severities",
    version: "0.0.1"
  });
});
