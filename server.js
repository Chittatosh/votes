// server.js where your node app starts
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import bodyParser from 'body-parser';
import axios from 'axios';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import passport from 'passport';
import {Strategy} from 'passport-facebook';

import apiRouter from './api';
import config from './config';
import App from './src/components/App';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(
    `${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`
  );
  next();
});
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

require('dotenv').config();
passport.use(new Strategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: 'http://localhost:8080/login/facebook/return'
}, function(accessToken, refreshToken, profile, cb) {
  // In this example, the user's Facebook profile is supplied as the user
  // record.  In a production-quality application, the Facebook profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  return cb(null, profile);
}));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());

// http://expressjs.com/en/starter/basic-routing.html 
app.set('view engine', 'ejs');
app.get('/', (request, response) => {
  //response.sendFile(__dirname + '/views/index.html');
  axios.get(config.serverUrl+'/api/all')
    .then(axiosResp => {
      response.render('index', {
        initialMarkup: ReactDOMServer.renderToString(
          <App pollArr={axiosResp.data} user={request.user} />
        ),
        pollArr: axiosResp.data,
        user: request.user
      });
    })
    .catch( error => {
      console.log(error);
    });
});
app.get('/login/facebook', passport.authenticate('facebook'));
app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.send(req.user);
});
app.use('/api', apiRouter);
app.use(express.static('public'));

// listen for requests :)
const listener = app.listen(config.port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
