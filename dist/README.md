## Apica Graph Panel Plugin for Grafana

Supports series data format with severities (W, E, F) provided by Apica Synthetic Monitoring datasource and displays corresponding points with severity color.

![Select Severity](https://raw.githubusercontent.com/ApicaSystem/Grafana.graph-panel/apica-master/src/img/SelectSeverity.png "Select Severity")

Based on [Graph Panel plugin](https://github.com/CorpGlory/grafana-graph-panel) v0.1.0 - a Webpack copy of Grafana default panel.

Works only on Grafana versions >= V5.0.1

The original readme file can be found here: [README.md](https://github.com/CorpGlory/grafana-graph-panel/blob/master/README.md).

### Changelog

#### v0.0.1

Based on [Graph Panel plugin](https://github.com/CorpGlory/grafana-graph-panel) v0.1.0

Added support of the extended series data format to show check runs severity color.
The extended series data format is provided by Apica Synthetic Monitoring datasource starting from version 1.1.3.

#### v0.0.2

Added jquery.flot.pie.js