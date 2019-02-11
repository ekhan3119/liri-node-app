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



if (chance === 1) {

    // We will then add $2 to the account.
    fs.appendFile("bank.txt", ", 2", function(err) {
      if (err) {
        return console.log(err);
      }
    });

    // And tell the user the amount was added.
    console.log("Congrats you won the lottery!");

  // Otherwise we will tell them they lost 25 cents.
  }
  else {
    console.log("Sorry. You just lost 25 cents. Maybe you should get a job instead.");
  }