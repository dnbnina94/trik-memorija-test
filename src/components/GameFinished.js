import React from 'react';

class GameFinished extends React.Component {
    state = {
        step: 0
    }

    incrementStep = (e) => {
        e.preventDefault();

        this.setState((prevState) => ({
            step: prevState.step+1
        }))
    }

    render() {
        return (
            <div>
                {
                    this.state.step === 0 &&
                    <div>
                        <button 
                            className="button"
                            onClick={() => this.props.startGame()}
                        >
                            Igraj ponovo
                        </button>    
                        <button 
                            className="button mt-medium"
                            onClick={this.incrementStep}
                        >
                            Sačuvaj rezultat
                        </button>
                    </div>
                }   
                {
                    this.state.step === 1 &&
                    <form className="user-data" onSubmit={this.incrementStep}>
                        <div>
                            <label htmlFor="fname">Ime:</label>
                            <input type="text" name="fname" />
                        </div>
                        <div className="mt-medium">
                            <label htmlFor="lname">Prezime:</label>
                            <input type="text" name="lname" />
                        </div>
                        <div className="mt-medium">
                            <label htmlFor="phone">Telefon:</label>
                            <input type="text" name="phone" />
                        </div>
                        <div className="mt-medium">
                            <label htmlFor="isecak">Broj fiskalnog isečka:</label>
                            <input type="text" name="isecak" />
                        </div>
                        <button className="button mt-large">Sačuvaj</button>
                    </form>
                }
                {
                    this.state.step === 2 &&
                    <div>
                        <div className="results">
                            <div className="result-wrapper">
                                <p>1. Nina Grujić</p>
                                <p>00:23:45</p>
                            </div>
                            <div className="result-wrapper">
                                <p>2. Nikola Đukić</p>
                                <p>00:23:45</p>
                            </div>
                            <div className="result-wrapper">
                                <p>3. Marija Babović</p>
                                <p>00:23:45</p>
                            </div>
                            <div className="result-wrapper">
                                <p>4. Linda Abbadi</p>
                                <p>00:23:45</p>
                            </div>
                            <div className="result-wrapper">
                                <p>5. Kristina Stanojević</p>
                                <p>00:23:45</p>
                            </div>
                            <div className="result-wrapper">
                                <p>6. Petar Đukić</p>
                                <p>00:23:45</p>
                            </div>
                            <div className="result-wrapper bb-none">
                                <p>7. Isidora Stanković</p>
                                <p>00:23:45</p>
                            </div>
                        </div>
                        <button 
                            className="button mt-large"
                            onClick={() => this.props.startGame()}
                        >
                            Igraj ponovo
                        </button>   
                    </div>
                }
            </div>
        );
    }
}

export default GameFinished;

