M2C Passport
============

Developed by Josh Smith (jjs1@andrew.cmu.edu)

An example application for Mobile to Cloud that allows users 
to sign in with Twitter and make API calls to Twitter for a tweet.
It uses Node.js, Express, Passport, SuperAgent, and some other
cool stuff too.

Developers can use this to make their own Twitter applications,
or use it as a foundation for apps that use different third-parties

============
##FAQ

####Q. What should I know before I read any further?

A. You should know how to develop Node.js apps with the Express framework. A rough idea of how AJAX works is
   important, and how APIs work. You should (at least in terms of this specific application) be familiar
   with Twitter, the concept of tweets, and have some familiarity with the Twitter API and various calls.


####Q. What's the first thing I should do?

A. Go to https://dev.twitter.com/apps and create a new application. You'll need a Twitter account.
   Most third-parties that have APIs will require you to sign up for an account with them first.


####Q. What do I need to NPM install?

A. The following modules should install automagically (they're located in the <code>package.json</code> file). However, if for whatever reason you need to install the following Node Packaged Modules manually, use <code>npm install</code> for each of these NPMs:
   
   * passport
   * passport-twitter
   * oauth
   * superagent
   * superagent-oauth
   * express-helpers   (install this one if you're using EJS, it will save you some agony)
   
That's it for getting THIS application to work. If you are using another third-party that requires
authentication, such as Facebook, Foursquare, LinkedIn, etc., you can swap out 'passport-twitter'
for the appropriate third-party (make sure Passport supports it by checking https://npmjs.org/search?q=passport)
 

####Q. Why did you choose Twitter to demo this?

A. It's a widely-used platform that has a authentication setup that is easy for developers to get
   acquainted with and use as a foundation for working with other third-parties.


####Q. I keep getting the error "500 Error: Failed to find request token in session"

A. A common reason for this is that it's running into a cross-site request forgery (CSRF). Hopefully you know
   about this, but if not, in plain terms it essentially means that the site making the request is changing
   unexpectedly. How do you solve this? Never use <code>localhost:PORT_NUMBER</code> to pull up the application. Instead,
   always use your current IP address (this is easy because I included a function you can steal that automatically
   displays your IP and port in the console whenever you start the server).

   If that's not the reason for the 500 Error, I'm sorry, but your issue is probably more specific than I can
   deal with via FAQ, so best turn to Google at this point.


####Q. Is developing for other third-parties identical to this?

A. No, unfortunately. Each one seems to have it's own quirks. For example, with Foursquare you have to
   pass the tokens through the URL. Generally, though, the basic structure is the same across third parties
   that use Passport.


####Q. Why is that thing in your comments/code wrong?

A. I'm the first to admit that I'm not tech-savvy, and a lot of what I know about Passport and developing for
   third parties has come from copy and pasting, Stack Overflow, and banging my head against my desk. While the
   code should work — given that the developer creates a valid application with Twitter and sets the appropriate
   key values in app.js — some of my code may be incredibly inefficient or pitiful, or my comments may be innacurate.


####Q. I don't get it. I... I just don't get it... [SOBS]

A. That's okay, I was there too. I still am, in many ways. But if you need help, I recommend checking out the 
   resources below — they were vital to my ability to have anything functional. If you need any additional help,
   feel free to shoot me an email at jjs1@andrew.cmu.edu, with something attention-grabbing in the subject line,
   and I'll try to respond as quickly as possible. If you're really stuck, I may be able to meet with you in person;
   to set that up, once again, try to email me.


==========
##RESOURCES

####Understanding OAuth
* http://lifehacker.com/5918086/understanding-oauth-what-happens-when-you-log-into-a-site-with-google-twitter-or-facebook

####Passport & Jared Hanson
* http://passportjs.org/
* https://github.com/jaredhanson
* https://github.com/jaredhanson?tab=repositories
* https://github.com/jaredhanson/passport/wiki/Strategies
* http://blog.nodeknockout.com/post/66118192565/getting-started-with-passport

####SuperAgent
* http://visionmedia.github.io/superagent/
* https://npmjs.org/package/superagent
* https://github.com/visionmedia/superagent

####Twitter
* https://dev.twitter.com/
* https://npmjs.org/package/passport-twitter
* https://github.com/jaredhanson/passport-twitter
* https://github.com/jaredhanson/passport-twitter/tree/master/examples/signin

####Facebook
* https://developers.facebook.com/
* https://npmjs.org/package/passport-facebook
* https://github.com/jaredhanson/passport-facebook
* https://github.com/jaredhanson/passport-facebook/tree/master/examples/login

####LinkedIn
* https://developer.linkedin.com/
* https://npmjs.org/package/passport-linkedin
* https://github.com/jaredhanson/passport-linkedin
* https://github.com/jaredhanson/passport-linkedin/tree/master/examples/login

####Foursquare
* https://developer.foursquare.com/
* https://npmjs.org/package/passport-foursquare
* https://github.com/jaredhanson/passport-foursquare
* https://github.com/jaredhanson/passport-foursquare/tree/master/examples/login

####Google
* https://npmjs.org/package/passport-google
* https://github.com/jaredhanson/passport-google
* https://github.com/jaredhanson/passport-google/tree/master/examples/signon

####General Help
* http://stackoverflow.com/
* http://stackoverflow.com/questions/tagged/passport










