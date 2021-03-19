import React from 'react';
import { formatMillisecs } from '../utils';

// IMAGES
import clock from "../images/clock.png";

const Time = (props) => {
    return props.gameState === -1 ?
    null
    :
    (
        <div className="time-container">
            { props.gameState >= 2 &&
                <div className="time-result-label">
                    tvoje vreme
                </div>
            }
            <div className={`time-wrapper ${props.gameState >= 2 ? 'mb-0' : ''}`}>
                <img className="time-clock-img" src={clock} alt="clock" />
                <span className="time-info">{formatMillisecs(props.time)}</span>
            </div>
        </div>
    );
}

export default Time;