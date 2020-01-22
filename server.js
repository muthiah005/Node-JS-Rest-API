const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LIFE_TIME = 1000*60*60*2; // two hours
const app = express();
const port =  process.env.PORT || 9080;
const cors = require('cors');
const SECRET ="JS LOVE";

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    key:"user_session_id",
    secret:SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:LIFE_TIME
    }
}));

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.options('*', cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


// app.use((req, res, next) => {
//     if (req.cookies.user_session_id && !req.session.user) {
//         res.clearCookie('user_session_id');        
//     }
//     next();
// });

// let sessionChecker = (req,res,next) => {
//     if (req.session.user && req.cookies.user_session_id) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }    
// }


// define a simple route
app.get('/', (req, res) => {
    console.log(req.session);
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
});

require('./routes/product.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/tab.routes.js')(app);


app.listen(port, () => {
    console.log("Server is listening on port "+port);
});