var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');

var Greet = require('./greet');

const Models = require('./models');

const models = Models(process.env.MONGO_URL || 'mongodb://localhost/greetedUsers')

//the routes
let greet = Greet(models);
//let other = OtherRoutes(models);

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// Create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.engine( 'hbs', hbs( { extname: 'hbs', defaultLayout: 'main'}))
app.set( 'view engine', 'hbs' );

 var greeted = {};
 var counter = 0;

 //app.get('/other', other.routes2);

 app.get('/greetings', greet.showGreeting);
 app.post('/greetings', greet.addGreeting );





 //   var name = req.body.name;
 //
 //   console.log(">>>>>>>>>>" + greet.greetUser(name));
 // });

 // app.post('/greetings', function(req,res){
 //   var user = req.body.name;
 //   var language = req.body.language;
 //
 //   if(greeted[user] === undefined){
 //      greeted[user] = 0;
 //      counter ++
 //    }
 //    greeted[user] = greeted[user] + 1;
 //    req.flash('info', language + user);
 //    req.flash('count', counter);
 //    res.redirect("greetings");
 // });
 //
 //  app.get('/counter/:user', function (req, res) {
 //    var user = req.params.user;
 //    res.send('Hello'+ " " + user +" "+ 'has been greeted ' + " "+ greeted[user] + ' '+ 'times' )
 //  });
 //
 //  app.get('/greeted', function (req, res) {
 //    var greetedNames =[];
 //    var linkNames =[]
 //    for(key in greeted){
 //      greetedNames.push(key);
 //    };
 //    greetedNames.forEach(function(name){
 //    linkNames.push("<a href=/counter/" + name + ">" + name + "</a>")
 //    });
 //    res.send("Greeted names list " +linkNames)
 //  });


 app.use(function(err, req, res){
   res.send("<h3>Something went wrong!</h3> <pre>" + err.stack + "</pre>")
 });


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
