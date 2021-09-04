const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const port = 3000;


const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db')

// Connect to DB
db.connect()

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(SortMiddleware)

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
      sortable: (filed, sort) => {
        const sortType = filed === sort.column ? sort.type : 'default'

        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        }
        const  types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }

        const icon = icons[sortType]
        const type = types[sortType]
        
        return `<a href="?_sort&column=${filed}&type=${type}">
                  <span class="${icon}"></span>
                </a>`
      }
    },
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
