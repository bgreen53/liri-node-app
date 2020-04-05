require("dotenv").config();
var keys = require("./keys.js");
var fs= require("fs")
const axios = require('axios');
var Spotify = require('node-spotify-api');


//varibles for capturing user input
var cmd = process.argv[2]
var term= process.argv.slice(3)


//bands in town api to return concert data
function concert() {
     songTerm = term.join("%20")
        axios.get("https://rest.bandsintown.com/artists/" + songTerm + "/events?app_id=codingbootcamp").then(
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



//spotify api for returning song data
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
  });

  
function song(){
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

//OMDB api for retuning movie data
function movie(){
axios.get("http://www.omdbapi.com/?t="+ term+"&y=&plot=short&apikey=trilogy").then(function(movRes){
    var movData = movRes.data

 console.log("Title: "+movData.Title)
 console.log("IMDB Rating: "+movData.Ratings[0].Value)
 console.log("Rotten Tomatoes: "+movData.Ratings[1].Value)
 console.log("Country: "+movData.Country)
 console.log("Language: "+movData.Language)
 console.log("Plot: "+movData.Plot)
 console.log("Cast: "+movData.Actors)



});
}

//switch statements to call functions based on user command

switch (cmd.toLowerCase()) {
    case "concert-this":
    concert()
        
    break;

    case "spotify-this-song":
    song()
        
    break;
    case "movie-this":
    movie()
        
    break;

    default:
        console.log("I do not recognize that command. Please use 'concert-this', 'spotify-this-song', or 'movie-this'")
        break;
}

