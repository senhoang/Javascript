const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const port = 3000;


// app.use(bacbaove)

function bacbaove(req, res, next) {
  if  (['vethuong','vevip'].includes(req.query.ve)) {
    req.face = 'gach gach gach';
    return next();
  }
  res.status(403).json({
    message: "Access denided"
  });
}

const route = require('./routes');
const db = require('./config/db')

// Connect to DB
db.connect()

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
  }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Home, search, contact

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
