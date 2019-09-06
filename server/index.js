require('dotenv').config();
const express = require('express'),
      cors = require('cors'),
      massive = require('massive'),
      session = require('express-session'),
      chalk = require('chalk')

// Controller Functions
const authCtrl = require('./controllers/auth_controller');

//ENV Variables
const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

// App Instance
const app = express();

// TLM
app.use(express.json());
app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}));

// Database Connection
massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
        console.log(chalk.magenta('Database Connected 🦄'));
    })
    .catch(error => {
        console.log(chalk.red('Databse connection failed, figure it out dummy'));
    });

// Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.delete('/auth/logout', authCtrl.logout);

// Server Listening
app.listen(SERVER_PORT, () => console.log(chalk.magenta('Server is running! 👩‍🎤')));