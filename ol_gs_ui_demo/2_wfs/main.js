import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

import TileWMS from 'ol/source/TileWMS';

import {Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';

var format = 'image/jpeg'

const vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'https://103.81.5.77:7443/geoserver/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=XCBASE:polygons&' +
      'outputFormat=application/json&srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857'
    );
  },
  strategy: bboxStrategy,
});

const vector = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2,
    }),
  }),
});


const raster = new TileLayer({
  source: new TileWMS({
    url: 'https://103.81.5.77:7443/geoserver/wms',
    params: {
      'FORMAT': format,
      'VERSION': '1.1.1',
      tiled: true,
      "STYLES": '',
      "LAYERS": '基础地图',
      "exceptions": 'application/vnd.ogc.se_inimage',
      tilesOrigin: 11357830 + "," + 3279730

    }
  })
})

const map = new Map({
  layers: [raster, vector],
  target: document.getElementById('map'),
  view: new View({
    center: [11357737, 3279717],
    projection: 'EPSG:3857',
    zoom: 15
  })
});