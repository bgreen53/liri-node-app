require("dotenv").config();
var keys = require("./keys.js");
var fs= require("fs")
const axios = require('axios');
var Spotify = require('node-spotify-api');

var cmd = process.argv[2]
var term= process.argv[3]

 var concert = function() {
        axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp").then(
  function(response) {
    var data = response.data
    for(var i=0; i<data.length;i++){
    console.log("Venue Name: "+ data[i].venue.name);
    console.log("Venue Location: "+ data[i].venue.city)
    console.log("Concert Date: " + data[i].datetime)
    console.log("\n-----------\n")
}
  })
};


var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
  });

  
var song = function(){
spotify
.search({ type: 'track', query: term })
.then(function(response) {
var songData = response.tracks.items
for(var i=0; i<songData.length;i++){
console.log("Artist: " +songData[i].artists[0].name); 
console.log("Song: " +songData[i].name);   
console.log("Album: " +songData[i].album.name);
console.log("Preview: " +songData[i].preview_url);
console.log("\n-----------\n")
}
})
.catch(function(err) {
  console.log(err);
});
}

if(cmd==="concert-this"){
    concert()

}
if(cmd==="spotify-this-song"){
    song()

}