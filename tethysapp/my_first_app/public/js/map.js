


var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

$( document ).ready(function() {


    var projection = ol.proj.get('EPSG:3857');

    var esri_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            attribution: [new ol.Attribution({
                html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
                'rest/services/World_Topo_Map/MapServer>ArcGIS</a>'
            })],
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
	});

    var vector_polygon_land = new ol.layer.Vector({
      source: new ol.source.KML({
        projection: projection,
        url: '/static/my_first_app/kml/NAMEOFLAND.kml'
      })
    });

     var vector_polyline_journey = new ol.layer.Vector({
      source: new ol.source.KML({
        projection: projection,
        url: '/static/my_first_app/kml/JOURNEY_LINE.kml'
      })
    });

       var vector_point= new ol.layer.Vector({
      source: new ol.source.KML({
        projection: projection,
        url: '/static/my_first_app/kml/BOMLocation.kml'
      })
    });


    var overlay = new ol.Overlay({
        element: container
        });


    var map = new ol.Map({
      layers: [esri_layer, vector_polygon_land, vector_polyline_journey, vector_point],
      overlays: [overlay],
      target: document.getElementById('map'),
      view: new ol.View({
        center: [876970.8463461736, 5859807.853963373],
        projection: projection,
        zoom: 3
      })
    });


    map.on('click', function(evt) {
        //Try to get a feature at the point of interest
        var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
        return feature;
        },null, function(layer) {
        return (layer === vector_point);
        });
     //if we found a feature then create and show the popup.
        if (feature) {
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        overlay.setPosition(coord);
        var displaycontent = '<b>name:</b> ' + feature.get('name')+ '<br> <b>' + feature.get('story') + '</b> <br> <img src="' + feature.get('picture') + '" style="width:100%;height:100%;">' ;
        content.innerHTML = displaycontent;
        }
        });
});