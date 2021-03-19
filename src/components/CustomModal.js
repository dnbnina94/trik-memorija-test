import React from "react";
import Modal from "react-modal";

import confetti from "../confetti.js";

class CustomModal extends React.Component {
    state = {
        checked: true
    }

    handleChange = () => {
        this.setState((prevState) => ({
            checked: !prevState.checked
        }))
    }

    agreeToTerms = () => {
        if (!this.state.checked) {
            return;
        }
        this.props.agreeToTerms();
    }

    render() {
        // confetti.start();
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                {/*
                    <div>
                    <div className="custom-modal-title">
                        PRAVILNIK NAGRADNOG KONKURSA<br/>
                        „TRIK GAMING AKTIVACIJA“
                    </div>
                    <br/>
                    <div className="custom-modal-info">Pravilnik je izmenjen u Tačkama 5 i 6 dana 12.3.2021.</div>
                    <br/>
                    Konkurs se sprovodi u svrhu promocije Organizatora. Konkurs traje od 22.02.2021. godine do
                    15.03.2021. godine, a odnosi se na područje Republike Srbije, bez Kosova i Metohije.
                    Pravila Konkursa i ostale bliže informacije vezane za sprovođenje Konkursa biće objavljene na web
                    stranici Organizatora&nbsp;
                    <a className="custom-modal-link" href="https://banini.rs/trikgg" target="_blank">banini.rs/trikgg</a>
                    &nbsp;i na viber stranici&nbsp;
                    <a className="custom-modal-link" href="https://invite.viber.com/?g2=AQAoPEMTXYN1%2FUzXbRxCRV%2B8Fk3X%2By4soBW5zvaG8pftMMTr%2Bk1cCrFyfK3F7W2B&lang=en" target="_blank">Trik</a>.
                    <br/><br/>
                    <div className="custom-modal-subtitle">PRAVO UČESTVOVANJA</div>
                    <br/>
                    Pravo učešća na konkursu imaju sledeća lica:<br/>
                    <ul className="custom-modal-list">
                        <li>Punoletna lica, odnosno lica koja su navršila 18 godina života kao i maloletna lica, za čiju
                        prijavu je neophodna saglasnost roditelja, staratelja, odnosno drugog zakonskog zastupnika
                        maloletnika;</li>
                        <li>Koja su državljani Republike Srbije;</li>
                        <li>Sa prebivalištem na teritoriji Republike Srbije.</li>
                    </ul>
                    U daljem tekstu: “Učesnik”
                    <br/><br/>
                    Pravo učešća na konkursu nemaju sledeća lica:<br/>
                    <ul className="custom-modal-list">
                        <li>Lica koja su u radnom odnosu ili su na drugi način radno angažovana kod Organizatora kao i
                        njihovi bračni drugovi, roditelji i deca;</li>
                        <li>lica koja su u radnom odnosu ili su na drugi način radno angažovana kod pravnih lica koja na
                        bilo koji način učestvuju u priređivanju i organizaciji programa i/ili imaju pristup podacima
                        vezanim za priređivanje programa, te njihovi bračni drugovi, roditelji i deca.</li>
                    </ul>
                    <div className="custom-modal-subtitle">MEHANIKA KONKURSA</div>
                    <br/>
                    U Konkursu učestvuju svi Trik proizvodi kupljeni u Idea ili Roda objektima (Trik štapići 40g, 100g,
                    200g; Trik štapići sa kikirikijem 45g, 150g; Trik mini štapići sa kikirikijem 220g; Trik mix 300g; Trik
                    party mix 500g; Trik ribice 90g; Trik perece 100g).<br/>
                    Da bi lice steklo pravo da učestvuje na Konkursu u bilo kom segmentu potrebno je da kupi bilo koji
                    Trik proizvod u Idea ili Roda objektu (u daljem tekstu: Trik), i da sačuva račun sa brojem isečka koji se
                    nalazi na dnu fiskalnog računa i na kome je bilo koji od navedenih trik proizvoda. Broj isečka je
                    broj iza slova „БИ“ (u daljem tekstu „Kod“).
                    <br/><br/>
                    Nakon kupovine Trika potrebno je da Učesnik preduzme sledeće korake:<br/>
                    Zaprati Trik Viber Community  (u daljem tekstu: Javni nalog), koji može pronaći pretragom na Viberu
                    u polju “pretraga u delu poruke” ukucavanjem reči Trik ili @ Trik kako bi dobio dodatne informacije o
                    pravilima nagradnog konkursa i pratio poslednje vesti u skladu sa istim.
                    <br/><br/>
                    Prijavom na konkurs Učesnik automatski pristaje na pravila Konkursa, te se smatra da svaki Učesnik
                    svojim učestvovanjem u Konkursu, potvrđuje da je upoznat sa ovim Pravilima Konkursa i uslovima
                    učestvovanja u ovom Konkursu.<br/>
                    Zatim da u polju „Poruka”/„Message” potvrdi da ima navršenih 18 godina Ili da ima saglasnost
                    staratelj ukoliko nema navršenih 18 godina i da nakon toga pročita i prihvati Pravila (koja se nalaze na
                    internet stranici Organizatora <a className="custom-modal-link" href="https://banini.rs/trikgg" target="_blank">www.banini.rs/trikgg</a>, a na koje Učesnik može pristupiti klikom na
                    dugme Pravila koje se nalazi na Javnom nalogu.<br/>
                    Maloletnik je dužan da prilikom prijave unese e-mail svog roditelja, staratelja, odnosno drugog
                    zakonskog zastupnika maloletnika sa kojeg je potrebno da roditelj, staratelj, odnosno drugi zakonski
                    zastupnika maloletnika, u roku od 48 sati od prijema mejla, da saglasnost za učešće maloletnika, a
                    kojom potvrđuje i da je upoznat sa ovim Pravilima kreativnog konkursa i uslovima učestvovanja u
                    kreativnom konkursu.
                    <br/><br/>
                    Učestvovanjem u programu svaki Učesnik prihvata prava i obaveze iz ovih Pravila, i daje svoju izričitu
                    saglasnost da prima na mobilni telefon SMS poruke u vezi sa učestvovanjem na Konkursu, uključujući
                    i saglasnost za primanje SMS poruka u svrhe promocije proizvoda Organizatora.
                    <br/><br/>
                    Organizator ne preuzima odgovornost za bilo kakvu štetu koja nastane zloupotrebom ovog Konkursa,
                    a koja se na taj način nanese bilo učesnicima programa, bilo trećim licima.
                    <br/><br/>
                    Konkurs se prekida 15.03.2021. ili u slučaju nastupanja okolnosti za koje Organizator nije odgovoran,
                    odnosno koje nije mogao da spreči, otkloni ili izbegne. Učesnici će o prekidu programa biti obavešteni
                    putem veb sajta Organizatora: <a className="custom-modal-link" href="https://banini.rs/trikgg" target="_blank">www.banini.rs/trikgg</a>.
                    <br/>
                    Organizator može produžiti trajanje Konkursa usled novonastalih okolnosti vezanih za tržišna
                    kretanja i u skladu sa odlukom Organizatora.
                    <br/><br/>
                    <a className="custom-modal-link" target="_blank" href="https://banini.rs/trikgg/Pravilnik.pdf" >Ovde možete pogledati detaljan pravilnik.</a>
                    <br/><br/>
                    <label className="custom-input">
                        <input 
                            type="checkbox" 
                            name="option" 
                            checked={this.state.checked}
                            onChange={this.handleChange}
                        />
                        <span className="checkmark-checkbox"></span>
                        <span className="checkmark-text">Pročitao/la sam uslove korišćenja</span>
                        <span className="checkmark-required">*</span>
                    </label>
                    </div>
                */}

                    <h1 className="custom-modal-title">Nagradni konkurs je završen!</h1>
                    <div className="custom-modal-info">
                    Želimo da čestitamo svim dobitnicima koji su zapravo pokazali da imaju najbolju memoriju i brze reflekse!
                    </div>
                    <br/>
                    <div className="custom-modal-info">
                    Uskoro ćemo objaviti i finalne zvanične rezultate po danima. Vidimo se u nekoj narednoj igri!
                    </div>

                    <div 
                        className={`game-finished-btn game-finished-btn-red modal-btn ${!this.state.checked ? 'modal-btn-greyed' : ''}`} 
                        onClick={this.agreeToTerms}
                    >
                        Nastavi
                    </div>

                    <div className="custom-modal-bottom-filler"></div>
            </Modal>
        )
    }
}

export default CustomModal;