window.onload = init;

function init () {
    const map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: [2130866.237095212, 6495567.041331601],
          zoom: 16,
          maxZoom: 20,
          minZoom: 10,
          rotation: 0
        })
    });

    // Base maps layers
    const openStreetMapStandard = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: false,
      title: 'OSMStandard'
    })

    const openStreetMapHumanitarian = new ol.layer.Tile({
      source: new ol.source.OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      }),
      visible: false,
      title: 'OSMHumanitarian'
    });

    const stamenTerrain = new ol.layer.Tile({
      source: new ol.source.OSM({
        url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
      }),
      visible: false,
      title: 'StamenTerrain'
    });

    // Layer Group
    const baseLayerGroup = new ol.layer.Group({
      layers: [
        openStreetMapStandard,
        openStreetMapHumanitarian,
        stamenTerrain
      ]
    });

    map.addLayer(baseLayerGroup);

    // Layer switcher logic for basemaps
    const baseLayerElements = document.querySelectorAll('.sidebar > label > input[type=radio]');

    for (let baseLayerElement of baseLayerElements) {

      baseLayerElement.addEventListener('change', function () {
        let baseLayerElementValue = this.value;

        baseLayerGroup.getLayers().forEach(function (element, index, array) {
          let baseLayerTitle = element.get('title');

          element.setVisible(baseLayerTitle === baseLayerElementValue);
        })
      });
    }

    // Vector layers
    const placesInCityGeoJSON = new ol.layer.VectorImage({
      source: new ol.source.Vector({
        url: './data/vector_data/placesInCity.geojson',
        format: new ol.format.GeoJSON()
      }),
      visible: true,
      title: 'placesInCityGeoJSON'
    });

    map.addLayer(placesInCityGeoJSON);

}