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
    height        : 450,
    width         : 800,
    responsive    : true,
    randomstart   : false,

	animtype        : 'fade',
	animduration    : 350,      // length of transition
	animspeed       : 10000,     // delay between transitions
	automatic       : true,     // enable/disable automatic slide rotation

	
	// control and marker configuration
	showcontrols    : true,     // enable/disable next + previous UI elements
	centercontrols  : true,     // vertically center controls
	nexttext        : '>>',   // text/html inside next UI element
	prevtext        : '<<',   // text/html inside previous UI element
	showmarkers     : true,     // enable/disable individual slide UI markers
	centermarkers   : true,     // horizontally center markers

	});

showHazard(); // show exposure at start

});



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


// define basemaps
var ESRIImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, and UPR-EGP'});

var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMaps</a>'});

var MapboxStreets = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.afb8c76d/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});

var MapboxTerrain = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.e4qjes5f/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
	
var oceanESRI = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, GEBCO, NOAA, and DeLorme'});

// map settings
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw';


	
// set base map and controls
var map = new L.Map('map', {
  zoomControl: false,
  layer_selector: true,
  layers: [MapboxTerrain],
  center: [23.88, -74],
  zoom: 7,
  minZoom: 6,
  maxZoom: 12
});



// zoom control
map.addControl( L.control.zoom({position: 'topleft'}) )
// scale
L.control.scale({ position: 'topleft' }).addTo(map);
	
map.attributionControl.setPrefix('Map viewer by: <a href="mailto:gverutes@gmail.com" target="_top">Gregg Verutes</a>');
	

// add basemap and overlays
var baseMaps = {
	//"Terrain": terrainMapbox,
	"<b>imagery</b>": ESRIImagery,
	"<b>terrain</b>": MapboxTerrain,
};



/* ADMIN LAYERS
cartodb.createLayer(map, 'xxx')
		.addTo(map)
        .on('done', function(layer) {
		layer.setZIndex(9);	
});
*/

// add CartoDB vector	
// add all CV points
var layerUrlCV = 'https://stanford.carto.com/u/jesssilver/api/v2/viz/750751da-b1c7-11e6-aa0b-0e3ebc282e83/viz.json';
var layerUrlSocial = 'https://stanford.carto.com/u/jesssilver/api/v2/viz/c0ff676e-b8c8-11e6-874a-0e3ebc282e83/viz.json';
var habitats = 'https://stanford.carto.com/u/jesssilver/api/v2/viz/56877bf6-62a1-11e6-9734-0e3ff518bd15/viz.json';

/*
// images
 var imageIcon = L.Icon.Default.extend({
	options: {
			iconUrl: 'img/marker-icon-black.png' ,
			iconSize:     [20, 20],  // size of the icon
			iconAnchor:   [9, 19],
			popupAnchor:  [-130, -20]  			
	}
 });
 
var imageIcon = new imageIcon();
imageIcon.options.shadowSize = [0,0];

var image1 = L.marker([24.984937, -77.387769], {icon: imageIcon}).bindPopup("<img src='img/1.jpg'><br><b>Sample header</b><br>Sample text", {maxWidth: 'auto'});
var image2 = L.marker([24.150637, -77.577970], {icon: imageIcon}).bindPopup("<img src='img/2.jpg'><br><b>Sample header</b><br>Sample text", {maxWidth: 'auto'});
var image3 = L.marker([23.096280, -74.971463], {icon: imageIcon}).bindPopup("<img src='img/3.jpg'><br><b>Sample header</b><br>Sample text", {maxWidth: 'auto'});
var imageGroup = L.layerGroup([image1, image2, image3]);
*/

var imageUrl = 'img/NewProvidence.jpg',
    imageBounds = [[25.096, -77.514], [24.914, -77.212]];

var Matthew = L.imageOverlay(imageUrl, imageBounds, {
    opacity: 0.6
  });

var labels = L.mapbox.tileLayer('geointerest.BH_Names'); // switch to panel with CARTO  

// add cartoDB layer and set z-index so it shows up on top
	cartodb.createLayer(map, habitats)
	.on('done', function(layer) {
		layer.setZIndex(9);	
		var overlayMaps = {	 
		"<b>labels:</b> islands/towns": labels.addTo(map),
		"<b>natural habitats</b>": layer,
		"<b>comparison to actual<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; flooding/damages</b>": Matthew,


		//"images": imageGroup,

		};
		L.control.layers(baseMaps, overlayMaps, {position: 'topleft', collapsed: false}).addTo(map);
	});


	
// mini map
  	var CartoDB_positron = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
	var mb = new L.TileLayer(CartoDB_positron, {minZoom: 2, maxZoom: 16});
	var miniMap = new L.Control.MiniMap(mb, { toggleDisplay: true}).addTo(map);    


var north = L.control({position: "bottomright"});
north.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src="img/north_arrow.png">';
    return div;
}
north.addTo(map);	
	

///////////////////////////////////////////////////////////////////////////////////////////////////	

var sql = cartodb.SQL({ user: 'jesssilver' });

var endCVI = 0;  
var sublayersCVI = [];

// CVI
function clearHazard(){

	if (endCVI > 0){sublayersCVI[endCVI-1].remove();}
	
	endCVI = endCVI + 1;
	
	var MapQueryCVI = "SELECT * FROM cv_bahamas_line_geo";
		
	var CartoCSSCVI = "#cv_bahamas_line_geo{line-color: #0080ff;line-width: 0;line-opacity: 0;}";
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

	  
}

function showHazard(){

	if (endCVI > 0){sublayersCVI[endCVI-1].remove();}
	
	var HTML1 = "";
	HTML1 = HTML1 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_1.png'></fieldset>";	
	var HTML2 = "";
	HTML2 = HTML2 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_2.png'></fieldset>";
	var HTML3 = "";
	HTML3 = HTML3 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_3.png'></fieldset>";
	var HTML4 = "";
	HTML4 = HTML4 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_3.png'></fieldset>";

	endCVI = endCVI + 1;
	
	var MapQueryCVI = "SELECT * FROM cv_bahamas_line_geo";
		
	if ($( "#scale option:selected" ).text()	== 'North/Northwestern Islands'){
		MapQueryCVI = MapQueryCVI + " WHERE isle_grp = 2";
		sql.getBounds(MapQueryCVI).done(function(bounds) {
		bounds[0][1] = bounds[0][1]+4;		
		bounds[0][3] = bounds[0][3]-4;
		map.fitBounds(bounds);
		});	
	}
	else if ($( "#scale option:selected" ).text()	== 'Central Islands'){
		MapQueryCVI = MapQueryCVI + " WHERE isle_grp = 3";
		sql.getBounds(MapQueryCVI).done(function(bounds) {
		bounds[0][1] = bounds[0][1]+3;		
		bounds[0][3] = bounds[0][3]-3;
		map.fitBounds(bounds);
		});	

	}
	else if ($( "#scale option:selected" ).text()	== 'South/Southeastern Islands'){
		MapQueryCVI = MapQueryCVI + " WHERE isle_grp = 4";
		sql.getBounds(MapQueryCVI).done(function(bounds) {
		bounds[0][1] = bounds[0][1]+4;		
		bounds[0][3] = bounds[0][3]-4;
		map.fitBounds(bounds);
		});	

	}

	var ck_SLR1 = document.getElementById('radio-1b');
	var ck_CH = document.getElementById('with');
	var ck_Map1 = document.getElementById('radio-1c');
	var ck_Map2 = document.getElementById('radio-2c');
	var ck_Map3 = document.getElementById('radio-3c');
	var ck_Map4 = document.getElementById('radio-4c');

	var CartoCSSCVI = "#cv_bahamas_line_geo{line-color: #0080ff;line-width: 2.25;line-opacity: 1;line-join:round;line-cap: round;line-smooth:0.25;}#cv_bahamas_line_geo{[zoom=8]{line-width: 1;}[zoom=9]{line-width: 2;}[zoom=10]{line-width: 2.5;}[zoom=11]{line-width: 3;}[zoom=12]{line-width: 4;}}";
	
	if ($( "#scale option:selected" ).text() == 'National'){
		if (ck_SLR1.checked){
			if(ck_Map1.checked){
				if (ck_CH.checked){
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei1_chs1 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei1_chs1 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei1_chs1 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei1_chs1 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei1_chs1 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei1_nhs1 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei1_nhs1 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei1_nhs1 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei1_nhs1 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei1_nhs1 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
			}
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_cb1_s1 <= 5]{line-color: #980043;}#cv_bahamas_line_geo [hro_cb1_s1 <= 0.53709697723388672]{line-color: #df65b0;}#cv_bahamas_line_geo [hro_cb1_s1 <= 0.44066798686981201]{line-color: #d4b9da;}#cv_bahamas_line_geo [hro_cb1_s1 = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			else if(ck_Map3.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_mg1_s1 <= 5]{line-color: #993404;}#cv_bahamas_line_geo [hro_mg1_s1 <= 0.04615899920463562]{line-color: #FFCC00;}#cv_bahamas_line_geo [hro_mg1_s1 <= 0.029265500605106354]{line-color: #fe9929;}#cv_bahamas_line_geo [hro_mg1_s1 = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML3;	
			}
			else{
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [man_rest = 1]{line-color: #d95f0e;}#cv_bahamas_line_geo [man_rest = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML4;	
			}
		}
		else{
			if(ck_Map1.checked){
				if (ck_CH.checked){
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei1_chs2 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei1_chs2 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei1_chs2 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei1_chs2 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei1_chs2 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei1_nhs2 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei1_nhs2 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei1_nhs2 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei1_nhs2 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei1_nhs2 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_cb1_s2 <= 5]{line-color: #980043;}#cv_bahamas_line_geo [hro_cb1_s2 <= 0.53709697723388672]{line-color: #df65b0;}#cv_bahamas_line_geo [hro_cb1_s2 <= 0.44066798686981201]{line-color: #d4b9da;}#cv_bahamas_line_geo [hro_cb1_s2 = 0]{line-color: #fff;}";	
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			else if(ck_Map3.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_mg1_s2 <= 5]{line-color: #993404;}#cv_bahamas_line_geo [hro_mg1_s2 <= 0.04615899920463562]{line-color: #FFCC00;}#cv_bahamas_line_geo [hro_mg1_s2 <= 0.029265500605106354]{line-color: #fe9929;}#cv_bahamas_line_geo [hro_mg1_s2 = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML3;	
			}
			else{
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [man_rest = 1]{line-color: #d95f0e;}#cv_bahamas_line_geo [man_rest = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML4;	
			}		
		}
	}
		
	else{
		if (ck_SLR1.checked){
			if(ck_Map1.checked){
				if (ck_CH.checked){
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei2_chs1 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei2_chs1 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei2_chs1 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei2_chs1 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei2_chs1 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei2_nhs1 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei2_nhs1 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei2_nhs1 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei2_nhs1 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei2_nhs1 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_cb2_s1 <= 5]{line-color: #980043;}#cv_bahamas_line_geo [hro_cb2_s1 <= 0.53709697723388672]{line-color: #df65b0;}#cv_bahamas_line_geo [hro_cb2_s1 <= 0.44066798686981201]{line-color: #d4b9da;}#cv_bahamas_line_geo [hro_cb2_s1 = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;					
			}
			else if(ck_Map3.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_mg2_s1 <= 5]{line-color: #993404;}#cv_bahamas_line_geo [hro_mg2_s1 <= 0.04615899920463562]{line-color: #FFCC00;}#cv_bahamas_line_geo [hro_mg2_s1 <= 0.029265500605106354]{line-color: #fe9929;}#cv_bahamas_line_geo [hro_mg2_s1 = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML3;	
			}
			else{
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [man_rest = 1]{line-color: #d95f0e;}#cv_bahamas_line_geo [man_rest = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML4;	
			}
		}
		else{
			if(ck_Map1.checked){
				if (ck_CH.checked){
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei2_chs2 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei2_chs2 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei2_chs2 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei2_chs2 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei2_chs2 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo[ei2_nhs2 <= 5]{line-color: #C00000;}#cv_bahamas_line_geo[ei2_nhs2 <= 2.8733398914337158]{line-color: #de2d26;}#cv_bahamas_line_geo[ei2_nhs2 <= 2.5598499774932861]{line-color: #FFCC00;}#cv_bahamas_line_geo [ei2_nhs2 <= 2.325779914855957]{line-color: #ffff00;}#cv_bahamas_line_geo[ei2_nhs2 <= 2.0800800323486328]{line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_cb1_s2 <= 5]{line-color: #980043;}#cv_bahamas_line_geo [hro_cb1_s2 <= 0.53709697723388672]{line-color: #df65b0;}#cv_bahamas_line_geo [hro_cb1_s2 <= 0.44066798686981201]{line-color: #d4b9da;}#cv_bahamas_line_geo [hro_cb1_s2 = 0]{line-color: #fff;}";	
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			else if(ck_Map3.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [hro_mg2_s2 <= 5]{line-color: #993404;}#cv_bahamas_line_geo [hro_mg2_s2 <= 0.04615899920463562]{line-color: #FFCC00;}#cv_bahamas_line_geo [hro_mg2_s2 <= 0.029265500605106354]{line-color: #fe9929;}#cv_bahamas_line_geo [hro_mg2_s2 = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML3;	
			}
			else{
				CartoCSSCVI = CartoCSSCVI + "#cv_bahamas_line_geo [man_rest = 1]{line-color: #d95f0e;}#cv_bahamas_line_geo [man_rest = 0]{line-color: #fff;}";
				document.getElementById("HazardLegend").innerHTML = HTML4;	
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
		layer.setZIndex(20);
		labels.setZIndex(100);
	  }).on('error', function() {
		// log the error
	  });

	  
}

var endSocial = 0;  
var sublayersSocial = [];

// SOCIAL
function showSocial(){

	if (endSocial > 0){sublayersSocial[endSocial-1].remove();}
	
	var HTML1 = "";
	HTML1 = HTML1 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_TotalPop.png'></fieldset>";	
	var HTML2 = "";
	HTML2 = HTML2 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_Elderly.png'></fieldset>";	
	var HTML3 = "";
	HTML3 = HTML3 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_Youth.png'></fieldset>";		
	
	endSocial = endSocial + 1;

	var ck_TotPop = document.getElementById('radio-1d');
	var ck_Elderly = document.getElementById('radio-2d');
	var ck_Youth = document.getElementById('radio-3d');

	var MapQuerySocial = "";
	var CartoCSSSocial = "#bahamas_social{polygon-fill: #252525;polygon-opacity: 1;line-width: 0;line-color: #FFF;line-opacity: 0;}";

	if(ck_TotPop.checked){
		CartoCSSSocial = CartoCSSSocial + "#bahamas_social[tot_pop = 4]{polygon-fill: #252525;line-width: 1;line-color: #252525;line-opacity: 1;}#bahamas_social[tot_pop = 3]{polygon-fill: #636363;line-width: 1;line-color: #636363;line-opacity: 1;}#bahamas_social[tot_pop = 2]{polygon-fill: #969696;line-width: 1;line-color: #969696;line-opacity: 1;}#bahamas_social[tot_pop = 1]{polygon-fill: #cccccc;line-width: 1;line-color: #cccccc; line-opacity: 1;}";
		MapQuerySocial = MapQuerySocial + "SELECT * FROM bahamas_social WHERE tot_pop > 0";
		document.getElementById("SocialLegend").innerHTML = HTML1;	
	}
	else if(ck_Elderly.checked){
		CartoCSSSocial = CartoCSSSocial + "#bahamas_social[more65 = 3]{polygon-fill: #636363;line-width: 1;line-color: #636363;line-opacity: 1;}#bahamas_social[more65 = 2]{polygon-fill: #969696;line-width: 1;line-color: #969696;line-opacity: 1}#bahamas_social[more65 = 1]{polygon-fill: #cccccc;line-width: 1;line-color: #cccccc;line-opacity: 1}";
		MapQuerySocial = MapQuerySocial + "SELECT * FROM bahamas_social WHERE more65 > 0";
		document.getElementById("SocialLegend").innerHTML = HTML2;	
	}
	else{
		CartoCSSSocial = CartoCSSSocial + "#bahamas_social[less15 = 3]{polygon-fill: #636363;line-width: 1;line-color: #636363;line-opacity: 1}#bahamas_social[less15 = 2]{polygon-fill: #969696;line-width: 1;line-color: #969696;line-opacity: 1}#bahamas_social[less15 = 1]{polygon-fill: #cccccc;line-width: 1;line-color: #cccccc;line-opacity: 1}";
		MapQuerySocial = MapQuerySocial + "SELECT * FROM bahamas_social WHERE less15 > 0";
		document.getElementById("SocialLegend").innerHTML = HTML3;	
	}

		
	  cartodb.createLayer(map, layerUrlSocial)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQuerySocial,
		  cartocss: CartoCSSSocial,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersSocial.push(sublayer);
		layer.setZIndex(19);
	  }).on('error', function() {
		// log the error
	  });

	  
}


function clearSocial(){

	if (endSocial > 0){sublayersSocial[endSocial-1].remove();}
	endSocial = endSocial + 1;

	var MapQuerySocial = "SELECT * FROM bahamas_social";
	var CartoCSSSocial = "#bahamas_social{polygon-fill: #252525;polygon-opacity: 0;line-width: 0;line-color: #FFF;line-opacity: 0;}";

	document.getElementById("SocialLegend").innerHTML = "";	
		
	  cartodb.createLayer(map, layerUrlSocial)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQuerySocial,
		  cartocss: CartoCSSSocial,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersSocial.push(sublayer);
		layer.setZIndex(19);
	  }).on('error', function() {
		// log the error
	  });

	 
}

/*
// zoom levels for quick zooms
document.getElementById('zooms').onclick = function(e) {
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
}
*/