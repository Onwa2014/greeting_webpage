//let models = null;
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');

module.exports = function(theModels) {
  //set the models for the routes
  //models = theModels;
  let User = theModels.User;

  let displayResult = async function(req, res, next, data) {

    try {
      let counter = await User.count();
      console.log(data.language);
      if( !data.actualName ){
        req.flash('error', 'Please write a name on the textbox.');
        res.redirect('/greetings');
      }
      else if(!data.language){
        req.flash('error', 'Please select a language you would like to be greeted on.');
        res.redirect('/greetings');
      }
      else{
      req.flash('count', counter);
      req.flash('info', data.language + ", " + data.actualName);
      res.redirect('/greetings');
      }
    } catch (err) {
      return next(err);
    }
  }

  let addGreeting = async function(req, res, next) {
    var language = req.body.language

    //let User = models.User;
    // var counter = models.User.count();
    // console.log(counter);
    var actualName = req.body.name;
    var results = "";

    try {

      let person = await User.findOne({
        name: actualName
      });

      if (!person) {

        console.log("no person found")

        let newPerson = new User({
          name: actualName,
          count: 1
        });

        await newPerson.save();

      } else {
        person.count = person.count + 1;
        await person.save();
      }

      displayResult(req, res, next, {
        language,
        actualName
      });

    } catch (err) {
      return next(err);
    }

  }

  let resetData = function(req, res, next) {
    var task = req.body.reset;
    console.log(task);

    //return task

    User.remove({}, function(err, data) {
      if (err) {
        console.log(err);
        // return next(err);
      } else {
        //console.log(data);
        res.redirect('/greetings');
      }
    });

  };

  let individualCounter = async function(req, res, next) {
    var user = req.params.user;
    console.log(user);
    try {
      let existingUser = await User.findOne({
        name: user
      });
      console.log(existingUser);
      res.render('individualCounter', existingUser);
    } catch (err) {

      return next(err)
    }
  };


  let showGreeting = function(req, res) {
    res.render('greeting');
  }




  return {
    addGreeting,
    displayResult,
    showGreeting,
    resetData,
    individualCounter
  }
}
