/**
 * Module dependencies.
 */

// creating the express app
var express = require('express');
var passport = require('passport');

// this will change depending on what third-parties you are using
var TwitterStrategy = require('passport-twitter').Strategy;

// these modules will allow you to make specific requests based off of the API
var superagent = require('superagent');
require('superagent-oauth')(superagent);
var OAuth = require('oauth');

var app = express();
var helpers = require('express-helpers');
helpers(app);
var server = require('http').createServer(app);


// your special consumer key and consumer secret for your app
// to get these, go create an app at https://dev.twitter.com/apps
// and follow the directions, then save the variables as strings
// of the keys
var TWITTER_CONSUMER_KEY = "The consumer key is exclusive to this application";
var TWITTER_CONSUMER_SECRET = "So it the consumer secret, but this one is... secret... shh!";



// establishing the IP and PORT
// fancy variable assignment, sets it as the IP address of your computer
// NOTE: your IP will change depending on where you are, during the development
// stage you will have to change the IP address on each third-party
// site every time you change locations
var IP_ADDRESS = function(){
  var os = require('os');
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (k in interfaces) {
      for (k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family == 'IPv4' && !address.internal) {
              addresses.push(address.address)
          }
      }
  }
  return addresses[0];
}();

// just pick 3000, it's easy to remember
var PORT = 3000;



// models (normally would save to a DB)
function User() {
  this.id = null;

  // we all start off as female, according to
  // https://www.youtube.com/watch?v=z1Kdoja3hlk
  this.firstname = "Jane";

  // but then you might become a guy
  if(Math.random() > 0.51){
    this.firstname = "John";
  }

  this.lastname = "Doe";

  // this is a blank object that i'm using to
  // assign various Twitter attributes to, 
  // such as the profile and various tokens
  this.twitter = new Object();
}

// this is the user object that is referenced
// throughout the application
var user = new User();



// all environments
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'keyboard cat' }));
	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



// serialize users
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



// Twitter strategy
// this first part deals with authenticating the user
// we're passing the consumer key, consumer secret, and callback URL to Twitter
// the function parameters are what is returned from a successful authentication
// those parameters are token, tokenSecret, and profile

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://"+IP_ADDRESS+":"+PORT+"/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {

    // you will want to save each of these to the user,
    // most likely in the DB in your case

    user.twitter.profile = profile;
    user.twitter.token = token;
    user.twitter.tokenSecret = tokenSecret;

    // returns the user to the application
    return done(null, user);
  }
));

// this function makes an HTTP request with SuperAgent
function getLastTweet(){

  // you need to make an OAuth object to sign the HTTP request
	var oauth = new OAuth.OAuth(

    // these can be found on the application's details page,
    // they are the same for all Twitter applications
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',

    // we used these before to authenticate the user, now
    // we need them to ensure that the HTTP request is coming
    // from a registered app
		TWITTER_CONSUMER_KEY,
		TWITTER_CONSUMER_SECRET,

    // honestly don't know what this stuff is for, just
    // put it in here
		'1.0A',
		null,
		'HMAC-SHA1'
	);

  // here is the actual HTTP request with SuperAgent
  // in this case, we're making a GET request POST 
  // requests are also an option, you can read more at
  // http://visionmedia.github.io/superagent/#post-/ put requests

  // this is the API URL, with the format '.json' and the parameter
  // 'count' set to 1. this returns it in a JSON format (easier with 
  // Node, IMO) and limits the number of tweets returned to 1, respectively
	superagent.get('https://api.twitter.com/1.1/statuses/user_timeline.json?count=1')

    // this is where we use the OAuth object from lines 149-167
    // and the token and tokenSecret we stored earlier
		.sign(oauth, user.twitter.token, user.twitter.tokenSecret)

    // this gets called after the request is made, and the 
    // response 'res' is the JSON we get from the request
		.end(function (res) {

      // setting the first object in the response array
      // as the last tweet from the user
			user.twitter.last_tweet = res.body[0];
	})
}



// routes
app.get('/', function(req, res) {
  // you can create EJS variables for displaying here, and set
  // the values to whatever you want. in this case, we're setting
  // the title to the exciting 'M2C Passport with Twitter', and
  // the user to the user variable we've been using
	res.render('index', { title: 'M2C Passport with Twitter', user: user });
});

// this route will be called when the user tries to connect to
// Twitter. from there, Passport magic happens
app.get('/auth/twitter', passport.authenticate('twitter'));

// this is the callback route that happens after the user puts
// in his or her information on the OAuth page. You can redirect
// the user to different places depending on whether or not they
// authenticated, but in my case, i'm just using the index page
// and a bunch of if statements in EJS anyways
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successReturnToOrRedirect: '/', failureRedirect: '/' }));

// this route will disconnect the user's Twitter account from
// the user, which in this instance just means setting the
// user's 'twitter' attribute to a blank object again
app.get('/disconnect/twitter', function(req, res) { user.twitter = new Object(); res.redirect('/'); });


// this route calls the function getLastTweet(), which does
// pretty much that (see lines 146-191), then redirects the user
// to the index page again
app.get('/tweet', function(req, res){ getLastTweet(); res.redirect('/'); });



// starting the server
server.listen(PORT);
// displaying the IP address and port, useful for copy and pasting
console.log('Express server started at '+IP_ADDRESS+':'+server.address().port);




