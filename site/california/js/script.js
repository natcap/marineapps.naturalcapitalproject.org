$(window).load(function() {
	$( "#accordion").accordion({heightStyle: 'panel'});
	$( "#tabs" ).tabs();
    $( "#check" ).button();
    $( "#format" ).buttonset();
	$( "#tooltip" ).tooltip();

});

jQuery(document).ready(function($) {

	// bjqs slider
  $('#banner-slide').bjqs({
    animtype      : 'slide',
    height        : 200,
    width         : 300,
    responsive    : true,
    randomstart   : true
  });

 });

 
/////////////////
// FUNCTIONS
/////////////////

$( "#zoom" ).change(function(event){
	zoomCS();
});

$( "#strategies" ).change(function(event){
	showStrategies();
});

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
['Waves',   arr1[0]/4, arr2[0]/4, arr3[0]/4, arr4[0]/4, arr5[0]/4],
['Elevation',   arr1[1]/4, arr2[1]/4, arr3[1]/4, arr4[1]/4, arr5[1]/4],
['Surge',  arr1[2]/4, arr2[2]/4, arr3[2]/4, arr4[2]/4, arr5[2]/4],
['Geomph',  arr1[3]/4, arr2[3]/4, arr3[3]/4, arr4[3]/4, arr5[3]/4],
//['SLR',  arr1[4]/4, arr2[4]/4, arr3[4]/4, arr4[4]/4, arr5[4]/4],
//['Habitats',  arr1[5]/4, arr2[5]/4, arr3[5]/4, arr4[5]/4, arr5[5]/4],
]);

var options = {
title: 'Variable Ranks of Selected Coast',
colors: ['#f0f0f0', '#f0f0f0', '#d9d9d9', '#525252', '#000'],
is3D:true,
isStacked: true,
};

var chart = new google.visualization.BarChart(buildBar);
chart.draw(data, options);
}
		

// Leaflet popup
function popup(lat, lon, type){
	var popup = L.popup()
	.setLatLng([lat, lon])
	.setContent('your selection')
	.openOn(map);
	} 	

// intersect Leaflet draw and write table
function updateLayer(query, layer){
	// switch to last tab
	$("#tabs").tabs({ active: 1}); 
	
	// run a query to select portions of a layer
	var sql = cartodb.SQL({ user: 'ehartge' });

	sql.execute("SELECT * FROM ("+query+") a").done(function(data) {
	var arr1 = [4, 4, 4, 4, 4, 4];
	var arr2 = [4, 4, 4, 4, 4, 4];
	var arr3 = [4, 4, 4, 4, 4, 4];
	var arr4 = [4, 4, 4, 4, 4, 4];
	var arr5 = [4, 4, 4, 4, 4, 4];
	
	for (var i = 0; i < data.total_rows; i++) {
		
		switch(data.rows[i].wave_expos) {
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

		switch(data.rows[i].geomorphol) {
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

		
	drawBarChart(document.getElementById('chartBar_div'), arr1, arr2, arr3, arr4, arr5);
	
	}
})
}


// define basemaps
var ESRIImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, and UPR-EGP'});

var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMaps</a>'});

var streetsMapbox = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.afb8c76d/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});

var terrainMapbox = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.e4qjes5f/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
	
var oceanESRI = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, GEBCO, NOAA, and DeLorme'});

// map settings
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw';


	
// set base map and controls
var map = new L.Map('map', {
  zoomControl: false,
  layer_selector: true,
  layers: [terrainMapbox],
  center: [37.72, -118],
  zoom: 6,
  minZoom: 5,
  maxZoom: 16
});

// zoom control
map.addControl( L.control.zoom({position: 'topleft'}) )
// scale
L.control.scale({ position: 'topleft' }).addTo(map);

// draw control (Leaflet)
L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a polygon';
	var drawControl = new L.Control.Draw({
		position: 'topright',
		draw: {
			polyline: false,
			polygon:false,
			rectangle: {
            shapeOptions: {
				color: '#fff',
                clickable: false,
				opacity: 0.1,
            }
        },
			circle: false,
			marker: false
		}
	});
	
	
map.addControl(drawControl);		
map.attributionControl.setPrefix('Map viewer by: <a href="mailto:gverutes@gmail.com" target="_top">Gregg Verutes</a>');
	

// add basemap and overlays
var baseMaps = {
	"Terrain": terrainMapbox,
	"Imagery": ESRIImagery,
	"Streets": streetsMapbox,
};


// add cartoDB layer and set z-index so it shows up on top
cartodb.createLayer(map, 'https://ehartge.cartodb.com/api/v2/viz/12909494-ba4b-11e6-b3a1-0e3ff518bd15/viz.json')
		.addTo(map)
        .on('done', function(layer) {
		layer.setZIndex(20);	
});


// intersect CV_1km with LeafletDraw
cartodb.createLayer(map, 'https://ehartge.carto.com/api/v2/viz/c0b4ff22-b9c1-11e6-afe4-0e233c30368f/viz.json')
	 .on('done', function(layer) {
		layer.setZIndex(13);	
		// keep track of all draw objects
		var drawnItems = new L.FeatureGroup();
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
			var query = "SELECT * FROM cv_1km_line WHERE ST_Intersects(the_geom, ST_MakePolygon(ST_MakeLine(Array["+sql_poly.join()+"])))";
			
			// run function to update SQL and Style
			updateLayer(query, layer.getSubLayer(0))
		});
})
        .on('error', function(err) {
          alert("some error occurred: " + err);
        });
	

// add CartoDB vector	
// add all CV points
var layerUrlCV = 'https://ehartge.carto.com/api/v2/viz/c0b4ff22-b9c1-11e6-afe4-0e233c30368f/viz.json';	
var layerUrlPts = 'https://ehartge.carto.com/api/v2/viz/d553bce8-b9c1-11e6-9120-0e3ff518bd15/viz.json';	
var habitats = 'https://ehartge.carto.com/api/v2/viz/3da14a96-b9c1-11e6-a2ed-0e3ebc282e83/viz.json'; 
var zoning = L.mapbox.tileLayer('geointerest.CA_Zoning'); // switch to panel with CARTO


https://ehartge.carto.com/viz/c0b4ff22-b9c1-11e6-afe4-0e233c30368f/public_map
 
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
		color: '#ffff99', 
		dashArray: '3',
		fillOpacity: 0.2,
		fillColor: '#fff'
	});
}

// a function to reset the colors when a neighborhood is not longer 'hovered'
function resetHighlight(e) {
	geojson.resetStyle(e.target);
}

// tell MapBox.js what functions to call when mousing over and out of a neighborhood
// add vector data to map
geojson = L.geoJson(grid, {
	style: style,
	onEachFeature: function (feature, layer) {
	layer.on({
	mouseover: highlightFeature,
	mouseout: resetHighlight
	});
			/*<img src=\'img/gallery_sm.png\'>*/
		layer.bindPopup("COUNTY: &nbsp;<b>"+feature.properties.NAME10+"</b><br>DISTRICT: &nbsp;<b>"+feature.properties.DISTRICT+"</b><center><br> COASTAL RECORDS PROJECT<a href=\'http://www.californiacoastline.org/cgi-bin/location.cgi?latdeg="+feature.properties.LAT+"&longdeg="+feature.properties.LONG+"&mode=sequential\' target=\'_blank\'><br><b>AERIAL PHOTO</b></a> || <a href=\'http://www.instantstreetview.com/s/"+feature.properties.LAT+","+feature.properties.LONG+"&mode=sequential\' target=\'_blank\'><b>STREET VIEW</b></a></center>");
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
		var overlayMaps = {	 
		"habitats": layer,
		"aerial photo": geojson,
		"zoning": zoning,
		};
		L.control.layers(baseMaps, overlayMaps, {position: 'topleft', collapsed: false}).addTo(map);
	});

	
// mini map
	// overlay detailed urban place names on locator map using Mapbox Studio
  	var mapboxUrl='http://a.tiles.mapbox.com/v3/mapbox.world-light/{z}/{x}/{y}.png';
	var mb = new L.TileLayer(mapboxUrl, {minZoom: 2, maxZoom: 16});
	var miniMap = new L.Control.MiniMap(mb, { toggleDisplay: true }).addTo(map);   
	
 
	
///////////////////////////////////////////////////////////////////////////////////////////////////	

var sql = cartodb.SQL({ user: 'ehartge' });

// query and zoom by chapter
function zoomCS(){
	$("#tabs").tabs({ active: 1}); 
	if ($( "#zoom option:selected" ).text() == 'CA Statewide'){
		var MapQuery = "SELECT * FROM cv_1km_line"
		sql.getBounds(MapQuery).done(function(bounds) {
		bounds[1][1] = bounds[1][1] + 6.5;
		map.fitBounds(bounds);
		});
	}
	else{
		var MapQuery = "SELECT * FROM cv_1km_line WHERE name10 = '"+ $( "#zoom option:selected" ).text()+"'";
		sql.getBounds(MapQuery).done(function(bounds) {
		bounds[1][1] = bounds[1][1] + 0.75;
		map.fitBounds(bounds);
		});
	}
}  

//////////////////////////////////////////////////////////////////////////

// show adaptation strategies
function showStrategies(){
	var HTML = "";
	
	if ($( "#strategies option:selected" ).text() == 'Dune Restoration'){
		HTML = HTML + "<br><u>Habitats</u>: <input name='selector[]' id='habitats_Checkbox1' class='habitats_Checkbox' type='checkbox' value='1' checked/> dunes  <input name='selector[]' id='habitats_Checkbox2' class='habitats_Checkbox' type='checkbox' value='2' /> wetlands<br><u>Zoning</u>: <input name='selector[]' id='zoning_Checkbox1' class='zoning_Checkbox' type='checkbox' value='1' checked/> open space  <input name='selector[]' id='zoning_Checkbox2' class='zoning_Checkbox' type='checkbox' value='2' /> residential<br><u>Geomorphology</u>: <input name='selector[]' id='geomorph_Checkbox1' class='geomorph_Checkbox' type='checkbox' value='1' /> elevated cliffs  <input name='selector[]' id='geomorph_Checkbox2' class='geomorph_Checkbox' type='checkbox' value='2' checked/> sandy beaches<br><br><input type='button' value='SHOW' onclick='mapStrategies();' /> <input type='button' value='CLEAR' onclick='clearStrategies();' />";
	}
	else{
		HTML = HTML + "<br><u>Habitats</u>: <input name='selector[]' id='habitats_Checkbox1' class='habitats_Checkbox' type='checkbox' value='1' /> dunes  <input name='selector[]' id='habitats_Checkbox2' class='habitats_Checkbox' type='checkbox' value='2' /> wetlands<br><u>Zoning</u>: <input name='selector[]' id='zoning_Checkbox1' class='zoning_Checkbox' type='checkbox' value='1' /> open space  <input name='selector[]' id='zoning_Checkbox2' class='zoning_Checkbox' type='checkbox' value='2' checked/> residential<br><u>Geomorphology</u>: <input name='selector[]' id='geomorph_Checkbox1' class='geomorph_Checkbox' type='checkbox' value='1'  checked/> elevated cliffs  <input name='selector[]' id='geomorph_Checkbox2' class='geomorph_Checkbox' type='checkbox' value='2'/> sandy beaches<br><br><input type='button' value='SHOW' onclick='mapStrategies();' /> <input type='button' value='CLEAR' onclick='clearStrategies();' />";	
	}
			
	document.getElementById("Strategy").innerHTML = HTML;	
}


// map adaptation strategies
var sublayersStrategies = [];
var start2 = 0;
var end2 = 0;  

function mapStrategies(){
	
	end2 = end2 + 1;
	
	var MapQueryStrategies = "SELECT * FROM coastal_exposure_pts WHERE erodible_s = 1 AND geomorphol = 5";
	var CartoCSSStrategies = "#coastal_exposure_pts {marker-fill-opacity: 1;marker-line-opacity: 0;marker-line-width: 0;marker-fill: #000;marker-width: 6; marker-allow-overlap: true;}"
	
	  cartodb.createLayer(map, layerUrlPts)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryStrategies,
		  cartocss: CartoCSSStrategies,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersStrategies.push(sublayer);
		layer.setZIndex(100);
	  }).on('error', function() {
		// log the error
	  });
}


// clear adaptation strategies
function clearStrategies(){

	for (var i = start2; i < end2; i++) {
		sublayersStrategies[i].remove();
		}
	start2 = end2;
}

///////////////////////////////////////////////////////////////

var start = 0;
var end = 0;  
var sublayersCVI = [];

// CVI
function showCVI(){

	end = end + 1;
	
	var ck_current = document.getElementById('radio-1a');
	var ck_none = document.getElementById('radio-2a');

	/*
	{line-color: #C00000;}
	{line-color: #de2d26;}
	{line-color: #FFCC00;}
	{line-color: #ffff00;}
	{line-color: #528FD4;}
	*/

	var MapQueryCVI = "SELECT * FROM cv_1km_line";
	var CartoCSSCVI = "#cv_1km_line{line-color: #0080ff;line-width: 2;line-opacity: 1;line-join:round;line-cap: round;line-smooth:0.25;}[zoom=8]{line-width: 3;}[zoom=9]{line-width: 3;}[zoom=10]{line-width: 5;}[zoom=11]{line-width: 5;}[zoom=12]{line-width: 7;}[zoom=13]{line-width: 7;}[zoom=14]{line-width: 8;}[zoom=15]{line-width: 8;}[zoom=16]{line-width: 10;}";

	if (ck_current.checked)
	{CartoCSSCVI = CartoCSSCVI + "#cv_1km_line [ coastal_ex <= 5] {line-color: #C00000;}#cv_1km_line [ coastal_ex <= 3.6590500000000001] {line-color: #de2d26;}#cv_1km_line [ coastal_ex <= 3.2951000000000001] {line-color: #FFCC00;}#cv_1km_line [ coastal_ex <= 3.0468299999999999] {line-color: #ffff00;}#cv_1km_line [ coastal_ex <= 2.7981699999999998] {line-color: #528FD4;}"}
	

	else
	{CartoCSSCVI = CartoCSSCVI + "#cv_1km_line [ coastal__1 <= 5] {line-color: #C00000;}#cv_1km_line [ coastal__1 <= 3.6590500000000001] {line-color: #de2d26;}#cv_1km_line [ coastal__1 <= 3.2951000000000001] {line-color: #FFCC00;}#cv_1km_line [ coastal__1 <= 3.0468299999999999] {line-color: #ffff00;}#cv_1km_line [ coastal__1 <= 2.7981699999999998] {line-color: #528FD4;}"}
	
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
}

// HAB ROLE
function showHabRole(){

	end = end + 1;
	var MapQueryHabRole = "SELECT * FROM cv_1km_line";
	var CartoCSSHabRole = "#cv_1km_line{line-color: #000;line-width: 2;line-opacity: 1;line-join:round;line-cap: round;line-smooth:0.25;}[zoom=8]{line-width: 3;}[zoom=9]{line-width: 3;}[zoom=10]{line-width: 5;}[zoom=11]{line-width: 5;}[zoom=12]{line-width: 7;}[zoom=13]{line-width: 7;}[zoom=14]{line-width: 8;}[zoom=15]{line-width: 8;}[zoom=16]{line-width: 10;}";

	/*
	{marker-fill: #fff;}	
	{marker-fill: #d4b9da;}
	{marker-fill: #df65b0;}
	{marker-fill: #980043;}
	*/
	
	if ($( "#hab-type option:selected" ).text() == 'All Habitats')
	{CartoCSSHabRole = CartoCSSHabRole + "#cv_1km_line [habitat_ro <= 5]{line-color: #980043;}#cv_1km_line [habitat_ro <= 0.569160]{line-color: #df65b0;}#cv_1km_line [habitat_ro <= 0.450290]{line-color: #d4b9da;}#cv_1km_line [habitat_ro = 0]{line-color: #fff;}";}	



	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryHabRole,
		  cartocss: CartoCSSHabRole,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersCVI.push(sublayer);
		layer.setZIndex(20);
	  }).on('error', function() {
		// log the error
	  });
}


// VARIABLE RANKS
function showVariableRanks(){

	end = end + 1;
	var MapQueryVR = "SELECT * FROM cv_1km_line";
	var CartoCSSVR = "#cv_1km_line{line-color: #f0f0f0;line-width: 2;line-opacity: 1;line-join:round;line-cap: round;line-smooth:0.25;}[zoom=8]{line-width: 3;}[zoom=9]{line-width: 3;}[zoom=10]{line-width: 5;}[zoom=11]{line-width: 5;}[zoom=12]{line-width: 7;}[zoom=13]{line-width: 7;}[zoom=14]{line-width: 8;}[zoom=15]{line-width: 8;}[zoom=16]{line-width: 10;}";
	
	
	/*	
	[5]{marker-fill: #000;}  0,0,0
	[4]{marker-fill: #525252;}  82,82,82
	[3]{marker-fill: #d9d9d9;}  217,217,217
	[<3]{marker-fill: #f0f0f0;} 
	*/
	
	if ($( "#var-type option:selected" ).text() == 'Wave Exposure')
	{CartoCSSVR = CartoCSSVR + "#cv_1km_line [wave_expos = 5]{line-color: #000;}#cv_1km_line [wave_expos = 4]{line-color: #525252;}#cv_1km_line [wave_expos = 3]{line-color: #d9d9d9;}";}		
	
	else if ($( "#var-type option:selected" ).text() == 'Elevation')
	{CartoCSSVR = CartoCSSVR + "#cv_1km_line [relief = 5]{line-color: #000;}#cv_1km_line [relief = 4]{line-color: #525252;}#cv_1km_line [relief = 3]{line-color: #d9d9d9;}";}	
	
	else if ($( "#var-type option:selected" ).text() == 'Surge Potential')
	{CartoCSSVR = CartoCSSVR + "#cv_1km_line [surge_pote = 5]{line-color: #000;}#cv_1km_line [surge_pote = 4]{line-color: #525252;}#cv_1km_line [surge_pote = 3]{line-color: #d9d9d9;}";}	
	
	else if ($( "#var-type option:selected" ).text() == 'Geomorphology')
	{CartoCSSVR = CartoCSSVR + "#cv_1km_line [geomorphol = 5]{line-color: #000;}#cv_1km_line [geomorphol = 4]{line-color: #525252;}#cv_1km_line [geomorphol = 3]{line-color: #d9d9d9;}";}	

	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryVR,
		  cartocss: CartoCSSVR,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersCVI.push(sublayer);
		layer.setZIndex(20);

	  }).on('error', function() {
		// log the error
	  });
}

// CLEAR LAYERS
function clearLayers(){

	for (var i = start; i < end; i++) {
		sublayersCVI[i].remove();
		}
	start = end;
	// map.removeLayer(conserv);
}

// zoom levels for quick zooms
/*
document.getElementById('zooms').onclick = function(e) {
	var pos = e.target.getAttribute('data-position6');	
	if (pos) {
		var loc = pos.split(',');
		map.setView(loc, 6);
	}	
	var pos = e.target.getAttribute('data-position7');	
	if (pos) {
		var loc = pos.split(',');
		map.setView(loc, 7);
	}	
	var pos = e.target.getAttribute('data-position8');
	if (pos) {
		var loc = pos.split(',');
		map.setView(loc, 8);
	}	
	var pos = e.target.getAttribute('data-position9');
	if (pos) {
		var loc = pos.split(',');
		map.setView(loc, 9);
	}		
	var pos = e.target.getAttribute('data-position10');
	if (pos) {
		var loc = pos.split(',');
		map.setView(loc, 10);
	}
	var pos = e.target.getAttribute('data-position11');
	if (pos) {
		var loc = pos.split(',');
		map.setView(loc, 11);
	}
	var pos = e.target.getAttribute('data-position12');
	if (pos) {
		var loc = pos.split(',');
		map.setView(loc, 12);
	}	
}
*/
