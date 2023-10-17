//initialize map
var map = L.map('map').setView([7.0, -1.09], 7);


// add Osm title layer to map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


 //Adding several Basemaps to leaflet
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
//.addTo(map);


var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});



//Region Layer Style
var regionStyle = {
    color : "blue",
    fillColor:"White",
    opacity : 0.3,
    weight: 1
}

//Greater Accra Layer Style
var accraStyle = {
    color : "red",
    fillColor:"White",
    opacity : 0.5,
    weight: 2
}

//Farm Location Style
var farmsStyle = {
    radius:5,
    fillColor:"black",
    color:"red",
}




//Add geojson layers to map

var regionlayer = L.geoJson(region,{
    style:regionStyle,
    onEachFeature:function (feature,layer){
        layer.bindPopup(feature.properties.region)
    }
}).addTo(map)






var farmslayer = L.geoJson(farms,{

    pointToLayer:function(feature,latlng) {
    return L.circleMarker(latlng, farmsStyle);   
},
onEachFeature:function (feature,layer){

    label = `Farm Location: ${feature.properties.Location}<br>`
    label += `Farm size: ${feature.properties.Null}<br>`

    layer.bindPopup(label)
    }
}).addTo(map)





//Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street Map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
};


//Layers
var overlays = {
    "Ghana Regions": regionlayer,
    "Farm Locations": farmslayer,

};


//Add layer control to map
L.control.layers(baseLayers, overlays).addTo(map);


//Add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);


//Add mouse move cordinates
map.on("mousemove", function(e){

	$("#coordinate").html(`Lat:${e.latlng.lat.toFixed(4)}, Lng:${e.latlng.lng.toFixed(4)}`)
})


//add Leaflet print controls
 
//Add scale to map
L.control.scale().addTo(map)

