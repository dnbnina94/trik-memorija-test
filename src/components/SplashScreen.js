import React from 'react';
import { useHistory } from "react-router-dom";

import SwiperCore, {Autoplay} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

//COMPONENTS
import Memory from './Memory';
import Title from './Title';
import Results from './Results';

//IMAGES
import paket1 from "../images/paket1.png";
import paket2 from "../images/paket2.png";
import smileyPlez from "../images/smiley-plez.png";
import igraj from "../images/igraj.png";
import smileyParty from "../images/smiley-party.png";
import racunPaketici from "../images/racunpaketici.png";
import ps5Controller from "../images/ps5-controller.png";
import ps5 from "../images/ps5.png";
import headphones from "../images/headphones.png";
import keyboard from "../images/keyboard.png";
import mouse from "../images/mouse.png";

SwiperCore.use([Autoplay]);

const SplashScreen = (props) => {
    const history = useHistory();

    const showResults = () => {
        if (!props.userAgreed) {
            return;
        }
        history.push({
            pathname: '',
            search: '?rezultati=true'
        })
    }
    return (
        <div className="splash-screen">
            <div className="fixed-buttons-wrapper">
                <div className={`fixed-buttons-button`}>
                    <a className={`${!props.userAgreed ? 'button-disabled' : ''}`} href="https://banini.rs/trikgg/Pravilnik.pdf" target="_blank">pravilnik</a>
                </div>
                <div className={`fixed-buttons-button ${!props.userAgreed ? 'button-disabled' : ''}`} onClick={showResults}>rezultati</div>
            </div>
            <div className="awards-wrapper">
                <div className="awards-info-wrapper">
                    <p className="awards-info-1">Osvoji vredne nagrade</p>
                    <p className="awards-info-2">I JOš vrednije nagrade vikendom!</p>
                    <p className="awards-info-3">PLAYSTATIOn 5 x3</p>
                    <p className="awards-info-4">LOGITECH G213 x3</p>
                    <p className="awards-info-4">ARCTIS 1 x18</p>
                    <p className="awards-info-4">G102 x 18</p>
                    <img className="awards-info-img awards-info-img-1" src={ps5} alt="ps5" />
                    <img className="awards-info-img awards-info-img-2" src={ps5Controller} alt="ps5 kontroler" />
                    <img className="awards-info-img awards-info-img-3" src={headphones} alt="slušalice" />
                    <img className="awards-info-img awards-info-img-4" src={mouse} alt="miš" />
                    <img className="awards-info-img awards-info-img-5" src={keyboard} alt="keyboard" />
                    {/*
                    */}
                </div>
            </div>
            {/*<img className="splash-screen-side-img splash-screen-side-img-1" src={paket1} alt="paket1" />*/}
            <div className="splash-screen-info">
                <div className="splash-screen-logo-wrapper">
                    <Memory/>
                </div>
                <div className="splash-screen-swiper-wrapper">
                    <Swiper
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        slidesPerView={1}
                        loop={true}
                    >
                        <SwiperSlide>
                            <div>
                                <img className="awards-info-img awards-info-img-1" src={ps5} alt="ps5" />
                                <div className="awards-info-wrapper">
                                    <p className="awards-info-1">Osvoji vredne nagrade</p>
                                    <p className="awards-info-2">I JOš vrednije nagrade vikendom!</p>
                                    <p className="awards-info-3">PLAYSTATIOn 5 x3</p>
                                    <p className="awards-info-4">LOGITECH G213 x3</p>
                                    <p className="awards-info-4">ARCTIS 1 x18</p>
                                    <p className="awards-info-4">G102 x 18</p>
                                    <img className="awards-info-img awards-info-img-2" src={ps5Controller} alt="ps5 kontroler" />
                                    <img className="awards-info-img awards-info-img-3" src={headphones} alt="slušalice" />
                                    <img className="awards-info-img awards-info-img-5" src={keyboard} alt="keyboard" />
                                    <img className="awards-info-img awards-info-img-4" src={mouse} alt="miš" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div>
                                <img className="racun-info-img" src={racunPaketici} alt="račun i paketići" />
                                <div className="racun-info-wrapper">
                                    <p>
                                        Da biste zabeleželi rezultat morate da upišete broj<br/>
                                        fiskalnog isečka (bi broj) na kome se nalazi<br/>
                                        bar jedan trik proizvod iz bilo kojeg idea<br/>
                                        ili roda maloprodajnog objekta,<br/>
                                        kao i da sačuvate račun radi provere.<br/>
                                        Broj isečka je broj iza slova bi,<br/>
                                        a fiskalni isečak pokazuje se na uvid<br/>
                                        prilikom uručivanja nagrade.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="splash-screen-play-btn-wrapper" onClick={props.startGame}>
                    <img className="splash-screen-smiley-img-1" src={smileyPlez} alt="smiley plez" />
                    <img className="splash-screen-play-btn" src={igraj} alt="igraj" />
                    <img className="splash-screen-smiley-img-2" src={smileyParty} alt="smiley party" />
                </div>
            </div>
            <div className="racun-wrapper">
                <div className="racun-info-wrapper">
                    <p>
                        Da biste zabeleželi rezultat morate da upišete broj<br/>
                        fiskalnog isečka (bi broj) na kome se nalazi<br/>
                        bar jedan trik proizvod iz bilo kojeg idea<br/>
                        ili roda maloprodajnog objekta,<br/>
                        kao i da sačuvate račun radi provere.<br/>
                        Broj isečka je broj iza slova bi,<br/>
                        a fiskalni isečak pokazuje se na uvid<br/>
                        prilikom uručivanja nagrade.
                    </p>
                    <img className="racun-info-img" src={racunPaketici} alt="račun i paketići" />
                </div>
            </div>
            {/*<img className="splash-screen-side-img splash-screen-side-img-2" src={paket2} alt="paket2" />*/}
            {/*<Title title="rezultati" fixed={true} />*/}
        </div>
    )
}

export default SplashScreen;