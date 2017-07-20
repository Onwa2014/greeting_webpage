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

 app.get('/greetings', greet.showGreeting);
 app.post('/greetings', greet.addGreeting );

 app.use(function(err, req, res, next){
   res.send("<h3>Something went wrong!</h3> <pre>" + err.stack + "</pre>")
 });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
