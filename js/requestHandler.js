requestHandler = {
	    makeAjaxRequest: function(url, type) {
        this.viewResolution = (mapInstance.getView().getResolution());
        this.url = url;
        this.type = type;
        if (url) {
            $.ajax({
                url: this.url,
                type: this.type
            }).done(function(data) {
                if (console && console.log) {
                    console.log("Request success!!!");
                    console.log(data );
                }
            }).fail(function(msg) {
                console.log("Request fail" + msg);
            });
        }
    }
};
requestHandler.makeAjaxRequest("http://localhost:8080/geoserver/wms?bbox=-130,24,-66,50&styles=population&format=jpeg&info_format=application/json&request=GetFeatureInfo&layers=topp:states&query_layers=topp:states&width=550&height=250&x=170&y=160","GET");
requestHandler.makeAjaxRequest("http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=topp:states","GET");
requestHandler.makeAjaxRequest("http://localhost:8080/geoserver/wfs?request=GetFeature&version=1.1.0&typeName=topp:states,tiger:tiger_roads&outputFormat=application/json&FILTER=(%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%3E%3CFeatureId%20fid=%22states.3%22/%3E%3C/Filter%3E)(%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%3E%3CFeatureId%20fid=%22tiger_roads.3%22/%3E%3C/Filter%3E)","GET");