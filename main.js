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

    map.on('click', function (e) {
        console.log(e);
        console.log(e.coordinate);
    })
}