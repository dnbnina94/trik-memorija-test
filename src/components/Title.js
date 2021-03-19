import React from 'react';
import { useHistory } from "react-router-dom";

//IMAGES
import token from "../images/token.png";
import arrow from "../images/arrow.png";

const Title = (props) => {
    // showResults = () => {
    //     const history = useHistory();

    //     history.push({
    //         pathname: '/',
    //         search: '?show-results=true'
    //     })
    // }
    // render() {
        const history = useHistory();

        const showResults = () => {
            history.push({
                pathname: '',
                search: '?rezultati=true'
            })
        }

        return (
            <div 
                className={`title ${props.fixed ? 'title-fixed' : ''}`}
                onClick={() => props.fixed && showResults()}
            >
                <img className={`title-img ${props.big ? 'title-img-big' : ''}`} src={token} alt="token" />
                <div className={`title-content ${props.big ? 'title-content-big' : ''} ${props.resultsTitle ? 'title-content-results' : ''}`}>
                    {
                        props.resultsTitle &&
                        <img className="arrow arrow-back" src={arrow} alt="datum nazad" onClick={props.decrementDate} />
                    }
                    <div>
                    {props.title}
                    {
                        props.subtitle &&
                        <div>{props.subtitle}</div>
                    }
                    </div>
                    {
                        props.resultsTitle &&
                        <img className="arrow arrow-forward" src={arrow} alt="datum napred" onClick={props.incrementDate} />
                    }
                </div>
            </div>
        )
    // }
}

export default Title;