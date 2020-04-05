// require("dotenv").config();
var keys = require("./keys.js");
var fs= require("fs")
const axios = require('axios');

var cmd = process.argv[2]
var artist= process.argv[3]

 var concert = function() {
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
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
   


if(cmd==="concert-this"){
    concert()

}