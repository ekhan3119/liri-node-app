# liri-node-app

fs.appendFile("random.txt", search, function(err) {

  // If an error was experienced we will log it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }
});



/* var spotify = new Spotify({
    id: 'd0a3bfa326cc4e3d8f581175a970d2d7',
    secret: 'f5fa2b5a59a24051bb2eec41f4890485'
});//create instance */