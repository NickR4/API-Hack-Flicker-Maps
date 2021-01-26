 `use strict`
 
 var latSet = 0;
 var lngSet = 0;
 
 function mapLoad() {
 var locSet = document.getElementById("locID").textContent;

 console.log(locSet);  
  L.mapquest.key = 'dO0DHg2XnwETxE1afcFrGNOBG497aZMN';

  var popup = L.popup();

  var map = L.mapquest.map('map', {
    center: [38.890385, -77.031989],
    layers: L.mapquest.tileLayer('map'),
    zoom: 14
      });

        //map.addControl(L.mapquest.control());

  map.on('click', function(e) {
  popup.setLatLng(e.latlng).openOn(this);
  L.mapquest.geocoding().reverse(e.latlng, generatePopupContent);
   
    });

  function generatePopupContent(error, response) {
    var location = response.results[0].locations[0];
    var street = location.street;
    var city = location.adminArea5;
    var state = location.adminArea3;
    popup.setContent(street + ', ' + city + ', ' + state);
    //console.log(location);
    latSet = location.latLng.lat;
    lngSet = location.latLng.lng;
    
  /*$('.locC').replaceWith(
    `<p>Latitude ='+${location.latLng.lat}+' Longitude = '+${location.latLng.lng}+'</p>`)*/
      }}
      
function findPhoto(){
  /*Note: Fetchs photo from flickr and creates response1Json array*/
  console.log("find photo function triggered");
  console.log (document.getElementById("search").value)
  console.log("cordinates logged as " +latSet, lngSet);
  //console.log(latSet);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=687eb792e1e156d401606b7f57f383bc&tags='+document.getElementById("search").value+'&has_geo=1&accuracy=15&lat=45.5&lon=-122.5&radius=5&extras=geo&format=json&nojsoncallback=1')
    .then(response1 => response1.json())
    .then(response1Json => console.log(response1Json))
    .catch(error => console.log(error));  
    
    //console.log(response1Json);  
}

function submitBut(){
$('form').submit(event => {
  console.log('Button pushed, watch form function triggered');
  findPhoto();
    });}

$(function() {
  submitBut();
  mapLoad();
});