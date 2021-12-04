import 'ol/ol.css';
import {Circle, Fill, Style, Icon} from 'ol/style';
import {Feature, Map, Overlay, View} from 'ol/index';
import {TileWMS, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';


const place1 = [11357737, 3279730];
const place2 = [11357747, 3279842]

const point1 = new Point(place1);
const point2 = new Point(place2);

const ptFeature = new Feature(point1);
const iconFeature = new Feature({
  geometry: point2,
  name: 'Null Island',
  population: 4000,
  rainfall: 500,
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'data/icon.png',
  }),
});

iconFeature.setStyle(iconStyle);

var format = 'image/jpeg'
const map = new Map({
  target: 'map_lbl',
  view: new View({
    center: place1,
    zoom: 16,
  }),
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
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [ptFeature, iconFeature],
      }),
      style: new Style({
        image: new Circle({
          radius: 9,
          fill: new Fill({color: 'green'}),
        }),
      }),
    }),
  ],
});

const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10],
});
map.addOverlay(popup);

function formatCoordinate(coordinate) {
  return `
    <table>
      <tbody>
        <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
        <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
      </tbody>
    </table>`;
}

const info = document.getElementById('info');
map.on('moveend', function () {
  const view = map.getView();
  const center = view.getCenter();
  info.innerHTML = formatCoordinate(center);
});

map.on('click', function (event) {
  const feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (feature) {
    const coordinate = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinate);
    $(element).popover({
      container: element.parentElement,
      html: true,
      sanitize: false,
      content: formatCoordinate(coordinate),
      placement: 'top',
    });
    $(element).popover('show');
  } else {
    $(element).popover('dispose');
  }
});

map.on('pointermove', function (event) {
  if (map.hasFeatureAtPixel(event.pixel)) {
    map.getViewport().style.cursor = 'pointer';
  } else {
    map.getViewport().style.cursor = 'inherit';
  }
});

// Close the popup when the map is moved
map.on('movestart', function () {
  $(element).popover('dispose');
});