function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 3000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.page', true);
  setVisible('#loading', false);
});



$( document ).ready(function() {

	// bjqs slider
  $('#banner-slide').bjqs({
    animtype      : 'slide',
    height        : 243,
    width         : 437,
    responsive    : true,
    randomstart   : false,

	animtype        : 'fade',
	animduration    : 350,      // length of transition
	animspeed       : 10000,     // delay between transitions
	automatic       : true,     // enable/disable automatic slide rotation

	// control and marker configuration
	showcontrols    : true,     // enable/disable next + previous UI elements
	centercontrols  : true,     // vertically center controls
	nexttext        : 'Prev',   // text/html inside next UI element
	prevtext        : 'Next',   // text/html inside previous UI element
	showmarkers     : true,     // enable/disable individual slide UI markers
	centermarkers   : true,     // horizontally center markers
	});
	
	
	$("#accordion").accordion({ header: "h4", collapsible: true, active: false, heightStyle: 'panel' });
	$("#accordion-2").accordion({ header: "h4", collapsible: true, active: false, heightStyle: 'panel' });
	$( "#tabs" ).tabs();
	$("#tabs").tabs({ active: 2});
	$("#accordion-2").accordion({ active: 1});
    $( "#check" ).button();
    $( "#format" ).buttonset();
	$( "#tooltip" ).tooltip();

	
  $( "#slider" ).slider({
  	change: function(event, ui) {showZoning(ui.value);} ,
	   orientation: "horizontal",
	   value: 25,
	   step:25,
	   min: 25,
       max: 75,
	   slide: function( event, ui ){
		$( "#minval" ).val( ui.value );
	   }	
	});
	$( "#minval" ).val( $( "#slider" ).slider( "value" ) );
	
	map.addControl(drawControl);	

	/////////////////////////////////////////////////////////////////////////////
	
	var ckb1 = 0;
	var ckb2 = 0;
	var ckb3 = 0;
	
	
	$(".checkbox1").Sswitch({
		onSwitchChange: function() {

		 if($("#checkbox1").is(':checked') && ckb1 == 0){
			activateES = 1;
			showEngineered();
			$("#tabs").tabs({ active: 2});$("#accordion").accordion({ active: 0});
			if($("#checkbox2").is(':checked') && ckb2 == 1){ $('.checkbox2').trigger('click');}
			if($("#checkbox3").is(':checked') && ckb3 == 1){ $('.checkbox3').trigger('click');}
			ckb1 = 1;
		 }
		 
		 else{
			hideEngineered();
			if ($( "#accordion" ).accordion( "option", "active" ) == 0){
				$("#tabs").tabs({ active: 2});$("#accordion").accordion({ active: 4});
			}		
			ckb1 = 0;				
		 }	 
		}
	});		
	
	$(".checkbox2").Sswitch({
		onSwitchChange: function() {	
			
		 if($("#checkbox2").is(':checked') && ckb2 == 0){
			activateFS = 1;
			showFinancial(); 
			$("#tabs").tabs({ active: 2});$("#accordion").accordion({ active: 1});
			if($("#checkbox1").is(':checked') && ckb1 == 1){ $('.checkbox1').trigger('click');}
			if($("#checkbox3").is(':checked') && ckb3 == 1){ $('.checkbox3').trigger('click');}
			ckb2 = 1;
		 }
		
		 else{
			hideFinancial(); 
			if ($( "#accordion" ).accordion( "option", "active" ) == 1){
				$("#tabs").tabs({ active: 2});$("#accordion").accordion({ active: 4});
			}		
			ckb2 = 0;				
		 }	 
		}
	});	

	
	$(".checkbox3").Sswitch({
		onSwitchChange: function() {
	
		 if($("#checkbox3").is(':checked') && ckb3 == 0){
			activateLRS = 1;
			showLegalRegulatory(); 
			$("#tabs").tabs({ active: 2});$("#accordion").accordion({ active: 2});
			if($("#checkbox1").is(':checked') && ckb1 == 1){ $('.checkbox1').trigger('click');}
			if($("#checkbox2").is(':checked') && ckb2 == 1){ $('.checkbox2').trigger('click');}
			ckb3 = 1;
		 }

		 else{
			hideLegalRegulatory(); 
			if ($( "#accordion" ).accordion( "option", "active" ) == 2){
				$("#tabs").tabs({ active: 2});$("#accordion").accordion({ active: 4});
			}		
			ckb3 = 0;	
		 }	 
		}
	});	

});
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
/////////////////
// FUNCTIONS
/////////////////

// add commas to numbers > 1000
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}	

// round to two hundredths
function roundToTwo(value) {
	return(Math.round(value * 100) / 100);
}


// draw bar chart
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawBarChart);


function drawBarChart(buildBar, arr1, arr2, arr3, arr4, arr5) {
var data = google.visualization.arrayToDataTable([
['Variable Rank', '1', '2', '3', '4', '5'],
['GMPH',  arr1[3]/4, arr2[3]/4, arr3[3]/4, arr4[3]/4, arr5[3]/4],
['ELEV',   arr1[1]/4, arr2[1]/4, arr3[1]/4, arr4[1]/4, arr5[1]/4],
['HABS',  arr1[5]/4, arr2[5]/4, arr3[5]/4, arr4[5]/4, arr5[5]/4],
['RSLR',  arr1[4]/4, arr2[4]/4, arr3[4]/4, arr4[4]/4, arr5[4]/4],
['WAVE',   arr1[0]/4, arr2[0]/4, arr3[0]/4, arr4[0]/4, arr5[0]/4],
['SRGE',  arr1[2]/4, arr2[2]/4, arr3[2]/4, arr4[2]/4, arr5[2]/4],
]);

var options = {
title: 'Hazard Index: exposure ranks low (1) to high (5)',
colors: ['#d3d3d3', '#d3d3d3', '#FFCC00', '#de2d26', '#C00000'],
is3D:true,
isStacked: true,
// add bold
};


var chart = new google.visualization.BarChart(buildBar);
chart.draw(data, options);

}


// Leaflet popup
function popup(lat, lon, type){
	//map.setZoom(10);	
	
	var popup = L.popup()
	.setLatLng([lat, lon])
	.setContent('your selection')
	.openOn(map);
} 	

	
	
// intersect Leaflet draw and write table
function updateLayer(query, layer){
	// switch to last tab
	$("#tabs").tabs({ active: 1}); 
	
	//var ck_CH = document.getElementById('radio-x');
	//var ck_NH = document.getElementById('radio-x');	
	
	var ck_SLR2 = document.getElementById('radio-3b');
	
	// run a query to select portions of a layer
	var sql = cartodb.SQL({ user: 'ehartge' });

	sql.execute("SELECT * FROM ("+query+") a").done(function(data) {
	var arr1 = [4, 4, 4, 4, 4, 4];
	var arr2 = [4, 4, 4, 4, 4, 4];
	var arr3 = [4, 4, 4, 4, 4, 4];
	var arr4 = [4, 4, 4, 4, 4, 4];
	var arr5 = [4, 4, 4, 4, 4, 4];
	var cvi_ch = [];
	var cvi_nh = [];
	
	for (var i = 0; i < data.total_rows; i++) {
		
		switch(data.rows[i].geomorph) {
			case (3):
				arr3[3] = arr3[3] + 1;
				break;
			case (4):
				arr4[3] = arr4[3] + 1;
				break;
			case (5):
				arr5[3] = arr5[3] + 1;
				break;
			case (2):
				arr2[3] = arr2[3] + 1;
				break;
			case (1):
				arr1[3] = arr1[3] + 1;
				break;
		}			
		
		switch(data.rows[i].relief) {
			case (3):
				arr3[1] = arr3[1] + 1;
				break;
			case (4):
				arr4[1] = arr4[1] + 1;
				break;
			case (5):
				arr5[1] = arr5[1] + 1;
				break;
			case (2):
				arr2[1] = arr2[1] + 1;
				break;
			case (1):
				arr1[1] = arr1[1] + 1;
				break;
		}
		
		// habs
		if ($( "#CVI option:selected" ).text() == 'with'){
				if (data.rows[i].hab_rank == 5){
					arr5[5] = arr5[5] + 1;
				}
				else if (data.rows[i].hab_rank >= 4){
					arr4[5] = arr4[5] + 1;					
				}
				else if (data.rows[i].hab_rank >= 3){
					arr3[5] = arr3[5] + 1;					
				}
				else if (data.rows[i].hab_rank >= 2){
					arr2[5] = arr2[5] + 1;					
				}
				else {arr2[5] = arr2[5] + 1;}
		}
		else {
			arr5[5] = arr5[5] + 1;
		}		
	
		// SLR
		if (ck_SLR2.checked){
			switch(data.rows[i].slr_yes) {
			case (4):
				arr4[4] = arr4[4] + 1;
				break;
			case (3):
				arr3[4] = arr3[4] + 1;
				break;
			case (2):
				arr2[4] = arr2[4] + 1;
				break;
			case (1):
				arr1[4] = arr1[4] + 1;
				break;
			}
		}
		else {arr1[4] = arr1[4] + 1;}
	
	
		switch(data.rows[i].wave_expo) {
			case (3):
				arr3[0] = arr3[0] + 1;
				break;
			case (4):
				arr4[0] = arr4[0] + 1;
				break;
			case (5):
				arr5[0] = arr5[0] + 1;
				break;
			case (2):
				arr2[0] = arr2[0] + 1;
				break;
			case (1):
				arr1[0] = arr1[0] + 1;
				break;
		}

		switch(data.rows[i].surge_pote) {
			case (3):
				arr3[2] = arr3[2] + 1;
				break;
			case (4):
				arr4[2] = arr4[2] + 1;
				break;
			case (5):
				arr5[2] = arr5[2] + 1;
				break;
			case (2):
				arr2[2] = arr2[2] + 1;
				break;
			case (1):
				arr1[2] = arr1[2] + 1;
				break;
		}
	}

	drawBarChart(document.getElementById('chartBar_div'), arr1, arr2, arr3, arr4, arr5);
	
	});
	
}


// basemaps
var ESRIImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, and UPR-EGP'
});
var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMaps</a>'});
var MapboxStreets = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.afb8c76d/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
var MapboxTerrain = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.e4qjes5f/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
var ESRIOcean = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, GEBCO, NOAA, and DeLorme'
});
var CartoDark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		});

// map settings
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw';

	
// set base map and controls
var map = new L.Map('map', {
  zoomControl: false,
  layer_selector: true,
  layers: [CartoDark],
  center: [37.75, -122],
  zoom: 8,
  minZoom: 6,
  maxZoom: 16
});


var southWest = L.latLng(28, -140),
northEast = L.latLng(45, -95);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});


// scroll wheel
//map.scrollWheelZoom.disable();

// draw control (Leaflet)
L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a polygon';
	var drawControl = new L.Control.Draw({
		position: 'topright',
		draw: {
			polyline: false,
			polygon:false,
			rectangle: {
            shapeOptions: {
				color: '#d3d3d3',
                clickable: false,
				opacity: 0.25,
				fillOpacity: 0.05,
				fillColor: '#fff',
				dashArray: '20,15',
                lineJoin: 'round',
            }
        },
			circle: false,
			marker: false
		}
	});
	
	
// map.attributionControl.setPrefix('<center>Map viewer by: <a href="mailto:gverutes@gmail.com" target="_top">G. Verutes</a></center>');
	
// add basemap and overlays
var baseMaps = {
	"<b>imagery</b>": ESRIImagery,
	"<b>dark</b>": CartoDark,
	"<b>elevation</b>": ESRIOcean,
	"<b>terrain</b>": MapboxTerrain,	
};


// intersect CV_250m with LeafletDraw
cartodb.createLayer(map, 'https://ehartge.carto.com/api/v2/viz/d710d8e2-860a-4f1c-8f3b-31624fa24eea/viz.json')
	.on('done', function(layer) {
	layer.setZIndex(13);	
	// keep track of all draw objects
	var drawnItems = new L.FeatureGroup();
	
	// add drawn layer to map
	map.addLayer(drawnItems);

	// set the title to show on the polygon button
	map.on('draw:created', function (e) {
	var type = e.layerType,
	draw_layer = e.layer;

	// show the polygon on the map
	drawnItems.addLayer(draw_layer);

	// get the coordinates of the polygon we just drew
	var poly = draw_layer.getLatLngs();
	var sql_poly = [];
	for (i in poly){
		sql_poly.push("CDB_LatLng("+poly[i].lat+","+poly[i].lng+")")
		}
		// SQL polygon must be a CLOSED loop
		sql_poly.push("CDB_LatLng("+poly[0].lat+","+poly[0].lng+")")

		// join drawn coordinates and a SQL query
		var query = "SELECT * FROM cv_250m_line WHERE ST_Intersects(the_geom, ST_MakePolygon(ST_MakeLine(Array["+sql_poly.join()+"])))";
		
		// run function to update SQL and Style
		updateLayer(query, layer.getSubLayer(0))
	});
})
        .on('error', function(err) {
          alert("some error occurred: " + err);
        });
	

// grab Mapbox tiles
var placeholder = L.mapbox.tileLayer('geointerest.CA_Zoning')
var pop = L.mapbox.tileLayer('geointerest.UAE_Population');
var polyPAs = L.mapbox.tileLayer('geointerest.UAE_PAs');

// add CartoDB viz.json
var layerUrlCV = 'https://ehartge.carto.com/api/v2/viz/d710d8e2-860a-4f1c-8f3b-31624fa24eea/viz.json';
var zoning_south = 'https://ehartge.carto.com/api/v2/viz/ae103c5c-7ae7-45d9-8022-49abed03ed20/viz.json'; 
var zoning_north = 'https://ehartge.carto.com/api/v2/viz/2bfd8b8e-fd7f-47f4-aa9b-86933d3a06b9/viz.json'; 
var linkages = 'https://ehartge.carto.com/api/v2/viz/65cacc6c-dc24-4c40-8c6b-c30b460d4a98/viz.json'; 	
var habitats = 'https://ehartge.carto.com/api/v2/viz/e440c64e-1658-11e7-a540-0e3ebc282e83/viz.json'; 
var countiesBndry = 'https://ehartge.carto.com/api/v2/viz/12909494-ba4b-11e6-b3a1-0e3ff518bd15/viz.json';
var layerPop = 'https://ehartge.carto.com/api/v2/viz/ebe864fa-434c-42c4-a503-608df043da39/viz.json';


// set base style of grid
function style(feature) {
  return {
	weight: 1,
	fillOpacity: .2,
	fillColor: '#ffff99',
	color:'#de2d26' 
  };
}

// set hover colors
function highlightFeature(e) {
	var layer = e.target;
	layer.setStyle({
		weight: 9,
		opacity: 0.45,
		color: '#9ecae1', 
		dashArray: '3',
		fillOpacity: 0.2,
		fillColor: '#fff'
	});
}

// a function to reset the colors when a neighborhood is not longer 'hovered'
function resetHighlight(e) {
	geojson.resetStyle(e.target);
}

// tell what functions to call when mousing over and out of a neighborhood
// add vector data to map
geojson = L.geoJson(grid, {
	style: style,
	onEachFeature: function (feature, layer) {
	layer.on({
	mouseover: highlightFeature,
	mouseout: resetHighlight
	});

		layer.bindPopup("<center><b>California Coastal Records Project</b><a href=\'http://www.californiacoastline.org/cgi-bin/location.cgi?latdeg="+feature.properties.LAT+"&longdeg="+feature.properties.LONG+"&mode=sequential\' target=\'_blank\'><br>SHOW AERIAL PHOTO</a><br><br><i>"+feature.properties.NAME10+" County</i></center>");
	  }
	});


	
function openMarkerPopup(id){
	geojson.eachLayer(function(feature){
		if(feature.feature.properties.id==id){
			feature.openPopup();
		}
	});
}    
map.closePopup();




// add cartoDB layer and set z-index so it shows up on top
	cartodb.createLayer(map, habitats)
	.on('done', function(layer) {
		layer.setZIndex(9);
		pop.setZIndex(13)
		var overlayMaps = {
		"habitats": layer.addTo(map),
		"photos": geojson,
		"population": pop,
		"zoning": polyPAs,
		//"coastal zone": placeholder,
		};
		L.control.layers(baseMaps, overlayMaps, {position: 'topleft', collapsed: false}).addTo(map);
	});

// mini map
var MapboxStreets = 'http://a.tiles.mapbox.com/v3/mapbox.world-light/{z}/{x}/{y}.png';
var mb = new L.TileLayer(MapboxStreets, {minZoom: 2, maxZoom: 16});
var miniMap = new L.Control.MiniMap(mb, { toggleDisplay: true, height: '250', width: '150'}).addTo(map); 

// zoom control
L.control.zoom({ position: 'topright' }).addTo(map);

// scale
L.control.scale({ position: 'topleft' }).addTo(map);

// county and state boundaries
cartodb.createLayer(map, 'https://ehartge.carto.com/api/v2/viz/12909494-ba4b-11e6-b3a1-0e3ff518bd15/viz.json')
		.addTo(map)
        .on('done', function(layer) {
		layer.setZIndex(20);	
});



///////////////////////////////////////////////////////////////////////////////////////////////////	


function handleClick(cb) {
	var textbox = document.getElementById('minval').value
	showZoning(textbox);
}

map.on('overlayadd', onOverlayAdd);

function onOverlayAdd(e){
    if (e.name == 'photos'){$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 0});}
	else if (e.name == 'habitats'){$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 1});}
	else if (e.name == 'population'){
		$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 2});
		showPop();
	}
	else if (e.name == 'zoning'){
		$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 3});
		//var chk = document.getElementsByName('zoning[]')
		document.getElementById(1).checked = true;
		var textbox = document.getElementById('minval').value
		showZoning(textbox);
	}
}

map.on('overlayremove', onOverlayRemove);

function onOverlayRemove(e){
	
	// add logic to check if other accordions are active
	
	if (e.name == 'photos'){$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 4});}
	else if (e.name == 'habitats'){$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 4});}
	else if (e.name == 'population'){
		$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 4});
		clearPop();
	}
	else if (e.name == 'zoning'){
		$("#tabs").tabs({ active: 3});$("#accordion-2").accordion({ active: 4});
		//$("#slider").slider('value',25);
		//var textbox = document.getElementById('minval');
		//textbox.value = 25;
		clearZoning();
		


		// find list of checked boxes
		var chk = document.getElementsByName('zoning[]')
		var len = chk.length
		// push text to list
		for(i=0;i<len;i++){
			if(chk[i].checked){
				document.getElementById(i+1).checked = false;
			}
		}
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var sql = cartodb.SQL({ user: 'ehartge' });

// map zoom
var endCounty = 0;  
var sublayersCounty = [];

$("#scale").change(function(event){

	if ($( "#scale option:selected" ).text() == 'Del Norte'){
		map.setView([41.73, -123.9], 10);
		showMapTable(1, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'Humboldt'){
		map.setView([40.7, -124], 10);
		showMapTable(2, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'Mendocino'){
		map.setView([39.37, -123.6], 9);
		showMapTable(3, $( "#scale option:selected" ).text(), 9);
	}
	else if ($( "#scale option:selected" ).text() == 'Sonoma'){
		map.setView([38.55, -123.1], 10);
		showMapTable(4, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'Marin'){
		map.setView([38.05, -122.7], 10);
		showMapTable(5, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'San Francisco'){
		map.setView([37.77, -122.45], 12);
		showMapTable(6, $( "#scale option:selected" ).text(), 12);
	}
	else if ($( "#scale option:selected" ).text() == 'San Mateo'){
		map.setView([37.385, -122.35], 10);
		showMapTable(7, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'Santa Cruz'){
		map.setView([36.95, -121.8], 10);
		showMapTable(8, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'Monterey'){
		map.setView([36.3, -121.4], 9);
		showMapTable(9, $( "#scale option:selected" ).text(), 9);
	}
	else if ($( "#scale option:selected" ).text() == 'San Luis Obispo'){
		map.setView([35.4, -120.7], 9);
		showMapTable(10, $( "#scale option:selected" ).text(), 9);
	}
	else if ($( "#scale option:selected" ).text() == 'Santa Barbara'){
		map.setView([34.41, -119.9], 9);
		showMapTable(11, $( "#scale option:selected" ).text(), 9);
	}
	else if ($( "#scale option:selected" ).text() == 'Ventura'){
		map.setView([34.12, -119.0], 10);
		showMapTable(12, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'Los Angeles'){
		map.setView([34, -118.3], 10);
		showMapTable(13, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'Orange'){
		map.setView([33.5, -117.8], 10);
		showMapTable(14, $( "#scale option:selected" ).text(), 10);
	}
	else if ($( "#scale option:selected" ).text() == 'San Diego'){
		map.setView([32.95, -117.0], 9);
		showMapTable(15, $( "#scale option:selected" ).text(), 9);
	}
	else{map.setView([37.5, -120], 6);
		showMapTable(16, $( "#scale option:selected" ).text(), 6);
	}
		
		

	var MapQueryCounty = "SELECT * FROM ca_counties_wgs84_geo WHERE name10 = '"+$( "#scale option:selected" ).text()+"'";


	sql.execute(MapQueryCounty).done(function(data){
			
	// remove previous
	if (endCounty > 0){sublayersCounty[endCounty-1].remove();}
	endCounty = endCounty + 1;
	
	var CartoCSSCounty = "#ca_counties_wgs84_geo{polygon-opacity:0.15;polygon-fill:#3182bd;line-opacity:1;line-color:#000;line-width:3.75;#ca_counties_wgs84_geo::labels[zoom>7]{text-name: [namelsad10];text-face-name: 'DejaVu Sans Book';text-size: 16;text-spacing: 10;text-fill: #fff;text-halo-fill: rgba(0,0,0,1);text-halo-radius: 4;text-allow-overlap: true;text-transform: uppercase;text-placement: point;text-placement-type: simple;}[zoom < 9]{line-width:2}}";
	
	  cartodb.createLayer(map, countiesBndry)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryCounty,
		  cartocss: CartoCSSCounty,
		}
		var sublayer = layer.getSubLayer(0);
		layer.setZIndex(5);	
		sublayer.set(subLayerOptions);
		sublayersCounty.push(sublayer);
	  }).on('error', function() {
		// log the error
	  });
	})
		
		
		
});	
	

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
// POPULATION
/////////////////////////////////////////////////////////////////////
	
var endPop = 0;  
var sublayersPop = [];

function clearPop(){

	if (endPop > 0){sublayersPop[endPop-1].remove();}
	endPop = endPop + 1;
	
	var MapQueryPop = "SELECT * FROM tot_pop_3class_geo WHERE cartodb_id = 1";
		
	var CartoCSSPop = "#tot_pop_3class_geo{polygon-fill: #FFFFFF;polygon-opacity: 0;line-color: #FFF;line-width: 0;line-opacity: 0;}}";
	
	  cartodb.createLayer(map, layerPop)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryPop,
		  cartocss: CartoCSSPop,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersPop.push(sublayer);
		layer.setZIndex(20);
	  }).on('error', function() {
		// log the error
	  });

}

	
function showPop(){

	if (endPop > 0){sublayersPop[endPop-1].remove();}
	endPop = endPop + 1;
	
	var MapQueryPop = "SELECT * FROM tot_pop_3class_geo";
		
	var CartoCSSPop = "#tot_pop_3class_geo{polygon-fill: #FFFFFF;polygon-opacity: 0.4;line-color: #FFF;line-width: 0;line-opacity: 0;}#tot_pop_3class_geo[gridcode = 2]{polygon-fill: #D3D3D3; polygon-opacity: 0.4;}#tot_pop_3class_geo[gridcode = 3]{polygon-fill: #636363; polygon-opacity: 0.4;}";
	
	  cartodb.createLayer(map, layerPop)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryPop,
		  cartocss: CartoCSSPop,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersPop.push(sublayer);
		layer.setZIndex(20);
	  }).on('error', function() {
		// log the error
	  });

}	
	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////	

/////////////////////////////////////////////////////////////////////
// ZONING
/////////////////////////////////////////////////////////////////////

var startZoning = 0;  
var countZoning = 0;  
var sublayersZoning = [];

function clearZoning(){

	if (countZoning > 0){sublayersZoning[countZoning-1].remove();sublayersZoning[countZoning-2].remove();}
	countZoning = countZoning + 2;
	

	var MapQueryZoningNC = "SELECT * FROM zoning_north WHERE cartodb_id = 6";
	var CartoCSSZoningNC = "#zoning_north{polygon-fill: #FFFFFF;polygon-opacity: 0;line-color: #FFF;line-width: 0;line-opacity: 0;}}";
	
	  cartodb.createLayer(map, zoning_north)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryZoningNC,
		  cartocss: CartoCSSZoningNC,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersZoning.push(sublayer);
		layer.setZIndex(15);
	  }).on('error', function() {
		// log the error
	  });
	  
	
	var MapQueryZoningSC = "SELECT * FROM zoning_south WHERE cartodb_id = 6";
	var CartoCSSZoningSC = "#zoning_south{polygon-fill: #FFFFFF;polygon-opacity: 0;line-color: #FFF;line-width: 0;line-opacity: 0;}}";
	
	  cartodb.createLayer(map, zoning_south)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryZoningNC,
		  cartocss: CartoCSSZoningNC,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersZoning.push(sublayer);
		layer.setZIndex(15);
	  }).on('error', function() {
		// log the error
	  });	  
	  

}



function showZoning(transp){
			
		if (countZoning > 0){
			sublayersZoning[countZoning-1].remove();sublayersZoning[countZoning-2].remove();
		}
	
	
		// find list of checked boxes
		var checkedZoningList = [];	
		var chk = document.getElementsByName('zoning[]')
		var len = chk.length

		// push text to list
		for(i=0;i<len;i++){
			if(chk[i].checked){
				checkedZoningList.push(i+1);
				// removed duplicate
			}
		}
		
////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		var MapQueryZoningSouth = "SELECT * FROM zoning_south";	
		var MapQueryZoningNorth = "SELECT * FROM zoning_north";	

		
		if (checkedZoningList.length > 0){

			MapQueryZoningSouth = MapQueryZoningSouth + " WHERE zone_id = "+checkedZoningList[0];
			for(i=1;i<checkedZoningList.length;i++){
				MapQueryZoningSouth = MapQueryZoningSouth + " OR zone_id = "+checkedZoningList[i];
			}
			
			MapQueryZoningNorth = MapQueryZoningNorth + " WHERE zone_id = "+checkedZoningList[0];
			for(i=1;i<checkedZoningList.length;i++){
				MapQueryZoningNorth = MapQueryZoningNorth + " OR zone_id = "+checkedZoningList[i];
			}			
		}
		
		else {clearZoning();}
		

		countZoning = countZoning + 2;
		
		var CartoCSSZoningSouth = "#zoning_south{polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width:0;line-opacity:0;}#zoning_south[zone_id=1] {polygon-fill: #D2691E;polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width: 0.5;line-opacity: 0;polygon-pattern-file:url(http://com.cartodb.users-assets.production.s3.amazonaws.com/patterns/dots_2px_fast.png);polygon-pattern-opacity: 0.25;}#zoning_south[zone_id=4] {polygon-fill: #c51b8a;}#zoning_south[zone_id=2] {polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width: 0.5;line-opacity: 0;polygon-fill: #006400;polygon-opacity: "+transp/100.0+";polygon-pattern-file: url(http://com.cartodb.users-assets.production.s3.amazonaws.com/patterns/dots_2px_fast.png);polygon-pattern-opacity: 0.25;}#zoning_south[zone_id=3] {polygon-fill: #253494;}#zoning_south[zone_id=5] {polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width: 0.5;line-opacity: 0;polygon-fill: #d3d3d3;polygon-opacity: "+transp/100.0+";polygon-pattern-file: url(http://com.cartodb.users-assets.production.s3.amazonaws.com/patterns/diagonal_1px_med.png);polygon-pattern-opacity: "+transp/100.0+";}#";
		
		  cartodb.createLayer(map, zoning_south)
		  .addTo(map)
		  .on('done', function(layer) {
			// change the query for the first layer
			var subLayerOptions = {
			  sql: MapQueryZoningSouth,
			  cartocss: CartoCSSZoningSouth,
			}
			var sublayer = layer.getSubLayer(0);
			sublayer.set(subLayerOptions);
			sublayersZoning.push(sublayer);
			layer.setZIndex(16);
		  }).on('error', function() {
			// log the error
		  });
			
////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
		
		var CartoCSSZoningNorth = "#zoning_north{polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width:0;line-opacity:0;}#zoning_north[zone_id=1] {polygon-fill: #D2691E;polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width: 0.5;line-opacity: 0;polygon-pattern-file:url(http://com.cartodb.users-assets.production.s3.amazonaws.com/patterns/dots_2px_fast.png);polygon-pattern-opacity: 0.25;}#zoning_north[zone_id=4] {polygon-fill: #c51b8a;}#zoning_north[zone_id=2] {polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width: 0.5;line-opacity: 0;polygon-fill: #006400;polygon-opacity: "+transp/100.0+";polygon-pattern-file: url(http://com.cartodb.users-assets.production.s3.amazonaws.com/patterns/dots_2px_fast.png);polygon-pattern-opacity: 0.25;}#zoning_north[zone_id=3] {polygon-fill: #253494;}#zoning_north[zone_id=5] {polygon-opacity: "+transp/100.0+";line-color: #FFF;line-width: 0.5;line-opacity: 0;polygon-fill: #d3d3d3;polygon-opacity: "+transp/100.0+";polygon-pattern-file: url(http://com.cartodb.users-assets.production.s3.amazonaws.com/patterns/diagonal_1px_med.png);polygon-pattern-opacity: "+transp/100.0+";}#";
		
		  cartodb.createLayer(map, zoning_north)
		  .addTo(map)
		  .on('done', function(layer) {
			// change the query for the first layer
			var subLayerOptions = {
			  sql: MapQueryZoningNorth,
			  cartocss: CartoCSSZoningNorth,
			}
			var sublayer = layer.getSubLayer(0);
			sublayer.set(subLayerOptions);
			sublayersZoning.push(sublayer);
			layer.setZIndex(16);
		  }).on('error', function() {
			// log the error
		  });
			
		
	
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	
/////////////////////////////////////////////////////////////////////
// CVI
/////////////////////////////////////////////////////////////////////
	
var endCVI = 0;  
var sublayersCVI = [];

// CVI
function clearHazard(){

	if (endCVI > 0){sublayersCVI[endCVI-1].remove();}
	endCVI = endCVI + 1;
	
	var MapQueryCVI = "SELECT * FROM cv_250m_line";
		
	var CartoCSSCVI = "#cv_250m_line{line-color: #0080ff;line-width: 0;line-opacity: 0;}";
	document.getElementById("HazardLegend").innerHTML = "";	
	
	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryCVI,
		  cartocss: CartoCSSCVI,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersCVI.push(sublayer);
		layer.setZIndex(20);
	  }).on('error', function() {
		// log the error
	  });
	  
	  document.getElementById("chartBar_div").innerHTML = ''; // clear Drivers box
}


function showHazard(){

	//map.addControl(drawControl);	
	
	if (endCVI > 0){sublayersCVI[endCVI-1].remove();}
	
	var HTML1 = "";
	HTML1 = HTML1 + "<br><fieldset style='width:375px;'><legend><b>HAZARD INDEX</b></legend><i>Relative coastal exposure</i><br><img src='img/Legend_1.png'></fieldset>";	
	var HTML2 = "";
	HTML2 = HTML2 + "<br><fieldset style='width:375px;'><legend><b>HABITAT ROLE</b></legend><i>Coastal biodiversity</i><br><img src='img/Legend_2.png'></fieldset>";
	var HTML3a = "";
	HTML3a = HTML3a + "<br><fieldset style='width:375px;'><legend><b>HABITAT ROLE</b></legend><i>Marshes</i><br><img src='img/Legend_2.png'></fieldset>"; // add specific label
	var HTML3b = "";
	HTML3b = HTML3b + "<br><fieldset style='width:375px;'><legend><b>HABITAT ROLE</b></legend><i>Dunes</i><br><img src='img/Legend_2.png'></fieldset>"; // add specific label

	endCVI = endCVI + 1;
	
	var MapQueryCVI = "SELECT * FROM cv_250m_line";

	var ck_Scale1 = document.getElementById('radio-1a');
	var ck_SLR1 = document.getElementById('radio-3a');
	var ck_SLR2 = document.getElementById('radio-3b');
	var ck_Map1 = document.getElementById('radio-4a');
	var ck_Map2 = document.getElementById('radio-4b');

	var CartoCSSCVI = "#cv_250m_line{line-color: #000;line-width: 5;line-opacity: 1;line-join:round;line-cap: round;line-smooth:0.25;}[zoom=8]{line-width: 7;}[zoom=9]{line-width: 9;}[zoom=10]{line-width: 15.5;}[zoom=11]{line-width: 20;}[zoom=12]{line-width: 25;}[zoom=13]{line-width: 30;}[zoom=14]{line-width: 30;}[zoom=15]{line-width: 30;}[zoom=16]{line-width: 30;}";
	
	// SCALE STATE
	if (ck_Scale1.checked){
		// SLR NONE
		if (ck_SLR1.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [e_ch_s1_c1 <= 5] {line-color: #C00000;}#cv_250m_line [e_ch_s1_c1 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [e_ch_s1_c1 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [e_ch_s1_c1 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [e_ch_s1_c1 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [e_nh_s1_c1 <= 5] {line-color: #C00000;}#cv_250m_line [e_nh_s1_c1 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [ e_nh_s1_c1 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [e_nh_s1_c1 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [e_nh_s1_c1 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_all <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_all <= 0.3000]{line-color: #fe9929;}#cv_250m_line [hr_all <= 0.1679]{line-color: #fed98e;}#cv_250m_line [hr_all = 0]{line-color: #ffffd4;}";			
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'marsh'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_marsh <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_marsh <= 0.2348]{line-color: #fe9929;}#cv_250m_line [hr_marsh <= 0.1382]{line-color: #fed98e;}#cv_250m_line [hr_marsh = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'dune'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_dunes <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_dunes <= 0.2676]{line-color: #fe9929;}#cv_250m_line [hr_dunes <= 0.1091]{line-color: #fed98e;}#cv_250m_line [hr_dunes = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
			}
		}
			
		// SLR 2050
		else if (ck_SLR2.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ e_ch_s2_c1 <= 5] {line-color: #C00000;}#cv_250m_line [ e_ch_s2_c1 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [ e_ch_s2_c1 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [ e_ch_s2_c1 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [ e_ch_s2_c1 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ e_nh_s2_c1 <= 5] {line-color: #C00000;}#cv_250m_line [ e_nh_s2_c1 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [ e_nh_s2_c1 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [ e_nh_s2_c1 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [ e_nh_s2_c1 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_all <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_all <= 0.3000]{line-color: #fe9929;}#cv_250m_line [hr_all <= 0.1679]{line-color: #fed98e;}#cv_250m_line [hr_all = 0]{line-color: #ffffd4;}";			
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'marsh'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_marsh <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_marsh <= 0.2348]{line-color: #fe9929;}#cv_250m_line [hr_marsh <= 0.1382]{line-color: #fed98e;}#cv_250m_line [hr_marsh = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'dune'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_dunes <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_dunes <= 0.2676]{line-color: #fe9929;}#cv_250m_line [hr_dunes <= 0.1091]{line-color: #fed98e;}#cv_250m_line [hr_dunes = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
			}
		}

	}
	
	// SCALE COUNTY
	else{
		// SLR NONE
		if (ck_SLR1.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ e_ch_s1_c2 <= 5] {line-color: #C00000;}#cv_250m_line [ e_ch_s1_c2 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [ e_ch_s1_c2 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [ e_ch_s1_c2 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [ e_ch_s1_c2 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ e_nh_s1_c2 <= 5] {line-color: #C00000;}#cv_250m_line [ e_nh_s1_c2 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [ e_nh_s1_c2 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [ e_nh_s1_c2 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [ e_nh_s1_c2 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_all <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_all <= 0.3000]{line-color: #fe9929;}#cv_250m_line [hr_all <= 0.1679]{line-color: #fed98e;}#cv_250m_line [hr_all = 0]{line-color: #ffffd4;}";			
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'marsh'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_marsh <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_marsh <= 0.2348]{line-color: #fe9929;}#cv_250m_line [hr_marsh <= 0.1382]{line-color: #fed98e;}#cv_250m_line [hr_marsh = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'dune'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_dunes <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_dunes <= 0.2676]{line-color: #fe9929;}#cv_250m_line [hr_dunes <= 0.1091]{line-color: #fed98e;}#cv_250m_line [hr_dunes = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
			}
		}
			
		// SLR 2050
		else if (ck_SLR2.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ e_ch_s2_c2 <= 5] {line-color: #C00000;}#cv_250m_line [ e_ch_s2_c2 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [ e_ch_s2_c2 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [ e_ch_s2_c2 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [ e_ch_s2_c2 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ e_nh_s2_c2 <= 5] {line-color: #C00000;}#cv_250m_line [ e_nh_s2_c2 <= 3.1918] {line-color: #de2d26;}#cv_250m_line [ e_nh_s2_c2 <= 2.9135] {line-color: #FFCC00;}#cv_250m_line [ e_nh_s2_c2 <= 2.6426] {line-color: #ffff00;}#cv_250m_line [ e_nh_s2_c2 <= 2.3935] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_all <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_all <= 0.3000]{line-color: #fe9929;}#cv_250m_line [hr_all <= 0.1679]{line-color: #fed98e;}#cv_250m_line [hr_all = 0]{line-color: #ffffd4;}";			
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'marsh'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_marsh <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_marsh <= 0.2348]{line-color: #fe9929;}#cv_250m_line [hr_marsh <= 0.1382]{line-color: #fed98e;}#cv_250m_line [hr_marsh = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'dune'){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hr_dunes <= 5]{line-color: #d95f0e;}#cv_250m_line [hr_dunes <= 0.2676]{line-color: #fe9929;}#cv_250m_line [hr_dunes <= 0.1091]{line-color: #fed98e;}#cv_250m_line [hr_dunes = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
			}
		}
		
	}
	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryCVI,
		  cartocss: CartoCSSCVI,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersCVI.push(sublayer);		
		layer.setZIndex(14);

	  }).on('error', function() {
		// log the error
	  });  
}


/////////////////////////////////////////////////////////////////////
// STRATEGIES
/////////////////////////////////////////////////////////////////////

var activateES = 0;
var startES = 0;
var countES = 0;
var sublayersES = [];
var EngineeredExpr = " WHERE eng_drp > 0";

function hideEngineered(){
	sublayersES[countES-1].remove();
	startES = 0;
	activateES = 0;
}

function showEngineered(){

	if (activateES == 1){
			
		// check checkboxes
		EngineeredVal = [];
		$("input:checkbox[name=checkbox-5]:checked").each(function(){
			EngineeredVal.push($(this).val());
		});

		// remove previous layer
		if (startES > 0){sublayersES[countES-1].remove();}
		startES = startES + 1;
		countES = countES + 1;

		// query layer
		var MapQueryES = "SELECT * FROM ca_hexgrid_1km";	
		if (EngineeredVal.length > 0){
			MapQueryES = MapQueryES + " WHERE "+EngineeredVal[0]+" > 0";
			for(i=1;i<EngineeredVal.length;i++){
				MapQueryES = MapQueryES + " OR "+EngineeredVal[i]+" > 0";
			}	
		}
		else{MapQueryES = MapQueryES + " WHERE cartodbid=1";}
		
		
	var CartoCSSES = "#ca_hexgrid_1km{polygon-fill: #FFF45F;polygon-opacity: 0.6;line-color: #000;line-width: 1;line-opacity: 1;}#ca_hexgrid_1km{[zoom<9]{line-width: 2;line-opacity: 1;line-color: #FFF45F;}}";
		
		  cartodb.createLayer(map, linkages)
		  .addTo(map)
		  .on('done', function(layer) {
			// change the query for the first layer
			var subLayerOptions = {
			  sql: MapQueryES,
			  cartocss: CartoCSSES,
			}
			var sublayer = layer.getSubLayer(0);
			sublayer.set(subLayerOptions);
			sublayersES.push(sublayer);
			layer.setZIndex(27);
		  }).on('error', function() {
			// log the error
		  });
	
	}
}		
	
var activateFS = 0;
var startFS = 0;
var countFS = 0;
var sublayersFS = [];
var FinancialExpr = " WHERE fin_bop > 0";

function hideFinancial(){
	sublayersFS[countFS-1].remove();
	startFS = 0;
	activateFS = 0;
}

function showFinancial(){


	if (activateFS == 1){
		
		// check checkboxes
		FinancialVal = [];
		$("input:checkbox[name=checkbox-6]:checked").each(function(){
			FinancialVal.push($(this).val());
		});

		// remove previous layer
		if (startFS > 0){sublayersFS[countFS-1].remove();}
		startFS = startFS + 1;
		countFS = countFS + 1;

		// query layer
		var MapQueryFS = "SELECT * FROM ca_hexgrid_1km";	
		if (FinancialVal.length > 0){
			MapQueryFS = MapQueryFS + " WHERE "+FinancialVal[0]+" > 0";
			for(i=1;i<FinancialVal.length;i++){
				MapQueryFS = MapQueryFS + " OR "+FinancialVal[i]+" > 0";
			}	
		}
		else{MapQueryFS = MapQueryFS + " WHERE cartodbid=1";}

		var CartoCSSFS = "#ca_hexgrid_1km{polygon-fill: #00B272;polygon-opacity: 0.6;line-color: #000;line-width: 1;line-opacity: 1;}#ca_hexgrid_1km{[zoom<9]{line-width: 2;line-opacity: 1;line-color: #00B272}}";
		
		  cartodb.createLayer(map, linkages)
		  .addTo(map)
		  .on('done', function(layer) {
			// change the query for the first layer
			var subLayerOptions = {
			  sql: MapQueryFS,
			  cartocss: CartoCSSFS,
			}
			var sublayer = layer.getSubLayer(0);
			sublayer.set(subLayerOptions);
			sublayersFS.push(sublayer);
			layer.setZIndex(26);
		  }).on('error', function() {
			// log the error
		  });
	
	}	
}		
	
var activateLRS = 0;	
var startLRS = 0;
var countLRS = 0;
var sublayersLRS = [];
var LegalRegulatoryExpr = " WHERE lgr_dvm > 0";

function hideLegalRegulatory(){
	sublayersLRS[countLRS-1].remove();
	startLRS = 0;
	activateLRS = 0;
}

function showLegalRegulatory(){

	if (activateLRS == 1){

		// check checkboxes
		LegalRegulatoryVal = [];
		$("input:checkbox[name=checkbox-7]:checked").each(function(){
			LegalRegulatoryVal.push($(this).val());
		});
		
		// remove previous layer
		if (startLRS > 0){sublayersLRS[countLRS-1].remove();}
		startLRS = startLRS + 1;
		countLRS = countLRS + 1;

		// query layer
		var MapQueryLRS = "SELECT * FROM ca_hexgrid_1km";	
		if (LegalRegulatoryVal.length > 0){
			MapQueryLRS = MapQueryLRS + " WHERE "+LegalRegulatoryVal[0]+" > 0";
			for(i=1;i<LegalRegulatoryVal.length;i++){
				MapQueryLRS = MapQueryLRS + " OR "+LegalRegulatoryVal[i]+" > 0";
			}	
		}
		else{MapQueryLRS = MapQueryLRS + " WHERE cartodbid=1";}
		
		//alert(MapQueryLRS);
		
		
		
		var CartoCSSLRS = "#ca_hexgrid_1km{polygon-fill: #E98166;polygon-opacity: 0.6;line-color: #000;line-width: 1;line-opacity: 1;}#ca_hexgrid_1km{[zoom<9]{line-width: 2;line-opacity: 1;line-color: #E98166;}}";
		
		  cartodb.createLayer(map, linkages)
		  .addTo(map)
		  .on('done', function(layer) {
			// change the query for the first layer
			var subLayerOptions = {
			  sql: MapQueryLRS,
			  cartocss: CartoCSSLRS,
			}
			var sublayer = layer.getSubLayer(0);
			sublayer.set(subLayerOptions);
			sublayersLRS.push(sublayer);
			layer.setZIndex(25);
		  }).on('error', function() {
			// log the error
		  });
	
	}		
}			
	
	
	

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function showMapTable(site_num, name, scale){
	

	// Del Norte
	if (site_num == 1){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Coastal Del Norte County includes the mouths of two major California rivers: Smith River to the north and Klamath River to the south. This region features rugged topography caused by tectonic uplift. <hr><b>Biophysical metrics:</b><br>Dune systems, including dunes greater than 5 meters in height, protect over 2/3 of the coastline in Del Norte County. These extensive <a onclick='popup(41.876, -124.211, 8)';><font color='blue'>dune systems south of the Smith River</font></a> provide the highest protective role.  <hr><b>Socioeconomic metrics:</b><br>More than 1000 people benefit from risk reduction provided by natural habitats. Half of all coastal roads are less exposed to hazards due to this natural protection.  Relative to other coastal counties, Del Norte has the highest percentage of roads at reduced risk to hazards.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}

	// Humboldt
	else if (site_num == 2){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Relative to the rest of the county, the more densely populated areas of Arcata and Eureka are located in vulnerable locations partially due to land subsidence.<hr><b>Biophysical metrics:</b><br>Marsh habitat protects approximately 40% of coastal Humboldt Bay, and <a onclick='popup(40.836, -124.181, 8)';><font color='blue'>dune systems</font></a> are the dominant coastal habitat providing protection from erosion and innundation during storms.<hr><b>Socioeconomic metrics:</b><br>2500 people benefit from risk reduction provided by natural habitats. Additionally, 11 of 51 coastal access points are less exposed to hazards due to this natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// Mendocino
	else if (site_num == 3){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>With a significant amount of steep rocky coastline, most of Mendocino County's coastal more vulnerable locations are focused in the areas near the mouths of rivers including Noyo, Albion, and Gualala.<hr><b>Biophysical metrics:</b><br>Kelp is the dominant marine habitat in Mendocino County. The coastline is also made up of cliffs and scattered low dune systems, with <a onclick='popup(39.472, -123.803, 8)';><font color='blue'>marsh habitat </font></a> playing the highest protective role relative to California's other coastal counties.<hr><b>Socioeconomic metrics:</b><br>Almost half of coastal residents (6600 people) benefit from risk reduction provided by natural habitats. Mendocino has the highest percentage of residents at reduced risk due to natural coastal protection. Additionally, 6 of 45 coastal access points and 20% of roads are less exposed to hazards.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}		

	// Sonoma
	else if (site_num == 4){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Sonoma County features a tale of two coastlines. North of the Russian RIver is sparsely populated and has steep cliffs while the southern section includes communities such as Jenner and Salmon Creek as well as the town of Bodega Bay among lower-lying areas.<hr><b>Biophysical metrics:</b><br>North of the Russian River mouth, kelp forests backed by steep cliffs dominate the coast. Model results suggest that south of Jenner, the open coast and low lying beaches play the largest role in reducing exposure of coastal people and property to hazards (i.e., <a onclick='popup(38.31, -123.023, 8)';><font color='blue'>high dune habitat near Doran Beach</font></a> and <a onclick='popup(38.348, -123.068, 8)';><font color='blue'>south of Salmon Creek</font></a>).<hr><b>Socioeconomic metrics:</b><br>30% of coastal residents (1,000 people) benefit from risk reduction provided by natural habitats. Additionally, 9 of 47 coastal access points and nearly 1/4 of major roads are less exposed to hazards due to natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// Marin
	else if (site_num == 5){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Coastal Marin County is home to several small communities at relatively low elevations. Small villages along the shores of the Tomales Bay as well as those on Bolinas Lagoon have already taken initial steps to better understand vulnerabilities.<hr><b>Biophysical metrics:</b><br>Coastal marsh and seagrass habitat covers a majority of the coastline. The <a onclick='popup(38.075, -122.977, 8)';><font color='blue'>dune system</font></a> play the highest protective role relative California's other coastal counties in reducing exposure to hazards. <hr><b>Socioeconomic metrics:</b><br>2 in 10 coastal residents (almost 1000 people) benefit from risk reduction provided by habitats. Additionally, more than half of coastal access points (25) and length of roads are less exposed to hazards due to this natural coastal protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// San Francisco 
	else if (site_num == 6){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>A primary focus of adaptation planning in San Francisco City and County is on Ocean Beach's access points—particularly the southern section encroaching on the Great Highway.<hr><b>Biophysical metrics:</b><br>Dune systems are the dominant habitat in San Francisco County's <a onclick='popup(37.74, -122.509, 8)';><font color='blue'>Ocean Beach</font></a> and play the highest protective role relative to other dune systems across California's coastal counties.<hr><b>Socioeconomic metrics:</b><br>10,000 people benefit from risk reduction provided by dune habitat. 1/3 of Great Highway and other coastal roads in San Francisco are less exposed to hazards due to this natural protection from dunes.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// San Mateo
	else if (site_num == 7){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>San Mateo County has seen many dynamic changes in recent years, including hazardous erosion along the City of Pacifica and the closure of the Pacific Coastal Highway along Devil's Slide.<hr><b>Biophysical metrics:</b><br>Both high and low dune systems protect over 2/3 of San Mateo County coastline, along with several <a onclick='popup(37.501610, -122.495224, 8)';><font color='blue'>marsh habitat areas</font></a> that play an important protective role.<hr><b>Socioeconomic metrics:</b><br>7,000 coastal residents benefit from risk reduction provided by natural habitats. Additionally, almost 1/3 of coastal access points (13 total) are less exposed to hazards. The vast majority of coastal roads (85%) are situated in areas that do not directly benefit from natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// Santa Cruz
	else if (site_num == 8){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Santa Cruz County's  coast is relatively open and undeveloped while it also features the cities of Santa Cruz and Capitola.<hr><b>Biophysical metrics:</b><br>The Santa Cruz coastline features diverse coastal habitats including: dense kelp forests, brackish wetland habitats and dune systems. The <a onclick='popup(36.868340, -121.821138, 8)';><font color='blue'>Pajaro Dunes near Moss Landing</font></a> play the highest role in reducing exposure.<hr><b>Socioeconomic metrics:</b><br>11,000 people, mostly near the city of Santa Cruz, benefit from risk reduction provided by these habitats.  Almost half (40%) of coastal roads are less exposed to hazards due to this natural protection. Santa Cruz County also has the highest percentage of coastal access points (15 of 47) protected by habitats.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}		
	
	// Monterey
	else if (site_num == 9){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Monterey County has three distinct coastal segments, including the northern county's low-lying areas fronted by dunes, the rocky shores of Monterey Peninsula, and the steep cliffs of Big Sur.<hr><b>Biophysical metrics:</b><br>The Monterey Bay coastline features diverse coastal habitats including: dense kelp forests, brackish wetland habitats and expansive dune systems. While each coastal habitat plays some protective role, <a onclick='popup(36.615016, -121.855656, 8)';><font color='blue'>the dune systems along southern Monterey Bay</font></a> play the highest role in reducing exposure of coastal development to erosion and inundation during storms. <hr><b>Socioeconomic metrics:</b><br>15% of coastal residents (6100 people) benefit from risk reduction provided by habitats and 6 of 65 coastal access points are less exposed to hazards as a result of this natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}

	// San Luis Obispo
	else if (site_num == 10){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>The unincorporated sections of San Luis Obispo County include small coastal communities as well as three cities with their own LCP jurisdictions: Morro Bay, Pismo Beach, and Grover Beach.<hr><b>Biophysical metrics:</b><br>Kelp is the dominant marine habitat in San Luis Obispo (SLO) County. The <a onclick='popup(35.393471, -120.866686, 8)';><font color='blue'>dune systems around Morro Bay</font></a> play an important protective role relative to other habitats along the California coast. <hr><b>Socioeconomic metrics:</b><br>Nearly 1/4 of SLO County's coastal residents (7,000 people) benefit from risk reduction provided by habitats. 1 in 5 coastal access points (10 total) and 25% of the entire length of coastal roads are less exposed to hazards due to this natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	
	
	// Santa Barbara
	else if (site_num == 11){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Santa Barbara County's population and coastal development is concentrated on the cities of Santa Barbara, Goleta, and Carpinteria.<hr><b>Biophysical metrics:</b><br>Kelp forests extend along much of the Santa Barbara County coast and are adjacent to extensive dune systems and scattered marsh habitat. The coastal areas of the county most exposed to hazards, <a onclick='popup(34.682929, -120.607380, 8)';><font color='blue'>north of Point Conception</font></a>, are sparsely populated and protected by both wetland and dune habitats.  <hr><b>Socioeconomic metrics:</b><br>4 in 10 coastal residents (22,000 people) benefit from risk reduction provided by habitats. 13 of 54 coastal access points are less exposed to hazards due to this natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// Ventura
	else if (site_num == 12){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>The Pacific Coastal Highway runs adjacent to the ocean for much of the County's coastline, while its developed areas are primarily around the cities of Ventura, Oxnard, and Port Hueneme.<hr><b>Biophysical metrics:</b><br>Low dune systems protect half of the Ventura County coastline along with scattered marsh and kelp habitats. Emergent marsh habitats provide coastal protection (e.g., <a onclick='popup(34.096470, -119.078097, 8)';><font color='blue'>south of Port Hueneme</font></a>) and a few small dune systems also reduce exposure (e.g., <a onclick='popup(34.182433, -119.240660, 8)';><font color='blue'>Oxnard Shores</font></a>).<hr><b>Socioeconomic metrics:</b><br>30% of coastal residents (11,000 people) benefit from risk reduction provided by habitats. Relatively few coastal roads and access points in the county receive natural protecion.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// Los Angeles
	else if (site_num == 13){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>California's most populated county's coastal zone is split between three county local coastal program segments and eleven city jurisdictions.<hr><b>Biophysical metrics:</b><br>In Los Angeles County, low dunes, marsh, and kelp habitats represent the main coastal habitats. Low dune systems along <a onclick='popup(33.890049, -118.416730, 8)';><font color='blue'>Manhattan Beach</font></a> provide moderate coastal protection. Coastal exposure in LA County is driven largely by low-lying coastal areas (except Palos Verdes) and soft geomorphology (i.e., fine-grained sandy beaches).<hr><b>Socioeconomic metrics:</b><br>Nearly 30,000 Los Angelinos benefit from risk reduction provided by habitats. Additionally, 20% of all major coastal roads in the county are less exposed to hazards due to this natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// Orange
	else if (site_num == 14){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>Orange County features one of the most densely populated and developed coastal zones in the state.<hr><b>Biophysical metrics:</b><br>Coastal marsh habitat covers approximately 40% of the Orange County coastline, providing important natural protection to people and property (e.g., <a onclick='popup(33.697751, -118.049796, 8)';><font color='blue'>Huntington Beach</font></a>), along with scattered dune systems.  Low-lying coastal areas in the north that have fine- to medium-grained sandy beaches are most exposed to hazards relative to the rest of the county. <hr><b>Socioeconomic metrics:</b><br>10,000 coastal residents benefit from risk reduction provided by habitats. Only 8 of 60 coastal access points and 14% of the length of major coastal roads are less exposed to hazards due to this natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}	

	// San Diego
	else if (site_num == 15){
		var HTML1 = "<br><fieldset style='width:375px;'><legend><img src='img/snapshot_sm.png' valign='middle'>&nbsp; <b>"+name.toUpperCase()+" COUNTY</b></legend><b>Planning considerations:</b><br>San Diego is the second most populous city in the state. The County's other coastal cities each feature their own local coastal program jurisdictions.<hr><b>Biophysical metrics:</b><br>Coastal marsh and seagrass habitats cover the majority of San Diego's coastline. <a onclick='popup(32.550006, -117.126457, 8)';><font color='blue'>Marsh habitat</font></a> in San Diego County provide the highest protective role relative to other marshes across California's coastal counties. <hr><b>Socioeconomic metrics:</b><br>15% of coastal residents (almost 40,000 people) benefit from risk reduction provided by habitats. Additionally, 30% of major roads in the coastal zone are less exposed to hazards due to this natural protection.</fieldset>";	
	
		document.getElementById("test1").innerHTML = HTML1;
	}		
	
	else{erase("test1")}
}


// erase tables using "x" button
function erase(div_id){

	document.getElementById(div_id).innerHTML = "";

}

