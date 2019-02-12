require("dotenv").config();

//Create variable to store required packages and files(key.js to hide my keys for the app)
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require('axios');
var fs = require('fs');
var moment = require('moment');

// create variable to pass arguments in the liri cli
var command = process.argv[2];
//create var for user to input search item in the 2rd position of the index.
var search = process.argv.slice(3).join(" ");
log('search : ' + search);

//create a function to store console.log for shortcut
function log(value) {
    console.log(value);
}

//write a code/function that can take one of the command from list and gets the correct api and returns correct user search.(concert-this,spotify-this-song, movie-this, do-what-it-says)
/* function liriSearch(command, search) {
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

}; */
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
                "-----------------------",
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


function getSpotifySong(item) {
    if (!item) {
        item = "The Sign by Ace Of Base";
    }

    spotify.search({ type: 'track', query: item, limit: 4 }, function (err, data) {
        if (err) {
            return log('Error occurred: ' + err);
        }

        var songData = [
            "-------------------------------------------",
            "\nArtist Name:  " + data.tracks.items[0].album.artists[0].name,
            "\nSong Name: " + data.tracks.items[0].name,
            "\nSong Preview link: " + data.tracks.items[0].href,
            "\nAlbum: " + data.tracks.items[0].album.name,
            "\n-------------------------------------------"
        ].join('\n')
        log(songData);

        fs.appendFile("random.txt", songData, function (err) {
            if (err) throw err;
        })

    });
}

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
    default:
        log('Please enter a command \n node liri.js concert-this "artist_search" \n node liri.js spotify-this-song "song_search" \n node liri.js movie-this "movie_search"');
};