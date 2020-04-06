require("dotenv").config();
var keys = require("./keys.js");
var fs= require("fs")
const axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require("moment")


//varibles for capturing user input
var cmd = process.argv[2]
if(process.argv[3]){
var term= process.argv.slice(3)
}
var printData =[]

//console.log(term)
//function to run command from txt file
function doIt(){
  fs.readFile("random.txt","utf8",function(error,data){

    if(error){
      return console.log(error);
    }

    console.log(data);
    var dataArr = data.split(",");

    cmd= dataArr[0]
    term = dataArr[1].split(" ")
    

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
          console.log("I do not recognize that command. Please use 'concert-this <artist name>', 'spotify-this-song <song name>', or 'movie-this <movie name>'")
          break;
  }


  });
};

//bands in town api to return concert data
function concert() {
  if(!term){
    console.log("Please enter an artist")
  
  }else{
     bandTerm = term.join("%20")
        axios.get("https://rest.bandsintown.com/artists/" + bandTerm + "/events?app_id=codingbootcamp").then(
  function(response) {
    var data = response.data;
    
    for(var i=0; i<data.length;i++){
    var date = data[i].datetime.split("T").join(" ");
    var conDate = moment(date).format("MMM DD, YYYY h:mmA");
    console.log("Venue Name: "+ data[i].venue.name);
    console.log("Venue Location: "+ data[i].venue.city)
    console.log("Concert Date: " + conDate)
    console.log("\n-----------\n")
    
    printData = [
      "Venue Name: "+ data[i].venue.name,
      "\n"+"Venue Location: "+ data[i].venue.city,
      "\n"+"Concert Date: " + conDate,
      "\n-----------\n"
    ]
    print()
}
  })
}
};



//spotify api for returning song data
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
  });

  
function song(){
//if search term is blank return "The Sign" by Ace of Base

  if(!term){
    spotify
.search({ type: 'track', query: "the sign" 
})
.then(function(response) {
var songData = response.tracks.items
console.log("Artist: " +songData[0].artists[0].name); 
console.log("Song: " +songData[0].name);   
console.log("Album: " +songData[0].album.name);
console.log("Preview: " +songData[0].preview_url);
console.log("\n-----------\n");

printData = [
  "Artist: " +songData[0].artists[0].name,
  "\n"+"Song: " +songData[0].name,
  "\n"+"Album: " +songData[0].album.name,
  "\n"+"Preview: " +songData[0].preview_url,
  "\n-----------\n"
]
print();
})
.catch(function(err) {
  console.log(err);
});
    
}else{
//otherwise return search term results
console.log(term)
spotify
.search({ type: 'track', query: term 
})
.then(function(response) {
var songData = response.tracks.items
for(var i=0; i<songData.length;i++){
console.log("Artist: " +songData[i].artists[0].name); 
console.log("Song: " +songData[i].name);   
console.log("Album: " +songData[i].album.name);
console.log("Preview: " +songData[i].preview_url);
console.log("\n-----------\n")

printData = [
  "Artist: " +songData[i].artists[0].name,
  "\n"+"Song: " +songData[i].name,
  "\n"+"Album: " +songData[i].album.name,
  "\n"+"Preview: " +songData[i].preview_url,
  "\n-----------\n"
]
print();

}
})
.catch(function(err) {
  console.log(err);
});
}
}

//OMDB api for retuning movie data
function movie(){
var movQuery=("http://www.omdbapi.com/?t="+ term+"&y=&plot=short&apikey=trilogy")
//if search term is blank return "Mr.Nobody"
if(!term){
  movQuery=("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy")

}
//otherwise return search term results
// console.log(movQuery)
axios.get(movQuery).then(function(movRes){
    var movData = movRes.data
    console.log("Title: "+movData.Title)
    console.log("IMDB Rating: "+movData.Ratings[0].Value)
    console.log("Rotten Tomatoes: "+movData.Ratings[1].Value)
    console.log("Country: "+movData.Country)
    console.log("Language: "+movData.Language)
    console.log("Plot: "+movData.Plot)
    console.log("Cast: "+movData.Actors)
    console.log("\n-----------\n")
 
    printData = [
      "Title:" +movData.Title,
      "\n"+"IMDB Rating: "+movData.Ratings[0].Value,
      "\n"+"Rotten Tomatoes: "+movData.Ratings[1].Value,
      "\n"+"Country: "+movData.Country,
      "\n"+"Language: "+movData.Language,
      "\n"+"Plot: "+movData.Plot,
      "\n"+"Cast: "+movData.Actors,
      "\n-----------\n"
    ]
    print()     

});
}

//Print results to log file
function print(){
  fs.appendFile('log.txt', printData, function (err) {
    if (err) throw err;
    console.log('Log Updated!');
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
    case "do-what-it-says":
    doIt()
        
    break;

    default:
        console.log("I do not recognize that command. Please use 'concert-this <artist name>', 'spotify-this-song <song name>', 'movie-this <movie name>', or 'do-what-it-says'")
        break;
}

