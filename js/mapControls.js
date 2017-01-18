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
    addSearchBox: function() {
        mapControls.addCustomHtmlMarkup('<div>' +
      '<input placeholder="Search..." type="text">'+
      '<i class="fi-magnifying-glass" id="searchButton"></i>'+
      '<i class="fi-list" id="menuButton"></i>'+
      '<i class="fi-compass" id="routingButton"></i>'+
            '</div>', "searchBox");
    },
    addZoomToExtent: function(){
		this.zoomExtent = new ol.control.ZoomToExtent({extent:[3068793.811593,4289340.279251,3155626.275725,4359050.849047]});
		mapInstance.addControl(this.zoomExtent);
    },
    addUserMenuReveal: function(){
    	mapControls.addCustomHtmlMarkup('<div><a id="umenuButton"class="button tiny">User Menu</a></div>','userMenuButton');
    },
    addInfoPanel: function(){
    	mapControls.addCustomHtmlMarkup('<div><div id="infoBoard"></div></div>','infoPanel');
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
			$(".ol-zoom").css({"bottom":10,"right":10});
			$("#searchBox").css({"top":10,"left":5,"width": $(window).width()-10,"height":54});
			$(".ol-zoom-extent").css({"top":parseInt($(".ol-zoom").css("top"))-40,"left":parseInt($(".ol-zoom").css("left"))});
			$('#userMenuButton').css({"top":parseInt($(".ol-zoom").css("top"))-85,"right":10,"height":parseInt($(".ol-control button").css("height"))});
			$('#infoPanel').css({"top":parseInt($("#searchBox").css("top"))+60,"left":parseInt($("#searchBox").css("left"))});
			if($("#mobile").length==0){
			$('#userMenuButton').append('<button id="mobile">U</button>');
			$('#umenuButton').remove();
			}
		}
		else{
			$(".ol-zoom").css({"bottom":10,"right":10});
			$("#searchBox").css({"top":20,"left":10 , "width": 350,"height":56});
			$(".ol-zoom-extent").css({"top":parseInt($(".ol-zoom").css("top"))-40,"left":parseInt($(".ol-zoom").css("left"))});
			$('#userMenuButton').css({"top":30,"right":10,"height":40});
			$('#infoPanel').css({"top":parseInt($("#searchBox").css("top"))+60,"left":parseInt($("#searchBox").css("left"))});
			console.log($("#umenuButton").length);
			if($("#umenuButton").length==0){
			$("#userMenuButton").append('<a id="umenuButton"class="button tiny">User Menu</a>');
			$("#mobile").remove();
		}
		}
	},
	controlRearrange:function(){
		$(window).on('resize', function() {
			mapControls.controlSetup();
		});
	}
};
//mellontika me ti xrisi tis require ola auta ta invokes tha ginontai sto app.js
//mapControls.addScaleLine();
//mapControls.addMousePosition();
mapControls.addSearchBox();
mapControls.addZoomToExtent();
mapControls.addUserMenuReveal();
mapControls.addInfoPanel();
mapControls.controlSetup();
mapControls.controlRearrange();
//Ta 2 pragmata pou apaitountai gia na emfanistei html markup sto ol-overlaycontainer-stopevent einai:
//1. na einai mesa se div pou exei class ol-unselectable ol-control
//2. na orisoume ti thesi tous sto viewport me css
// $(".ol-overlaycontainer-stopevent").append('<div class="ol-unselectable ol-control searchBox" id ="searchBox">'+
//    '<input class="search-input" type="text">'+
// '</div>');
// $(".searchBox").css({"top":80,
// 					 "left":30});
$('#searchButton').on('click',function(){
	console.log("Just clicked search!!!!");
});
$('#menuButton').on('click',function(){
	//console.log("Just clicked menu!!!!");
	$(".left-off-canvas-toggle").trigger('click');
});
$('#userMenuButton').on('click',function(){
	//console.log("Just clicked menu!!!!");
	$(".right-off-canvas-toggle").trigger('click');
});
$('#routingButton').on('click',function(){
	console.log("Just clicked routing!!!!");
});
$("#infoBoard").on('click',function(){
    console.log('we have a click in info panel!!!');
    $("#infoBoard").html('--------');
});