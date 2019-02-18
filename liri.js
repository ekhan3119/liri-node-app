require("dotenv").config();

//Create variable to store required packages and files(key.js to hide my keys for the app)
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var log = console.log;
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');

// create variable to pass arguments in the liri cli
var command = process.argv[2];
//create var for user to input search item in the 2rd position of the index.
var search = process.argv.slice(3).join(" ");
log('search : ' + search);



//create function to call the Bands in Town Api
//node liri.js concert-this <artist/band name here>
function getBandName(artist) {
    //Url for the bands in town 
    //make the artist name dynamic value
    var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandUrl)
        .then(function (response) {

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
            fs.appendFile('log.txt', artistEventData, function (err) {
                if (err) throw err;
            });
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
        fs.appendFile('log.txt', songData, function (err) {
            if (err) throw err;
        });

    });
}

//node liri.js movie-this '<movie name here>'
function getMovieOMDB(movie) {
    if (!movie) {
        movie = "Mr. Nobody";
    }
    var movieUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //log(movieUrl);

    axios.request(movieUrl)
        .then(function (response) {
            //log(response);
            var movieData = [
                "-------------------------------------------",
                "\nTitle:  " + response.data.Title,
                "\nYear: " + response.data.Year,
                "\nIMBD Ratings: " + response.data.imdbRating,
                "\nRotten Tomatoes Rating: " + response.data.Ratings,
                "\nCounrty WhereProduced: " + response.data.Country,
                "\nLanguage: " + response.data.Language,
                "\nPlot: " + response.data.Plot,
                "\nActors: " + response.data.Actors,
                "\n-------------------------------------------"
            ].join('\n');
            log(movieData);
            fs.appendFile('log.txt', movieData, function (err) {
                if (err) throw err;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function doWhatItSays() {

    fs.readFile("random.txt", 'utf-8', function (err, data) {
        if (err) throw err;
        getSpotifySong(data);
    })
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
        doWhatItSays();
        break;
    default:
        log('Please enter a command \n node liri.js concert-this "artist_search" \n node liri.js spotify-this-song "song_search" \n node liri.js movie-this "movie_search"');
};