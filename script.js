 `use strict`
 
 var latSet = 38.890385;
 var lngSet = -77.031989;
 var picArray = [];
 var map = "";
 var markerLayers = L.layerGroup();

 function mapLoad() {
  L.mapquest.key = 'dO0DHg2XnwETxE1afcFrGNOBG497aZMN';
  var popup = L.popup();
  map = L.mapquest.map('map', {
    center: [38.890385, -77.031989],
    layers: L.mapquest.tileLayer('map'),
    zoom: 9
    });
  markerLayers.addTo(map);
  map.on('click', function(e) {
  popup.setLatLng(e.latlng).openOn(this);
  L.mapquest.geocoding().reverse(e.latlng, generatePopupContent);
  clickCheck = true;
  // $("#startID").remove();
  //$(".startClass").empty();
  $('.container').removeClass('hidden');
  $('#step1').removeClass('highlight');
  $('#step2').removeClass('hidden');
  });

  function generatePopupContent(error, response) {
    var location = response.results[0].locations[0];
    var street = location.street;
    var city = location.adminArea5;
    var state = location.adminArea3;
    popup.setContent(street + ', ' + city + ', ' + state);
    latSet = location.latLng.lat;
    lngSet = location.latLng.lng;
    document.getElementById("locationDisplay").innerHTML = "Current Location is " + city + ", " + state;
  }}
      
function findPhoto(){
  /*Note: Fetchs photo from flickr and creates response1Json array*/
  fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=687eb792e1e156d401606b7f57f383bc&tags='+document.getElementById("tag").value+'&has_geo=1&accuracy=15&lat='+latSet+'&lon='+lngSet+'&radius=5'+document.getElementById("sort").value+'&extras=geo, description&format=json&nojsoncallback=1')
    .then(response1 => response1.json())
    .then(response1Json => createResultsArray(response1Json))
    .catch(error => console.log(error));  
}

function createResultsArray(response1Json){
  /*Note:creates picture URL allowing for display, also pushes data into picArray.*/
console.log("input count value is "+document.getElementById("count").value);
console.log("Total found results= "+ response1Json.photos.total);
console.log("createResultsArray function running");

var inputNum = parseInt(document.getElementById("count").value);
var resultsCount = parseInt(response1Json.photos.total); 
console.log("inputNum is " + inputNum);
console.log("resultsCount is " + resultsCount);

picArray = [];

if (inputNum > resultsCount){
  arrayCount = resultsCount;} 
  else {arrayCount = inputNum;}

  for (i=0; i < arrayCount; i++){
    picArray.push({
      server: response1Json.photos.photo[i].server, 
      id: response1Json.photos.photo[i].id, 
      secret: response1Json.photos.photo[i].secret, 
      lat: response1Json.photos.photo[i].latitude, 
      long: response1Json.photos.photo[i].longitude,
      title:response1Json.photos.photo[i].title,
      desc:response1Json.photos.photo[i].description._content, 
      picURL: 'https://live.staticflickr.com/'+response1Json.photos.photo[i].server+'/'+response1Json.photos.photo[i].id+'_'+response1Json.photos.photo[i].secret+'.jpg'}); 
  }
  document.getElementById("countDisplay").innerHTML = "Found "+ arrayCount + " results.";
  if(arrayCount.length = 0){alert("NO RESULTS FOUND, TRY NEW PARAMETERS!");}
   displayResults(picArray);
}

function displayResults(picArray){
//Resets markers and posts markers
  markerLayers.clearLayers();

 for(let i=0; i<picArray.length;i++){            
  L.mapquest.textMarker([picArray[i].lat, picArray[i].long], {
  text: `<a href="${picArray[i].picURL}" target="_blank"><img src = "${picArray[i].picURL}" class = "resultsIMG"></a>`,
  subtext:picArray[i].title,
  type: 'marker',
  position: 'top',
  icon: {
    primaryColor: '#333333',
    secondaryColor: '#333333',
    size: 'sm'
   }
  }).addTo(markerLayers);
}}

function submitBut(){
  //Button function
$('.subBut').click(event => {
  event.preventDefault();
  console.log('Button pushed, watch form function triggered');
  $('#step2').removeClass('highlight');
  findPhoto();
});}


$(function() {
  submitBut();
  mapLoad();
});