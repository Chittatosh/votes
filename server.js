// server.js where your node app starts
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import bodyParser from 'body-parser';
import apiRouter from './api';

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

app.set('view engine', 'ejs');

// http://expressjs.com/en/starter/basic-routing.html 
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.render('index', {
    initialMarkup: ReactDOMServer.renderToString(<App/>)
  });
});

app.use('/api', apiRouter);
app.use(express.static('public'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
