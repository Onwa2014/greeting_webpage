
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');

module.exports = function(theModels) {

  let User = theModels.User;

  let displayResult = async function(req, res, next, data) {

    try {
      let counter = await User.count();
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
  };

  let addGreeting = async function(req, res, next) {
    var language = req.body.language

    var actualName = req.body.name;
    var results = "";

    try {

      let person = await User.findOne({
        name: actualName
      });

      if (!person) {

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

    User.remove({}, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/greetings');
      }
    });

  };

  let individualCounter = async function(req, res, next) {
    var user = req.params.user;
    try {
      let existingUser = await User.findOne({
        name: user
      });
      res.render('individualCounter', existingUser);
    } catch (err) {

      return next(err)
    }
  };


  let showGreeting = function(req, res) {
    res.render('greeting');
  };

  let showGreeted = async function(req, res, next){
    try {
       let namesGreeted = await User.find({});
       let greetedList = [];
       namesGreeted.forEach(function(name){
         greetedList.push(name.name)
       })
       if(greetedList.length === 0)
       {
         req.flash('empty', "Sorry there are no names stored on the database yet!")
         res.render('greeted')
       }
       else{
       res.render('greeted', {greetedList:greetedList})
      }
    }
    catch (err) {
      return next(err)
    }

  };

  return {
    addGreeting,
    showGreeting,
    resetData,
    individualCounter,
    showGreeted
  }
}
