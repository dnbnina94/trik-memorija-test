import React from 'react';

// IMAGES
import logo from "../images/logo.png";
import memorija from "../images/igra-memorije.png";
import decor2 from "../images/decor2.png";
import decor1 from "../images/decor1.png";

class Memory extends React.Component {
    render() {
        return (
            <div className={`memory ${this.props.small ? 'memory-small' : ''}`}>
                <img className={`memory-logo ${this.props.small ? '' : 'memory-logo-big'}`} src={logo} alt="logo" />
                <div className={`memory-game-title ${this.props.small ? '' : 'memory-game-title-big'}`}>
                    <img className="memory-game-title-img" src={memorija} alt="memorija" />
                    <img className={`memory-decor memory-decor-1 ${this.props.small ? '' : 'memory-decor-1-big'}`} src={decor2} alt="decor 1" />
                    <img className={`memory-decor memory-decor-2 ${this.props.small ? '' : 'memory-decor-2-big'}`} src={decor1} alt="decor 2" />
                </div>
            </div>
        );
    }
}

export default Memory;