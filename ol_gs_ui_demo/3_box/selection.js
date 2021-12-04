import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import {DragBox, Select} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {platformModifierKeyOnly} from 'ol/events/condition';
import {Map, View} from 'ol/index';

const vectorSource = new VectorSource({
  url: 'data/geojson/countries.geojson',
  format: new GeoJSON(),
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: vectorSource,
    }),
  ],
  target: 'map_sel',
  view: new View({
    center: [11357737, 3279730],
    zoom: 16,
    constrainRotation: 16,
  }),
});

// a normal select interaction to handle click
const select = new Select();
map.addInteraction(select);

const selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
const dragBox = new DragBox({
  condition: platformModifierKeyOnly,
});

map.addInteraction(dragBox);

dragBox.on('boxend', function () {
  // features that intersect the box geometry are added to the
  // collection of selected features

  // if the view is not obliquely rotated the box geometry and
  // its extent are equalivalent so intersecting features can
  // be added directly to the collection
  const rotation = map.getView().getRotation();
  const oblique = rotation % (Math.PI / 2) !== 0;
  const candidateFeatures = oblique ? [] : selectedFeatures;
  const extent = dragBox.getGeometry().getExtent();
  vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
    candidateFeatures.push(feature);
  });

  // when the view is obliquely rotated the box extent will
  // exceed its geometry so both the box and the candidate
  // feature geometries are rotated around a common anchor
  // to confirm that, with the box geometry aligned with its
  // extent, the geometries intersect
  if (oblique) {
    const anchor = [0, 0];
    const geometry = dragBox.getGeometry().clone();
    geometry.rotate(-rotation, anchor);
    const extent = geometry.getExtent();
    candidateFeatures.forEach(function (feature) {
      const geometry = feature.getGeometry().clone();
      geometry.rotate(-rotation, anchor);
      if (geometry.intersectsExtent(extent)) {
        selectedFeatures.push(feature);
      }
    });
  }
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on('boxstart', function () {
  selectedFeatures.clear();
});

const infoBox = document.getElementById('info');

selectedFeatures.on(['add', 'remove'], function () {
  const names = selectedFeatures.getArray().map(function (feature) {
    return feature.get('name');
  });
  if (names.length > 0) {
    infoBox.innerHTML = names.join(', ');
  } else {
    infoBox.innerHTML = '没选中，点击或ctrl+拖动框选区域。';
  }
});

function reverseGeocode(coords) {
  const url = `https://103.81.5.77:7443/geoserver/wfs?service=WFS&version=1.1.0
                &request=GetFeature&typeName=XCBASE:polygons&bbox=
                ${coords[1]-0.01},${coords[0]-0.01},
                ${coords[1]+0.01},${coords[0]+0.01}&outputformat=JSON`
  fetch(url)
    .then(function(response) {
           return response.json();
       }).then(function(json) {
           console.log(json);
       });
}

map.on('click', function (evt) {
 var coord = ol.proj.toLonLat(evt.coordinate);
 reverseGeocode(coord);
});