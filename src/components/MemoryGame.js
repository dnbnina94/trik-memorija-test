import React from 'react';
import axios from "axios";

import {MD5} from "../utils";

//COMPONENTS
import Time from './Time';
import Cards from './Cards';
import SplashScreen from './SplashScreen';
import Memory from './Memory';
import SaveResults from './SaveResults';
import Loader from './Loader';
import Results from './Results';
import CustomModal from "./CustomModal";

//IMAGES
import smileyParty from "../images/party-smiley.png";
import arrowBack from "../images/arrow-back.png";
import soundon from "../images/soundon.png";
import soundoff from "../images/soundoff.png";
import homeicon from "../images/homeicon.png";

const _ = require("lodash");

let audioCardFlip = new Audio("/sounds/card_flip.wav");
let audioCardFlipSet = new Audio("/sounds/card_flip_set.wav");
let gameAudio = new Audio("/sounds/trik_igra.wav");

const URL = "https://trik-memorija-test.herokuapp.com/api";
// const URL = "http://localhost:3000/api";

let allCards = [
    require("../images/pojmovi/1.jpg"),
    require("../images/pojmovi/2.jpg"),
    require("../images/pojmovi/3.jpg"),
    require("../images/pojmovi/4.jpg"),
    require("../images/pojmovi/5.jpg"),
    require("../images/pojmovi/6.jpg"),
    require("../images/pojmovi/7.jpg"),
    require("../images/pojmovi/8.jpg"),
    require("../images/pojmovi/9.jpg"),
    require("../images/pojmovi/10.jpg"),
    require("../images/pojmovi/11.jpg"),
    require("../images/pojmovi/12.jpg"),
    require("../images/pojmovi/13.jpg"),
    require("../images/pojmovi/14.jpg")
];

// function importAll(r) {
//     return r.keys().map(r);
//   }
  
// const allImages = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
// allImages.push(...allCards);

class MemoryGame extends React.Component {
    state = {
        title: "Igra Memorije",
        time: 0,
        timer: undefined,
        cards: [],
        openedCards: [],
        loading: false,
        results: [],
        gameState: 0,
        sound: true,
        date: new Date(),
        gameStarted: false,
        errorMsg: '',
        gameAudioVolume: 0.1,
        modalIsOpen: false,
        userAgreed: false,
        token: null
    }

    componentDidMount() {
        audioCardFlip.load();
        audioCardFlipSet.load();
        gameAudio.load();
        gameAudio.loop = true;
        gameAudio.volume = this.state.gameAudioVolume;

        this.validateRoute(this.props.history.location);

        this.props.history.listen((location) => { 
            this.validateRoute(location);
        });
        
        // let numOfLoadedImages = 0;
        // this.setState(() => ({ loading: true }));

        // allImages.map(i => {
        //     let img = new Image();
        //     img.onload = () => {
        //         numOfLoadedImages++;
        //         if (numOfLoadedImages === allImages.length) {
        //             this.setState(() => ({ loading: false, gameState: 0 }));
        //         }
        //     }
        //     img.src = i;
        //     if (img.complete) img.onload();
        // });
    }

    validateRoute = (location) => {
        if (location.search === "?rezultati=true") {
            this.showResults();
        } else {
            setTimeout(() => {
                this.setState(() => ({modalIsOpen: true}));
            }, 2500);
            this.setState(() => ({ gameState: 0 }));
        }
    }

    agreeToTerms = () => {
        this.setState(() => ({
            modalIsOpen: false,
            userAgreed: true
        }))
    }

    goToHomepage = () => {
        this.clearTimer();
        gameAudio.pause();
        gameAudio.currentTime = 0;

        this.setState(() => ({
            time: 0
        }));

        this.props.history.push({
            pathname: '/',
            search: ''
        });
    }

    toggleSound = () => {
        this.setState((prevState) => {
            let sound = !prevState.sound;
            // gameAudio.muted = !sound;
            sound ? gameAudio.play() : gameAudio.pause();
            // gameAudio.volume = sound ? prevState.gameAudioVolume : 0;
            return {
                sound: sound
            }
        });
    }

    incrementDate = () => {
        const date = new Date(this.state.date);
        date.setDate(date.getDate() + 1);

        const lastDate = new Date('2021-03-14');
        lastDate.setHours(23);
        lastDate.setMinutes(59);
        lastDate.setSeconds(59);
        lastDate.setMilliseconds(999);

        if (new Date() >= date) {
            this.getData(date);
        }

        // if (date < lastDate) {
        //     this.getData(date);
        // }
    }

    decrementDate = () => {
        const date = new Date(this.state.date);
        date.setDate(date.getDate()-1);
        const endDate = new Date('2021-02-22');
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setSeconds(0);
        endDate.setMilliseconds(0);
        if (date.getTime() >= endDate.getTime()) {
            this.getData(date);
        }
    }

    clearTimer() {
        clearInterval(this.state.timer);

        this.setState(() => ({
            timer: undefined,
        }));
    }

    showResults = () => {
        // this.getData(new Date('2021-03-14'));
        this.getData(new Date());
        this.setState(() => ({ 
            gameState: -1
        }));
    }

    saveData = (data) => {
        this.setState(() => ({ 
            loading: true,
            errorMsg: '' 
        }));

        // data.vreme = this.state.time;

        // axios.post("https://banini-backend.herokuapp.com" + "/save-data", {
        axios.post(URL + "/save-data", 
            {
                data: {...data}
            },
            {
                withCredentials: true
            }
        )
        .then((response) => {
            this.getData(new Date());
            this.setState(() => ({ gameState: 3 }))
        })
        .catch((err) => {
            this.setState(() => ({ 
                loading: false,
                errorMsg: err.response.data.message
            }));
        });

        // database.collection('entries').doc(uuidv4()).set({...data})
        // .then(res => {            
        //     this.getData(new Date());
        //     this.setState(() => ({ gameState: 3 }))
        // })
        // .catch(err => {
        //     console.log(err);
        //     this.setState(() => ({ loading: false }));
        // });
    }

    getData = (date) => {
        this.setState(() => ({ 
            loading: true,
            errorMsg: '' 
        }));
        // axios.get("https://banini-backend.herokuapp.com" + "/entries", {
        axios.get(URL + "/entries", {
            params: {
                date: date.toISOString()
            }
        })
        .then((results) => {
            this.setState(() => ({ 
                loading: false,
                results: results.data.slice(0,10),
                date: date
            }));
        })
        .catch((error) => {
            console.log(error);
            this.setState(() => ({ loading: false }))
        });
    }

    startTimer = () => {
        let now = new Date();
        this.setState(() => ({
            timer: setInterval(() => {
                this.state.gameState === 2 && this.clearTimer();
                this.setState(() => ({ 
                    time: new Date().getTime() - now.getTime() 
                }));
            }, 10),
            gameStarted: true
        }));
    }

    toggleCardHandler = (card) => {
        if (this.state.openedCards.length === 2) {
            return;
        }

        // EDIT CHEAT
        // if (!this.state.gameStarted) {
        //     this.startTimer();
        // }

        this.setState((prevState) => {
            let openedCards = prevState.openedCards.concat(card.image);
            let cards = prevState.cards.map(c => {
                if (c === card) {
                    c.opened = true;
                    c.revealed = true;
                }
                return c;
            });

            if (this.state.sound) {
                audioCardFlip.pause();
                audioCardFlip.currentTime = 0;
                audioCardFlip.play();
            }

            if (openedCards.length === 2) {
                if (openedCards[0] === openedCards[1]) {
                    // POGODAK
                    cards = cards.map(c => {
                        if (c.image === card.image) {
                            c.scored = true;
                            c.revealed = true;
                        }
                        return c;
                    });
                    openedCards = [];            
                } else {
                    // GRESKA
                    setTimeout(() => {
                        this.setState((prevState) => {
                            return {
                                openedCards: [],
                                cards: prevState.cards.map(c => {
                                    if (prevState.openedCards.includes(c.image)) {
                                        c.revealed = false;
                                    }
                                    return c;
                                })
                            }
                        });
                        this.state.sound && audioCardFlipSet.play();
                    }, 950);
                    setTimeout(() => {
                        this.setState((prevState) => ({
                            cards: prevState.cards.map(c => {
                                if (prevState.openedCards.includes(c.image)) {
                                    c.opened = false;
                                }
                                return c;
                            })
                        }));
                    }, 800);
                }
            }

            let gameFinished = cards.every(c => c.scored);

            if (gameFinished) {
                setTimeout(() => {
                    this.setState(() => ({
                        loading: true
                    }));
                    try {
                        const token = MD5(prevState.token + MD5(prevState.token)).split("");
                        const lHalf = token.slice(0, Math.floor(token.length/2));
                        const rHalf = token.slice(Math.floor(token.length/2));
                        const finalToken = rHalf.concat(lHalf).join("");
                        axios.post(URL + "/end-game", 
                            {
                                data: {
                                    token: finalToken
                                }
                            },
                            {
                                withCredentials: true
                            }
                        )
                        .then((response) => {
                            this.setState(() => ({ 
                                loading: false,
                                time: response.data.time
                            }));
                        })
                        .catch((err) => {
                            this.setState(() => ({ 
                                errorMsg: 'Došlo je do greške.',
                                loading: false,
                            }));
                        });
                    } catch(err) {
                        this.setState(() => ({ 
                            errorMsg: 'Došlo je do greške.',
                            loading: false,
                        }));
                    }
                }, 500);
            }

            setTimeout(() => this.setState((prevState) => ({ 
                gameState: gameFinished ? 2 : prevState.gameState,
                errorMsg: ''
            })), 500);

            return {
                openedCards, 
                cards
            }
        })
    }

    startGame = () => {
        if (!this.state.userAgreed) {
            return;
        }

        let cards = _.shuffle(allCards).slice(0,8);
        cards = _.shuffle(cards.concat(cards)).map((c) => ({
            opened: false,
            scored: false,
            image: c
        }));

        if (this.state.sound) {
            setTimeout(() => {
                gameAudio.play();
            }, 800);
        }

        this.startTimer();

        axios.get(URL + "/start-game", {
            withCredentials: true
        })
        .then((results) => {
            this.setState(() => ({ 
                token: results.data.token
            }));
        })
        .catch((error) => {
            console.log(error);
        });

        this.setState(() => ({
            cards,
            gameState: 1,
            time: 0,
            gameStarted: false
        }));

        // let now = new Date();
        // this.setState(() => ({
        //     cards,
        //     timer: setInterval(() => {
        //         this.state.gameState === 2 && this.clearTimer();
        //         this.setState(() => ({ 
        //             time: new Date().getTime() - now.getTime() 
        //         }));
        //     }, 10),
        //     time: 0,
        //     gameState: 1
        // }));
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        return (
            <div className="app-wrapper">
                    <CustomModal modalIsOpen={this.state.modalIsOpen && !this.state.userAgreed} agreeToTerms={this.agreeToTerms}/>
                    {
                        this.state.loading &&
                        <Loader />
                    }
                    <div className="icons-wrapper">
                        {
                            (this.state.gameState >= 1 || this.state.gameState === -1) &&
                            <img className="homeicon-img" src={homeicon} alt="home page" onClick={this.goToHomepage} />
                        }
                        {
                            this.state.gameState >= 1 &&
                            <img className="sound-img" src={this.state.sound ? soundon : soundoff} alt="dugme nazad" onClick={this.toggleSound} />
                        }
                    </div>
                    {
                        (this.state.gameState === 3 || this.state.gameState === -1) &&
                        <img className="party-smiley" src={smileyParty} alt="party-smiley" />
                    }
                    {
                        this.state.gameState === 0 &&
                        <SplashScreen
                            startGame={this.startGame}
                            userAgreed={this.state.userAgreed}
                        />
                    }
                    {
                        (this.state.gameState === -1 || this.state.gameState > 0) &&
                        <div className="game-container">
                            <div className={`game-wrapper-info ${this.state.gameState === 3 ? 'game-wrapper-info-2' : ''}`}>
                                <Memory small={true} />
                                <div className="time-desktop">
                                    <Time gameState={this.state.gameState} time={this.state.time} />
                                    {
                                        this.state.gameState >= 2 &&
                                        <div 
                                            className="game-finished-btn game-finished-btn-red"
                                            onClick={this.startGame}
                                        >
                                            Igraj ponovo
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="game-wrapper">
                                {
                                    this.state.gameState === 1 &&
                                    <Cards 
                                        cards={this.state.cards}
                                        time={this.state.time}
                                        toggleCardHandler={this.toggleCardHandler}
                                    />
                                }   
                                {
                                    this.state.gameState === 2 &&
                                    <SaveResults 
                                        saveData={this.saveData}
                                        errorMsg={this.state.errorMsg}
                                    />
                                }
                                {
                                    (this.state.gameState === 3 || this.state.gameState === -1) &&
                                    <Results
                                        results={this.state.results}
                                        incrementDate={this.incrementDate}
                                        decrementDate={this.decrementDate}
                                        date={this.state.date}
                                    />
                                }
                            </div>
                            <div className="time-mobile">
                                <Time gameState={this.state.gameState} time={this.state.time} />
                                {
                                    this.state.gameState >= 2 &&
                                    <div 
                                        className="game-finished-btn game-finished-btn-red"
                                        onClick={this.startGame}
                                    >
                                        Igraj ponovo
                                    </div>
                                }
                            </div>
                        </div>
                    }
            </div>
        );  
    }
}

export default MemoryGame;