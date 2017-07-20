//let models = null;
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');

module.exports = function(theModels) {
  //set the models for the routes
  //models = theModels;
  let User = theModels.User;

  let diplayResult = async function(req, res, next, data) {

    try {
      let counter = await User.count();
      req.flash('count', counter);
      req.flash('info', data.language + ", " + data.actualName);
      res.redirect('/greetings');
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

      diplayResult(req, res, next, {
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

  let individualCounter = function(req, res){
    var user = req.params.user;
    console.log(user);
    User.findOne({name:user}, function(err, userdata){
      if(err){
        console.log(err);
      }
      else{
        console.log(userdata);
        res.render('individualCounter', userdata)
      }
    });
  };


  let showGreeting = function(req, res) {
    res.render('greeting');
  }




  return {
    addGreeting,
    showGreeting,
    resetData,
    individualCounter
  }
}
