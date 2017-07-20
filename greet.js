let models = null;
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');


let addGreeting = function(req, res, next) {
  var language = req.body.language

  let User = models.User;
  // var counter = models.User.count();
  // console.log(counter);
  var actualName = req.body.name;
  var results = "";

  User.findOne({
    name: actualName
  }, function(err, person) {
    if (err) {
      console.log(err)
      return next(err);
    }

    if (!person) {
      console.log("no person found")

      let newPerson = new User({
        name: actualName,
        count: 1
      });
      newPerson.save(function(error, data) {
        if (error) {
          results = error
          console.log(error);
        } else {
          console.log("successfully added new user");
          results = data
          //  counter ++
          // call count here... - what should you do in the Callback?
          User.count(function(err, counter) {
            if (err) {
              console.log(err);
              return next(err)
            } else {
              console.log(counter);
              req.flash('count', counter);
              req.flash('info', language + ", " + actualName);
              res.redirect('/greetings');
            }
          });
          
        }

      });

    } else {
      person.count = person.count + 1;

      var updateDone = function(error, status) {
        if (error) {
          console.log(error);
          return next(err)
        }
        //  req.flash('count', counter);
        req.flash('info', language + ", " + actualName);
        res.redirect('greetings');
      };

      person.save(updateDone);

      console.log("Here we go!");

    }
    // console.log(results);
    // return results;
  })
}

let resetData = function(req, res, next) {
  var task = req.body.reset;
  console.log(task);

  //return task

  let User = models.User;
  User.remove({}, function(err, data) {
    if (err) {
      console.log(err);
      // return next(err);
    } else {
      console.log(data);
      res.redirect('/greetings');
    }
  });

};

let showGreeting = function(req, res) {
  res.render('greeting');
}

module.exports = function(theModels) {
  //set the models for the routes
  models = theModels;

  return {
    addGreeting,
    showGreeting,
    resetData
  }
}
