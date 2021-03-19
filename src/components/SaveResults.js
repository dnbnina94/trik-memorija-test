import React from 'react';
import validator from 'validator';

import Title from './Title';

class SaveResults extends React.Component {
    state = {
        formData: {
            ime: '',
            prezime: '',
            email: '',
            telefon: '',
            brisecka: ''
        },
        error: ''
    }

    checkData = () => {
        const data = {...this.state.formData};

        if (!validator.isLength(data.ime, {min: 1})) {
            this.setState(() => ({ error: "Ime ne sme ostati prazno." }));
            return;
        }

        if (
            !validator.isAlpha(data.ime) &&
            !validator.isAlpha(data.ime, 'sr-RS') &&
            !validator.isAlpha(data.ime, 'sr-RS@latin')
        ) {
            this.setState(() => ({ error: "Ime sme sadržati samo slova." }));
            return;
        }

        if (!validator.isLength(data.prezime, {min: 1})) {
            this.setState(() => ({ error: "Prezime ne sme ostati prazno." }));
            return;
        }

        if (
            !validator.isAlpha(data.prezime) &&
            !validator.isAlpha(data.prezime, 'sr-RS') &&
            !validator.isAlpha(data.prezime, 'sr-RS@latin')
        ) {
            this.setState(() => ({ error: "Prezime sme sadržati samo slova." }));
            return;
        }

        if (!validator.isLength(data.email, {min: 1})) {
            this.setState(() => ({ error: "Email ne sme ostati prazan." }));
            return;
        }

        if (!validator.isEmail(data.email)) {
            this.setState(() => ({ error: "Email adresa je neispravna." }));
            return;
        }

        if (!validator.isLength(data.telefon, {min: 1})) {
            this.setState(() => ({ error: "Mobilni telefon ne sme ostati prazan." }));
            return;
        }

        if (!validator.isMobilePhone(data.telefon, 'sr-RS')) {
            this.setState(() => ({ error: "Mobilni telefon nije u ispravnom formatu." }));
            return;
        }

        if (!validator.isLength(data.brisecka, {min: 4, max: 10})) {
            this.setState(() => ({ error: "Br. fiskalnog isečka mora sadržati između 4 i 10 cifara." }));
            return;
        }

        if (!validator.isNumeric(data.brisecka)) {
            this.setState(() => ({ error: "Br. fiskalnog isečka sme sadržati samo brojeve." }));
            return;
        }

        this.setState(() => ({ error: '' }));

        this.props.saveData(data);
    }

    handleChange = (e) => {
        const { name,value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }))
    }

    render() {
        return (
            <div className="save-results">
                <Title title="upiši svoj rezultat" big={true}/>

                <div className="save-results-form">
                    <div className="input-wrapper">
                        <label htmlFor="ime">ime:</label>
                        <div className="input-field-wrapper input-field-wrapper-1">
                            <input type="text" name="ime"  value={this.state.formData.ime} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="prezime">prezime:</label>
                        <div className="input-field-wrapper input-field-wrapper-2">
                            <input type="text" name="prezime" value={this.state.formData.prezime} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="email">email:</label>
                        <div className="input-field-wrapper input-field-wrapper-1">
                            <input type="text" name="email" value={this.state.formData.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="telefon">mobilni telefon:</label>
                        <div className="input-field-wrapper input-field-wrapper-2">
                            <input type="text" name="telefon" value={this.state.formData.telefon} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="brisecka">broj fiskalnog isečka (bi broj):</label>
                        <div className="input-field-wrapper input-field-wrapper-1">
                            <input type="text" name="brisecka" value={this.state.formData.brisecka} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="save-results-form-error-msg">
                        {this.state.error ? this.state.error : this.props.errorMsg}
                    </div>
                </div>

                <div 
                    className="game-finished-btn game-finished-btn-red"
                    style={{margin: "0 auto"}}
                    onClick={this.checkData}
                >Sačuvaj</div>
            </div>
        );
    }
}

export default SaveResults;