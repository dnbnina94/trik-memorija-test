const firebase = require('firebase');
const { v4: uuidv4 } = require('uuid');
const utils = require("../utils.js");
const validator = require('validator');
// var response = require("../response.json");
var final = require("../final.json");

require('dotenv').config({ path: '.env' });

const BR_ISECKA_ERROR_MSG = "Br. fiskalnog isečka je već iskorišćen.";
const TOO_MANY_REQUESTS = "Poslat je veliki broj zahteva. Probaj ponovo malo kasnije.";
const DEFAULT_ERROR_MSG = "Došlo je do greške.";
const IME_EMPTY_ERROR_MSG = "Ime ne sme ostati prazno.";
const IME_ERROR_MSG = "Ime sme sadržati samo slova.";
const PREZIME_EMPTY_ERROR_MSG = "Prezime ne sme ostati prazno.";
const PREZIME_ERROR_MSG = "Prezime sme sadržati samo slova.";
const EMAIL_EMPTY_ERROR_MSG = "Email ne sme ostati prazan.";
const EMAIL_ERROR_MSG = "Email adresa je neispravna.";
const TELEFON_EMPTY_ERROR_MSG = "Mobilni telefon ne sme ostati prazan.";
const TELEFON_ERROR_MSG = "Mobilni telefon nije u ispravnom formatu.";
const BR_ISECKA_EMPTY_ERROR_MSG = "Br. fiskalnog isečka mora sadržati između 4 i 10 cifara.";
const BR_ISECKA_INVALID_ERROR_MSG = "Br. fiskalnog isečka sme sadržati samo brojeve.";
const FINISHED_MSG = "Nagradni konkurs je završen.";

const TIME_LIMIT = 30000;

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

exports.getData = (req, res) => {
    try {
        // const date = req.query.date;

        // const results = final.filter(e => {
        //     return e.datum.includes(date);
        // })

        // res.send(results);

        const date = new Date(req.query.date);

        if (!isValidDate(date)) {
            throw new Error();
        }

        let minDate = new Date(date);
        minDate.setHours(0);
        minDate.setMinutes(0);
        minDate.setSeconds(0);
        minDate.setMilliseconds(0);

        let maxDate = new Date(date);
        maxDate.setHours(23);
        maxDate.setMinutes(59);
        maxDate.setSeconds(59);
        maxDate.setMilliseconds(999); 

        minDate = firebase.firestore.Timestamp.fromDate(minDate);
        maxDate = firebase.firestore.Timestamp.fromDate(maxDate);

        database.collection('entries')
        .orderBy('datum')
        .where('datum', '>=', minDate)
        .where('datum', '<=', maxDate)
        .where('validan', '==', true)
        .get()
        .then(snapshot => {
            const results = [];

            snapshot.forEach(snapshotChild => {
                results.push({
                    ...snapshotChild.data()
                })
            });

            results.sort((a,b) => a.vreme - b.vreme);

            res.send(results.map(r => {
                return {
                    ime: r.ime,
                    prezime: r.prezime,
                    vreme: r.vreme
                }
            }));

        }).catch(err => {
            console.log(err);
            res.status(400).send({
                message: DEFAULT_ERROR_MSG
            });
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            message: DEFAULT_ERROR_MSG
        });
    }
};

exports.saveData = (req, res) => {
    try {

        if (req.body.data.ime === undefined || !validator.isLength(req.body.data.ime+'', {min: 1})) {
            const error = new Error(IME_EMPTY_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (
            !validator.isAlpha(req.body.data.ime+'') &&
            !validator.isAlpha(req.body.data.ime+'', 'sr-RS') &&
            !validator.isAlpha(req.body.data.ime+'', 'sr-RS@latin')
        ) {
            const error = new Error(IME_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (req.body.data.prezime === undefined || !validator.isLength(req.body.data.prezime+'', {min: 1})) {
            const error = new Error(PREZIME_EMPTY_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (
            !validator.isAlpha(req.body.data.prezime+'') &&
            !validator.isAlpha(req.body.data.prezime+'', 'sr-RS') &&
            !validator.isAlpha(req.body.data.prezime+'', 'sr-RS@latin')
        ) {
            const error = new Error(PREZIME_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (req.body.data.email === undefined || !validator.isLength(req.body.data.email, {min: 1})) {
            const error = new Error(EMAIL_EMPTY_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (!validator.isEmail(req.body.data.email)) {
            const error = new Error(EMAIL_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (req.body.data.telefon === undefined || !validator.isLength(req.body.data.telefon, {min: 1})) {
            const error = new Error(TELEFON_EMPTY_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (!validator.isMobilePhone(req.body.data.telefon, 'sr-RS')) {
            const error = new Error(TELEFON_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (req.body.data.brisecka === undefined || !validator.isLength(req.body.data.brisecka, {min: 4, max: 10})) {
            const error = new Error(BR_ISECKA_EMPTY_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        if (!validator.isNumeric(req.body.data.brisecka)) {
            const error = new Error(BR_ISECKA_INVALID_ERROR_MSG);
            error.code = "400";
            throw error;
        }

        // if (req.body.data.vreme === undefined || !validator.isNumeric(req.body.data.vreme+'') || +req.body.data.vreme <= 8000) {
        //     throw new Error();
        // } 

        if (req.session.time === undefined || !validator.isNumeric(req.session.time+'') || +req.session.time <= 8000) {
            throw new Error();
        } 

        database.collection('entries')
        .where('brisecka', "==", req.body.data.brisecka)
        .where('validan', '==', true)
        .where('email', '==', req.body.data.email)
        .get()
        .then((snapshot, reject) => {
            let briseckaExists = false;
            snapshot.forEach(snapshotChild => {
                briseckaExists = true;
            });

            if (briseckaExists) {
                const error = new Error(BR_ISECKA_ERROR_MSG);
                error.code = "400";
                throw error;
            } else {
                const ip = req.headers['x-forwarded-for'] || 
                req.connection.remoteAddress || 
                req.socket.remoteAddress ||
                (req.connection.socket ? req.connection.socket.remoteAddress : null);

                req.body.data.ipaddress = ip;

                return database.collection('entries')
                .where('ipaddress', '==', ip)
                .get();
            }
        })
        .then(snapshot => {
            const results = [];

            snapshot.forEach(snapshotChild => {
                results.push({
                    ...snapshotChild.data()
                })
            });

            results.sort((a,b) => b.datum.seconds - a.datum.seconds);

            const dateNow = Date.now();

            // console.log("VREME SAD", dateNow);
            // console.log("VREME FIREBASE", results[0].datum.seconds*1000);
            // console.log(dateNow - results[0].datum.seconds*1000);

            const tooSoon = results.length > 0 && ((dateNow - results[0].datum.seconds*1000) < TIME_LIMIT);

            if (tooSoon) {
                const error = new Error(TOO_MANY_REQUESTS);
                error.code = "429";
                throw error;
            } else {
                req.body.data.datum = firebase.firestore.FieldValue.serverTimestamp();
                req.body.data.vreme = req.session.time;
                req.body.data.validan = true;
                return database.collection('entries').doc(uuidv4()).set({...req.body.data})
            }
        })
        .then(snapshot => {
            req.session.destroy();
            res.status(200).send('OK');

        })
        .catch(err => {
            const errorCode = err.code ? err.code : 400;
            const errorMsg = err.code ? err.message : DEFAULT_ERROR_MSG; 
            res.status(errorCode).send({
                message: errorMsg
            });
        });

        // const ip = req.headers['x-forwarded-for'] || 
        // req.connection.remoteAddress || 
        // req.socket.remoteAddress ||
        // (req.connection.socket ? req.connection.socket.remoteAddress : null);

        // req.body.data.ipaddress = ip;
        // req.body.data.datum = firebase.firestore.FieldValue.serverTimestamp();
        // database.collection('entries').doc(uuidv4()).set({...req.body.data})
        // .then((result) => {
        //     res.send("Uspelo!");
        // })
        // .catch(err => {
        //     res.status(400).send({
        //         message: "Doslo je do greske"
        //     });
        // });
    } catch(err) {
        // console.log(err);
        // console.log(req.session.time);
        const errorCode = err.code ? err.code : 400;
        const errorMsg = err.code ? err.message : DEFAULT_ERROR_MSG; 
        res.status(errorCode).send({
            message: errorMsg
        });
    }

    // res.status(400).send({
    //     message: FINISHED_MSG
    // });
}

exports.startGame = (req, res) => {
    try {
        req.session.timestampStart = new Date().getTime();
        req.session.token = uuidv4();

        res.send({
            token: req.session.token
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            message: DEFAULT_ERROR_MSG
        })
    }

    // res.status(400).send({
    //     message: FINISHED_MSG
    // });
}

exports.endGame = (req, res) => {
    try {
        if (!req.session.timestampStart || 
            !req.body.data.token || 
            !req.session.token ||
            req.body.data.token !== utils.genToken(req.session.token)) {
            req.session.destroy();
            throw new Error();
        }
        const timestampEnd = new Date().getTime();
        const timestampStart = req.session.timestampStart;
        req.session.time = timestampEnd-timestampStart;
        res.send({
            time: req.session.time
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            message: DEFAULT_ERROR_MSG
        });
    }

    // res.status(400).send({
    //     message: FINISHED_MSG
    // });
}

exports.numOfEntries = (req, res) => {
    // try {
    //     let minDate = new Date('2021-02-22');
    //     minDate.setHours(0);
    //     minDate.setMinutes(0);
    //     minDate.setSeconds(0);
    //     minDate.setMilliseconds(0);

    //     minDate = firebase.firestore.Timestamp.fromDate(minDate);

    //     database.collection('entries')
    //     .orderBy('datum')
    //     .where('datum', '>=', minDate)
    //     .get()
    //     .then(snapshot => {
    //         const results = [];

    //         snapshot.forEach(snapshotChild => {
    //             results.push({
    //                 ...snapshotChild.data()
    //             })
    //         });

    //         res.send(results.map(data => {
    //             let date = data.datum.toDate();
    //             date.setHours(date.getHours() + 1);
    //             return {
    //                 "Datum": date,
    //                 "Ime": data.ime,
    //                 "Prezime": data.prezime,
    //                 "Ip Adresa": data.ipaddress,
    //                 "Email": data.email,
    //                 "Telefon": data.telefon,
    //                 "Broj Isečka": data.brisecka,
    //                 // "Vreme": utils.formatMillisecs(data.vreme),
    //                 "Vreme": data.vreme,
    //                 // "Validan": data.validan ? "Da" : "Ne"
    //                 "Validan": data.validan
    //             }
    //         }));

    //         // res.send("BROJ UCESNIKA " + results.length)

    //     }).catch(err => {
    //         console.log(err);
    //         res.status(400).send({
    //             message: DEFAULT_ERROR_MSG
    //         });
    //     });
    // } catch(err) {
    //     console.log(err);
    //     res.status(400).send({
    //         message: DEFAULT_ERROR_MSG
    //     })
    // }

    res.status(400).send({
        message: FINISHED_MSG
    });
}

exports.firstTen = (req,res) => {
    // try {
    //     let startDate = new Date('2021-02-22');
    //     startDate.setHours(1);
    //     startDate.setMinutes(0);
    //     startDate.setSeconds(0);
    //     startDate.setMilliseconds(0);

    //     console.log(startDate);

    //     let endDate = new Date('2021-03-14');

    //     const finalResults = [];

    //     while (startDate <= endDate) {
    //         let nextDate = new Date(startDate);
    //         nextDate.setDate(startDate.getDate() + 1);

    //         let results = response.filter(e => {
    //             const date = new Date(e["Datum"]);
    //             return (date >= startDate && date < nextDate) && e["Validan"];
    //         })
    //         // .sort((a,b) => {
    //         //     let aDate = new Date(a["Datum"]);
    //         //     let bDate = new Date(b["Datum"]);
    //         //     return bDate.getDate() - aDate.getDate();
    //         // })
    //         .sort((a,b) => {
    //             // return a["Vreme"] - b["Vreme"];
    //             let aDate = new Date(a["Datum"]);
    //             let bDate = new Date(b["Datum"]);
    //             if (a["Vreme"] === b["Vreme"]) {
    //                 return aDate - bDate;
    //             } else {
    //                 return a["Vreme"] - b["Vreme"];
    //             }
    //         })
    //         .slice(0,10)
    //         .map(e => {
    //             return {
    //                 ime: e["Ime"],
    //                 prezime: e["Prezime"],
    //                 vreme: e["Vreme"],
    //                 datum: e["Datum"]
    //             }
    //         });

    //         finalResults.push(...results);

    //         startDate = nextDate;
    //     }

    //     res.send(finalResults);
    // } catch(e) {
    //     res.status(400).send({
    //         message: DEFAULT_ERROR_MSG
    //     })
    // }

    res.status(400).send({
        message: FINISHED_MSG
    });
}

