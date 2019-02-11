//add(dotenv)to read and set any environment variables with the dotenv package
require("dotenv").config();

//Create variable to store required packages and files(key.js to hide my keys for the app)
//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');

var axios = require('axios');
//var fs = require('fs');
var moment = require('moment');

// create variable to pass arguments in the liri cli
var command = process.argv[2];
//create var for user to input search item in the 2rd position of the index.
var search = process.argv.slice(3).join(" ");
log('search : ' + search);

//create a function to store console.log for shortcut
function log(value){
    console.log(value);
}

//write a code/function that can take one of the command from list and gets the correct api and returns correct user search.(concert-this,spotify-this-song, movie-this, do-what-it-says)
function liriSearch(command,search){
    switch (command) {
        case 'concert-this':
            getBandName(search);
            break;

        case 'spotify-this-song':
            getSpotifySong(search);
            break;

        case 'movie-this':
            getMovieOMDB(search);
            break;

        case 'do-what-it-says':
            getRandom(search);
            break;
        //if user does not enter a valid key word then show this
        default:
           log("Enter a valid command: 'concert-this','spotify-this-song', 'movie-this'")
    }

};
//create function to call the Bands in Town Api
//node liri.js concert-this <artist/band name here>
function getBandName(artist) {
    //Url for the bands in town 
    //make the artist name dynamic value
    var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandUrl)
        .then(function (response) {
            //this is a loop that returns all the concerts of a artist. This code works but I am commenting it out beacuse I wanted to display the first one only.(I was practices the different ways that I can write the same this or slightly different)
           /*   for(var i = 0; i < response.data.length; i++){
                var venue = response.data[i].venue.name;
                log(venue);
                var city = response.data[i].venue.city;
                log(city);
                var country = response.data[i].venue.country;
                log(country);
                var date = moment(response.data[i].venue.datetime).format('MM/DD/YY');
                //var newDate = moment(date).format('MM/DD/YY');  
                log(date);
                log('===================');

                } */
 

            //console.log(response.data[0]);
           var data = response.data[0]; 
            log(data);
            var artistEventData = [
                "-----------------------" ,
                "\nArtist: " + artist,
                "\nVenue: " + data.venue.name,
                "\nLocation: " + data.venue.city + "," + data.venue.country,
                "\nDate: " + moment(data.datetime).format('MM/DD/YY'),
                "------------------------"
            ].join('\n');
            log(artistEventData);
             
        }) 
        .catch(function (error) {
            log(error);
        });
};


//node liri.js spotify-this-song '<song name here>'
var spotify = new Spotify({
  id: 'd0a3bfa326cc4e3d8f581175a970d2d7',
  secret: '9a3044b4a063477f8dbebc3350f4519b'
});//create instance

function getSpotifySong(item){
    spotify.search({ type: 'track', query: item, limit: 10 }, function(err, data) {
        if (err) {
        return log('Error occurred: ' + err);
    }
    log(data.tracks.items); 

    });
}
if (command === 'concert-this'){
getBandName(search);
}
if (command === 'spotify-this-song'){
    getSpotifySong('All the small things');

} else {
    log('Please input "concert-this" before artist name search to get the valid response');
};

 






