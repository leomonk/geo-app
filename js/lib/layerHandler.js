var layerHandler = {
    geoserverPath: "http://localhost:8080/geoserver/",
    extent:[3058704.123860,4278027.599065,3155320.527612,4362414.078292],
    srs:"EPSG:4326",
    constructWms: function(geoserverWorkspace,geoserverLayer,title) {
        this.geoserverWorkspace =  geoserverWorkspace;
        this.geoserverLayer = geoserverLayer;
        this.title = title;
        this.wms = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: this.geoserverPath+this.geoserverWorkspace+"/wms",
                params: {
                    'LAYERS': this.geoserverWorkspace+":"+this.geoserverLayer,
                    'TILED': true
                },
                serverType: 'geoserver'
            })
        })
        this.wms.set('title',this.title);
        return this.wms;
    },
    constructGeoJson:function(){
      return this.geoJsonLayer = new ol.layer.Vector({source:  new ol.source.Vector()});
    },
    loadMap: function() {
        this.map = new ol.Map({
            pixelRatio: 1,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            controls: ol.control.defaults({attribution: false}),
            target: 'map',
            view: new ol.View({
                center: [3125204.32,4345597.94],
                zoom: 10,
                minZoom: 2
            }),
        });
        return this.map;
    },
    geometryHandler : {
      renderCircle:function(pointCoord,radius,title){
          this.pointCoord = pointCoord;
          this.radius = radius;
          this.title = title;
          this.circleStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: this.radius,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'rgba(255,0,0,0.9)',
                    width: 10
                })
            })
        });
        this.geoJson = layerHandler.constructGeoJson();
        this.geoJson.set('title',this.title);
        this.geoJson.getSource().addFeature(new ol.Feature(new ol.geom.Point(this.pointCoord)));
        this.geoJson.setStyle(this.circleStyle);
        return this.geoJson;
      },
      renderPoint:function(pointCoord,radius,title){
          this.pointCoord = pointCoord;
          this.radius = radius;
          this.title = title;
          this.circleStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: this.radius,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0,100,240,0.9)',
                    width: 1
                })
            })
        });
        this.geoJson = layerHandler.constructGeoJson();
        this.geoJson.getSource().addFeature(new ol.Feature(new ol.geom.Point(this.pointCoord)));
        this.geoJson.setStyle(this.circleStyle);
        this.geoJson.set('title',this.title);
        return this.geoJson;
      },
        renderDefaultJson: function(geoJsonCoord, type,title) {
            this.geoJsonCoord = geoJsonCoord;
            this.title = title;
            this.type = type;
            this.theGeom = null;
            switch (this.type) {
                case "LineString":
                    this.theGeom = new ol.geom.LineString(this.geoJsonCoord);
                    break;
                case "MultiLineString":
                    this.theGeom = new ol.geom.MultiLineString(this.geoJsonCoord);
                    break;
                case "MultiPoint":
                    this.theGeom = new ol.geom.MultiPoint(this.geoJsonCoord);
                    break;
                case "MultiPolygon":
                    this.theGeom = new ol.geom.MultiPolygon(this.geoJsonCoord);
                    break;
                case "Polygon":
                    this.theGeom = new ol.geom.Polygon(this.geoJsonCoord);
                    break;
                default:
                    console.log("you forgot to state correct geometry type");
            }
            this.geoJson = layerHandler.constructGeoJson();
            this.geoJson.getSource().addFeature(new ol.Feature(this.theGeom));
            this.geoJson.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'magenta',
                    width: 3
                })
            }));
            this.geoJson.set('title',this.title);
            return this.geoJson;
        }
    }
};
var mapInstance = layerHandler.loadMap();
mapInstance.addLayer(layerHandler.constructWms("topp","states","US polygons"));
mapInstance.addLayer(layerHandler.geometryHandler.renderPoint([5e6, 7e6] , 5 , "borhat's house!!"));
mapInstance.addLayer(layerHandler.geometryHandler.renderCircle([5e6, 7e6] , 50 , "random purpose circle"));

var aMlString = [
                [[-1e6, -7.5e5], [-1e6, 7.5e5]],
                [[1e6, -7.5e5], [1e6, 7.5e5]],
                [[-7.5e5, -1e6], [7.5e5, -1e6]],
                [[-7.5e5, 1e6], [7.5e5, 1e6]]
              ];
mapInstance.addLayer(layerHandler.geometryHandler.renderDefaultJson(aMlString, "MultiLineString","a multilinestring"));
for (i=0;i<5;i++){
  if(mapInstance.getLayers().getArray()[i].getProperties().title == 'random purpose circle'){
    mapInstance.getLayers().removeAt(i);
    break;
  }
};

