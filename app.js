const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('static'));

const session = require('express-session');


// You need to copy the config.template.json file and fill out your own secret
const config = require('./config/config.json');

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));


const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 8 requests per windowMs
});

app.use('/signup', authLimiter);
app.use('/login', authLimiter);


/* Setup Knex with Objection */

const { Model } = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js');

const knex = Knex(knexfile.development);

Model.knex(knex);

// Setting templating engine
app.set('view engine', 'ejs');

// Import routes
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/accounts.js');

// Setting routes as middleware
app.use(authRoute);
app.use(usersRoute);

app.get('/', (req, res) => {
    let { error } = req.query;
    if (req.session.message) {
        error = req.session.message;
    }
    const { value } = req.session;
    return res.render('home/home.ejs', {
        error: error ? error : 'noError',
        session: value ? value : 'noSession'
    });
});




const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log('Server is running on the port', PORT);
})