# angular-tdd-ci
Example JobFinder app for Continuous Integration and Deployment for AngularJS and Node.js course on
Pluralsight by [Alexander Zanfir](http://www.pluralsight.com/author/alex-zanfir)

For local development, with node, git and mongo pre-installed:
```sh
npm install -g bower  # if necessary
npm install -g nvm    # if necessary
git clone git@github.com:growlybear/angular-tdd-ci.git
cd angular-tdd-ci
npm install           # NOTE will run 'bower install' via the postinstall hook
mkdir config
touch config/development.json
touch config/production.json    # etc.
```

Fill in development and production configs with appropriate values, eg.:
```json
{
  "DB_CONN_STR": "mongodb://localhost/jobfinder"
}
```

To run the app locally, from the root directory:
```sh
npm start
# or
DEBUG=app:* app/bin/www
```

The app is currently running on Heroku at https://intense-retreat-3770.herokuapp.com/ during
development. To install into your own Heroku account:

```sh
heroku create
heroku config:set DB_CONN_STR=<whatevs>
git push heroku master
heroku open
```
