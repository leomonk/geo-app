var mapControls = {
	addScaleLine: function(){
		this.scaleLine = new ol.control.ScaleLine();
		mapInstance.addControl(this.scaleLine);
	},
	addMousePosition: function(){
		this.mousePosition = new ol.control.MousePosition({
  		coordinateFormat: ol.coordinate.createStringXY(4),
  		projection: 'EPSG:3857',
  		undefinedHTML: '&nbsp'
		});
		mapInstance.addControl(this.mousePosition);
	},
	defineProjection:function(epsgCode,proj4fefString){
		this.epsgCode = epsgCode;
		this.proj4fefString = proj4fefString;
		
	},
	addCustomHtmlMarkup:function(htmlMarkup,htmlId){
		this.htmlMarkup = htmlMarkup;
		this.htmlId = htmlId; 
		//console.log(this.htmlMarkup);
		for (i=0;i<this.htmlMarkup.length;i++){
			if(this.htmlMarkup[i]=='>'){
				this.htmlMarkup =' '+this.htmlMarkup.slice(0,i)+' class="ol-unselectable ol-control"'+' id=\"'+this.htmlId+'\"'+this.htmlMarkup.slice(i);
				break;
			};
		};
		//console.log(this.htmlMarkup);
		$(".ol-overlaycontainer-stopevent").append(this.htmlMarkup);
	},
	controlSetup:function(){
		if (app.isMobile){
			$(".ol-zoom").css({"top":$(window).height()-80,"left":$(window).width()-50});
			$("#searchBox").css({"top":10,"left":5,"width": $(window).width()-10});
		}
		else{
			$(".ol-zoom").css({"top":$(window).height()-65,"left":$(window).width()-40});
			$("#searchBox").css({"top":20,"left":10 , "width": 350});
		}
	}
};
mapControls.addScaleLine();
mapControls.addMousePosition();
mapControls.addCustomHtmlMarkup('<div>'+
  '<input type="text">'+
 '</div>',"searchBox");
//Ta 2 pragmata pou apaitountai gia na emfanistei html markup sto ol-overlaycontainer-stopevent einai:
//1. na einai mesa se div pou exei class ol-unselectable ol-control
//2. na orisoume ti thesi tous sto viewport me css
// $(".ol-overlaycontainer-stopevent").append('<div class="ol-unselectable ol-control searchBox" id ="searchBox">'+
//    '<input class="search-input" type="text">'+
// '</div>');
// $(".searchBox").css({"top":80,
// 					 "left":30});