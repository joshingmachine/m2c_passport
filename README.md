m2c_passport
============

Developed by Josh Smith (jjs1@andrew.cmu.edu)

An example application for Mobile to Cloud that allows users 
to sign in with Twitter and make API calls to Twitter for a tweet.
It uses Node.js, Express, Passport, SuperAgent, and some other
cool stuff too.

Developers can use this to make their own Twitter applications,
or use it as a foundation for apps that use different third-parties

============
FAQ

Q. What's the first thing I should do?
A. Go to https://dev.twitter.com/apps and create a new application. You'll need a Twitter account.

Q. What do I need to NPM install?
A. Install the following Node Packaged Modules (via 'npm install' in your Express app directory)
   
   passport
   passport-twitter
   oauth
   superagent
   superagent-oauth
   express-helpers   (install this one if you're using EJS, it will save you some agony)
   
   That's it for getting this application to work. If you are using another third-party that requires
   authentication, such as Facebook, Foursquare, LinkedIn, etc., you can swap out 'passport-twitter'
   for the appropriate third-party (make sure Passport supports it by checking https://npmjs.org/search?q=passport)
   
Q. Why did you choose Twitter to demo this?
A. It's a widely-used platform that has a authentication setup that is easy for developers to get
   acquainted with and use as a foundation for working with other third-parties.

Q. Is developing for other third-parties identical to this?
A. No, unfortunately. Each one seems to have it's own quirks




