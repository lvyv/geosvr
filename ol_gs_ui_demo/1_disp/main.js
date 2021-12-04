import 'ol/ol.css';
import Map from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';


var format = 'image/jpeg'
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new TileWMS({
        url: 'https://103.81.5.77:7443/geoserver/wms',
        params: {
          'FORMAT': format,
          'VERSION': '1.1.1',
          tiled: true,
          "STYLES": '',
          "LAYERS": 'XCBASE:全局底图（低分辨率）',
          "exceptions": 'application/vnd.ogc.se_inimage',
          tilesOrigin: 11357830 + "," + 3279730

        }
      })
    })
  ],
  view: new View({
    center: [11357737, 3279717],
    projection: 'EPSG:3857',
    zoom: 15
  })
});

console.log('ok');