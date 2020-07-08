var template = `
<div class="graph-panel" ng-class="{'graph-panel--legend-right': ctrl.panel.legend.rightSide}">
  <div class="graph-panel__chart" apica-graph ng-dblclick="ctrl.zoomOut()">
  </div>

  <div class="graph-legend" apica-legend></div>
</div>
`;

export default template;
