const path = require("path")
const express = require("express");
var session = require('express-session');
var MemoryStore = require('memorystore')(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const firebase = require("./firebase/firebase.js");

require('dotenv').config({ path: '.env' });

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(cors({
    origin:[
        'http://localhost:8080', 
        'https://trik-memorija.herokuapp.com', 
        'https://trik-memorija.herokuapp.com/', 
        'https://trik-memorija-test.herokuapp.com',
        'https://trik-memorija-test.herokuapp.com/'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

app.use(session({ 
    secret: JSON.stringify(process.env.SECRET),
    cookie: {
        secure: true,
        sameSite: 'none',
        maxAge: 3600000
        // httpOnly: true
    },
    store: new MemoryStore({
        checkPeriod: 3600000 // prune expired entries every 24h
    }),
    saveUninitialized: true,
    resave: false
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// app.get("/api/num-of-entries", firebase.numOfEntries);
app.get("/api/entries", firebase.getData);
app.post("/api/save-data", firebase.saveData);
app.get("/api/start-game", firebase.startGame);
app.post("/api/end-game", firebase.endGame);
// app.get("/api/first-ten", firebase.firstTen);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log("Server is up!");
});